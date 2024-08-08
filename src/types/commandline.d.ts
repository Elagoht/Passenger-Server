type Output = {
  stdout: string
  stderr: string
  exitCode: number
}

type CommandOptions = {
  env?: NodeJS.ProcessEnv
  piped?: string
}