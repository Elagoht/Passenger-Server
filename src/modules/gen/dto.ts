import { ApiProperty } from "@nestjs/swagger"

export class ManipulateRequest {
  @ApiProperty({
    type: String,
    description: "The passphrase to manipulate.",
    example: "You can read this even if it's manipulated."
  })
  passphrase: string
}

export class GenerateRequest {
  @ApiProperty({
    type: Number,
    description: "The length of the passphrase to generate.",
    required: false
  })
  length: number
}