import {
  Body, Controller, HttpCode,
  HttpStatus, Patch, Post, Req, Res
} from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { Request, Response } from 'express'
import {
  SwaggerCouldNotAuthenticate, SwaggerLoggedIn,
  SwaggerMasterPassphraseUpdated, SwaggerRegistered,
  SwaggerUnauthorized, SwaggerUserAlreadyExists
} from "src/decorators/endpoint"
import {
  loginToPassenger, registerToPassenger,
  resetMasterPassphrase
} from "../../services/authServices"
import Translate from "../../utilities/Translate"
import { AuthRequest, ResetMasterPassphraseRequest } from "./dto"

@ApiTags("Authorization")
@Controller("/")
export class AuthController {
  @Post("register")
  @SwaggerRegistered()
  @SwaggerUserAlreadyExists()
  async register(
    @Body() body: AuthRequest,
    @Res() response: Response
  ) {
    const output = await registerToPassenger(
      body.username,
      body.passphrase
    )

    return response.status(output.exitCode === 0
      ? HttpStatus.CREATED
      : Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? { message: "Registration successful." }
      : Translate.errorMessages(output.stderr)
    )
  }

  @Post("login")
  @SwaggerLoggedIn()
  @SwaggerCouldNotAuthenticate()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: AuthRequest,
    @Res() response: Response
  ) {
    const output = await loginToPassenger(
      body.username,
      body.passphrase
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? { accessToken: output.stdout }
      : Translate.errorMessages(output.stderr)
    )
  }

  @Patch("reset")
  @ApiBearerAuth()
  @SwaggerUnauthorized()
  @SwaggerMasterPassphraseUpdated()
  async reset(
    @Body() body: ResetMasterPassphraseRequest,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await resetMasterPassphrase(
      Translate.bearerToToken(request),
      body.oldPassphrase,
      body.newPassphrase
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? { message: "Master passphrase reset successful." }
      : Translate.errorMessages(output.stderr)
    )
  }
}
