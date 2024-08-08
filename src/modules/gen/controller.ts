import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common"
import { ApiQuery, ApiTags } from "@nestjs/swagger"
import { Request, Response } from 'express'
import { generatePassphrase, manipulatePassphrase } from "../../services/generationServices"
import { versionNumber } from "../../services/otherServices"
import Translate from "../../utilities/Translate"
import { GenerateRequest, ManipulateRequest } from "./dto"
import { SwaggerPassphraseGenerated } from "src/decorators/endpoint"

@ApiTags("Generators")
@Controller("/")
export class GeneratorController {
  @Get("generate")
  @SwaggerPassphraseGenerated()
  @ApiQuery({
    type: GenerateRequest,
    description: "The length of the passphrase to generate.",
  })
  async generate(
    @Req() request: Request,
    @Res() response: Response
  ) {
    const length = parseInt(request.query.length as string ?? "32")
    const output = await generatePassphrase(length > 4096
      ? 32
      : length < 8
        ? 32
        : length
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0 ? {
      generated: output.stdout,
      ...(length > 4096
        ? { message: "Length exceeds 4096, defaulting to 32." }
        : length < 8
          ? { message: "Length is less than 8, defaulting to 32." }
          : {}
      )
    } : Translate.errorMessages(output.stderr))
  }

  @Post("manipulate")
  async manipulate(
    @Body() body: ManipulateRequest,
    @Res() response: Response
  ) {
    if (!body.passphrase) return response
      .status(HttpStatus.BAD_REQUEST)
      .send({
        message: "Passphrase is required."
      })

    if (body.passphrase.length > 4096) return response
      .status(HttpStatus.BAD_REQUEST)
      .send({
        message: "Passphrase length exceeds 4096."
      })

    const output = await manipulatePassphrase(body.passphrase)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? { manipulated: output.stdout }
      : Translate.errorMessages(output.stderr)
    )
  }

  @Get("version")
  async version(@Res() res: any) {
    const output = await versionNumber()

    return res.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? { version: output.stdout }
      : Translate.errorMessages(output.stderr)
    )
  }
}
