import { HttpStatus } from "@nestjs/common"
import { ApiResponse } from "@nestjs/swagger"
import { ExportedCSVContent, ExportTypeErrorContent } from "src/docs/contents"
import generateMessageSchema, {
  DatabaseEntrySchema, GeneratedPassphraseSchema, LoginResponseSchema,
  ProduceImportErrorResultSchema, ReadWritableEntryArraySchema,
  ReadWritableEntrySchema
} from "src/docs/schemas"

export const SwaggerInternalServerError = () => ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "Import failed",
  schema: { example: { message: "Failed to import data" } }
})

export const SwaggerUnauthorized = () => ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: "Authorization failed",
  schema: { example: { message: "Authorization failed" } },
})

export const SwaggerCouldNotAuthenticate = () => ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: "Authorization failed",
  schema: { example: { message: "Authorization failed." } }
})

export const SwaggerLoggedIn = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Successfully logged in",
  schema: LoginResponseSchema
})

export const SwaggerRegistered = () => ApiResponse({
  status: HttpStatus.CREATED,
  description: "Successfully registered",
  schema: generateMessageSchema("Registration successful.")
})

export const SwaggerUserAlreadyExists = () => ApiResponse({
  status: HttpStatus.CONFLICT,
  description: "User already exists",
  schema: generateMessageSchema("A user with the same username already exists")
})

export const SwaggerEntryValidationFailed = () => ApiResponse({
  status: HttpStatus.NOT_ACCEPTABLE,
  description: "Cannot validated entry",
  schema: generateMessageSchema("Passphrase must be at least 8 characters long")
})

export const SwaggerFoundOnRespository = () => ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: "Mached with a passphrase in brute-force repository",
  schema: generateMessageSchema("Your password is on a brute-force repository, not saved")
})

export const SwaggerEntryNotFound = () => ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: "Not found",
  schema: generateMessageSchema("Entry not found")
})

export const SwaggerEntryCreated = () => ApiResponse({
  status: HttpStatus.CREATED,
  description: "Passphrase entry created",
  schema: ReadWritableEntrySchema
})

export const SwaggerAllEntriesFetched = () => ApiResponse({
  status: HttpStatus.OK,
  description: "All passphrase entries fetched",
  schema: ReadWritableEntryArraySchema
})

export const SwaggerEntryFetched = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Passphrase entry fetched",
  schema: DatabaseEntrySchema
})

export const SwaggerEntryUpdated = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Passphrase entry updated",
  schema: ReadWritableEntrySchema
})

export const SwaggerEntryDeleted = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Entry deleted",
  schema: generateMessageSchema("Entry deleted")
})

export const SwaggerImported = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Imported entries",
  schema: generateMessageSchema("Imported 10 entries successfully.")
})

export const SwaggerBrowserTypeError = () => ApiResponse({
  status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
  description: "Browser type not supported",
  schema: generateMessageSchema("Browser type not supported")
})

export const SwaggerProduceImportErrorResult = () => ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: "Acceptable and not acceptable formats in dedicated csv",
  schema: ProduceImportErrorResultSchema
})

export const SwaggerExportedToCsv = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Exported entries in CSV format",
  content: ExportedCSVContent
})

export const SwaggerExportTypeError = () => ApiResponse({
  status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
  description: "Export type not supported",
  content: ExportTypeErrorContent
})

export const SwaggerMasterPassphraseUpdated = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Successfully reset master passphrase",
  schema: generateMessageSchema("Master passphrase reset successful.")
})

export const SwaggerPassphraseGenerated = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Passphrase generated",
  schema: GeneratedPassphraseSchema
})

export const SwaggerVersionFetched = () => ApiResponse({
  status: HttpStatus.OK,
  description: "Version information",
  schema: generateMessageSchema("Passenger CLI X.Y.Z")
})