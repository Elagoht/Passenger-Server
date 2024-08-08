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