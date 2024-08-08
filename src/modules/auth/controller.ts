import {
  Body, Controller, HttpCode,
  HttpStatus, Patch, Post, Req, Res
} from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Request, Response } from 'express'
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
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Successfully registered",
    schema: {
      example: {
        message: "Registration successful."
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "User already exists",
    schema: {
      example: {
        message: "A user with the same username already exists"
      }
    }
  })
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
    ).send({
      message: output.exitCode === 0
        ? "Registration successful."
        : Translate.errorMessages(output.stderr)
    })
  }

  @Post("login")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully logged in",
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkJlYXJlciJ9...',
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Authorization failed",
    schema: {
      example: {
        message: "Authorization failed."
      }
    }
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully reset master passphrase",
    schema: {
      example: {
        message: "Master passphrase reset successful."
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Authorization failed",
    schema: {
      example: {
        message: "Authorization failed."
      }
    }
  })
  @ApiBearerAuth()
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
