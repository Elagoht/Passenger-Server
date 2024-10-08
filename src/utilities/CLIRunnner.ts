import { spawn } from "child_process"
import Logger from "./Logger"

function sanitizeInput(input: string | undefined): string {
  return `'${input.replace(/'/g, "\\'")}'`
}

const execute = (
  verb: string,
  args: string[],
  options: CommandOptions = {
    env: {},
    piped: ""
  }
): Promise<Output> => {
  return new Promise((resolve, reject) => {
    // Sanitize verb and args
    const sanitizedVerb = sanitizeInput(verb)
    const sanitizedArgs = args.map(arg => sanitizeInput(arg))

    // Create command string
    const command = `echo "${sanitizeInput(options.piped || "")}" | ./core/passenger ${sanitizedVerb} ${sanitizedArgs.join(" ")}`

    const child = spawn(command, {
      shell: true, // Ensure the command string is interpreted as a shell command
      env: {
        ...process.env,
        ...options.env
      }
    })

    let stdout = ""
    let stderr = ""

    child.stdin.write(options.piped || "")
    child.stdin.end()

    child.stdout.on("data", (data) => {
      stdout += data.toString()
    })

    child.stderr.on("data", (data) => {
      stderr += data.toString()
    })

    child.on("error", (err) => {
      console.error(`Failed to execute child process: ${err.message}`)
      reject(new Error(`Failed to execute core command: ${err.message}`))
    })

    // Add a timeout to prevent infinite waiting
    const timeout = setTimeout(() => {
      child.kill()
      reject(new Error("Process timed out"))
    }, 60000) // Timeout after a minute

    // Clear timeout on successful completion
    child.on("close", (exitCode) => {
      clearTimeout(timeout)
      resolve({
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        exitCode
      })
    })

    child.on("exit", (exitCode) => exitCode === 0
      ? Logger.success(verb)
      : Logger.error(`${verb} ${args.join(" ")} >> ${exitCode}`))
  })
}

export default execute
