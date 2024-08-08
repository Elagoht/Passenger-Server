import { ApiProperty } from "@nestjs/swagger"

export class AuthRequest {
  @ApiProperty({ example: "johndoe", required: true })
  username: string
  @ApiProperty({ example: "************", required: true })
  passphrase: string
}

export class ResetMasterPassphraseRequest {
  @ApiProperty({ example: "************" })
  oldPassphrase: string
  @ApiProperty({ example: "**************" })
  newPassphrase: string
}

export class PassphraseEntryRequest {
  @ApiProperty({ example: "john@doe.net" })
  identity: string
  @ApiProperty({ example: "Odysee" })
  platform: string
  @ApiProperty({ example: "https://odysee.com" })
  url: string
  @ApiProperty({ example: "johndoe" })
  passphrase: string
  @ApiProperty({ example: "A video sharing platform", nullable: true })
  notes: string
}

export class ManipulateRequest {
  @ApiProperty({ example: "************" })
  passphrase: string
}

enum BrowserType {
  CHROMIUM = "chromium",
  FIREFOX = "firefox",
  SAFARI = "safari"
}

export class ImportRequest {
  @ApiProperty({
    enum: BrowserType,
    example: BrowserType.CHROMIUM,
    default: BrowserType.CHROMIUM
  })
  browser: string
}

export enum ExportType {
  BARE = "bare",
  ENCRYPTED = "encrypted"
}

export class ExportRequest {
  @ApiProperty({ enum: ExportType, default: ExportType.BARE })
  browser: string
}