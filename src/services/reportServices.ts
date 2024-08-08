import execute from "src/utilities/CLIRunnner"
/**
 * Retrieves the statistics as a JSON object.
 * @param jwt - The JWT for authentication.
 * @returns A promise that resolves to the output of the command.
 */
export const getStatistics = async (
  jwt: string
): Promise<Output> =>
  await execute(
    "stats", [], {
    env: {
      JWT: jwt
    }
  })

/**
 * Retrieves the report as a JSON object.
 * @param jwt - The JWT for authentication.
 * @returns A promise that resolves to the output of the command.
 */
export const getDetectiveReports = async (
  jwt: string
): Promise<Output> =>
  await execute(
    "detect", [], {
    env: {
      JWT: jwt
    }
  })