import execute from "src/utilities/CLIRunnner"

/**
 * Imports data using the provided csv content and JWT according
 * to the provided browser type.
 * @param jwt - The JWT for authentication.
 * @param browser - The browser type for importing.
 * @param content - The content of the CSV file.
 */
export const importFromBrowser = async (
  jwt: string,
  browser: string,
  content: string
): Promise<Output> =>
  await execute("import", [
    browser
  ], {
    env: {
      JWT: jwt
    },
    piped: content
  })

/**
 * Exports data using the provided JWT in bare or encrypted csv format.
 * @param jwt - The JWT for authentication.
 * @param exportType - The export type for exporting.
 */
export const exportToCSV = async (
  jwt: string,
  exportType: string
): Promise<Output> =>
  await execute(
    "export", [
    exportType
  ], {
    env: {
      JWT: jwt
    }
  })
