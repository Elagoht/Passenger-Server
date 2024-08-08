import { ApiProperty } from "@nestjs/swagger"

export class ManipulateRequest {
  @ApiProperty({ example: "************" })
  passphrase: string
}