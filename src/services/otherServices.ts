import execute from "src/utilities/CLIRunnner"
/**
 * Retrieves the version information.
 * @returns A promise that resolves to the output of the command.
 */
export const versionNumber = async (): Promise<Output> =>
  await execute(
    "version", []
  )
