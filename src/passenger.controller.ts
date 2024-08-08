import {
  Body, Controller, Delete, Get, Header,
  Headers, HttpCode, HttpStatus, Param, Post, Put,
  Query, Res, UploadedFile, UseInterceptors
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiQuery, ApiTags } from "@nestjs/swagger"
import { Response } from 'express'
import {
  AuthRequest, ExportRequest, ImportRequest, ManipulateRequest,
  PassphraseEntryRequest,
  ResetMasterPassphraseRequest
} from "./passenger.dto"
import {
  loginToPassenger, registerToPassenger,
  resetMasterPassphrase
} from "./services/authServices"
import { exportToCSV, importFromBrowser } from "./services/dataTransferServices"
import { generatePassphrase, manipulatePassphrase } from "./services/generationServices"
import { versionNumber } from "./services/otherServices"
import {
  createEntry, deleteEntry, fetchAllEntries,
  fetchEntry, queryEntries, updateEntry
} from "./services/passphraseServices"
import { getDetectiveReports, getStatistics } from "./services/reportServices"
import Translate from "./utilities/Translate"

@ApiTags("Commands")
@Controller("/")
export class PassengerController {
  @Post("register")
  async register(
    @Body() body: AuthRequest,
    @Res() response: Response
  ) {
    const output = await registerToPassenger(
      body.username,
      body.passphrase
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send({
      message: output.exitCode === 0
        ? "Registration successful."
        : output.stderr
    })
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: AuthRequest,
    @Res() response: Response
  ) {
    const output = await loginToPassenger(
      body.username,
      body.passphrase
    )

    console.log("stdout:", output.stdout)
    console.log("stderr:", output.stderr)
    console.log("exited:", output.exitCode)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? { accessToken: output.stdout }
      : { message: output.stderr })
  }

  @Post("reset")
  async reset(
    @Body() body: ResetMasterPassphraseRequest,
    @Headers("authorization") authorization: string,
    @Res() response: Response
  ) {
    const output = await resetMasterPassphrase(
      authorization,
      body.oldPassphrase,
      body.newPassphrase
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send({
      message: output.exitCode === 0
        ? "Master passphrase reset successful."
        : output.stderr
    })
  }

  @Post("create")
  async create(
    @Body() body: PassphraseEntryRequest,
    @Headers("authorization") authorization: string,
    @Res() response: Response
  ) {
    const output = await createEntry(authorization, body)

    return response.status(
      Translate.exitToStatus(output.exitCode === 0
        ? HttpStatus.CREATED
        : output.exitCode
      )
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : { message: output.stderr }
    )
  }

  @Get("fetch-all")
  async fetchAll(
    @Headers("authorization") authorization: string,
    @Res() response: Response
  ) {
    const output = await fetchAllEntries(
      authorization
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : { message: output.stderr }
    )
  }

  @Get("fetch/:uuid")
  async fetch(
    @Param("uuid") uuid: string,
    @Headers("authorization") authorization: string,
    @Res() response: Response
  ) {
    const output = await fetchEntry(authorization, uuid)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0 ? {
      entry: JSON.parse(output.stdout)
    } : {
      message: output.stderr
    })
  }

  @Get("query")
  async query(
    @Query("q") q: string,
    @Headers("authorization") authorization: string,
    @Res() response: Response
  ) {
    const output = await queryEntries(authorization, q)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0 ? {
      entries: JSON.parse(output.stdout)
    } : {
      message: output.stderr
    })
  }

  @Put("update/:uuid")
  async update(
    @Param("uuid") uuid: string,
    @Headers("authorization") authorization: string,
    @Body() body: PassphraseEntryRequest,
    @Res() response: Response
  ) {
    const output = await updateEntry(authorization, uuid, body)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : { message: output.stderr }
    )
  }

  @Delete("delete/:uuid")
  async delete(
    @Param("uuid") uuid: string,
    @Headers("authorization") authorization: string,
    @Res() response: Response
  ) {
    const output = await deleteEntry(authorization, uuid)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : { message: output.stderr }
    )
  }

  @Get("stats")
  async stats(
    @Headers("authorization") authorization: string,
    @Res() response: Response
  ) {
    const output = await getStatistics(authorization)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : { message: output.stderr }
    )
  }

  @Get("detect")
  async detect(
    @Headers("authorization") authorization: string,
    @Res() response: Response
  ) {
    const output = await getDetectiveReports(authorization)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : { message: output.stderr }
    )
  }

  @Post("import")
  @UseInterceptors(FileInterceptor("file"))
  async import(
    @Headers("authorization") authorization: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ImportRequest,
    @Res() response: Response
  ) {
    const output = await importFromBrowser(
      authorization,
      body.browser,
      file.buffer.toString("utf-8")
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : { message: output.stderr }
    )
  }

  @Get("export")
  @Header("Content-Type", "text/csv")
  @ApiQuery({ type: ExportRequest, description: 'Decide export file format' })
  async export(
    @Headers("authorization") authorization: string,
    @Query() type: keyof ExportRequest,
    @Res() response: Response
  ) {
    const output = await exportToCSV(authorization, type)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? output.stdout
      : { message: output.stderr }
    )
  }

  @Get("generate")
  async generate(
    @Query("length") length: number = 32,
    @Res() response: Response,
  ) {
    const output = await generatePassphrase(length <= 4096
      ? length
      : 32
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0 ? {
      generated: output.stdout,
      ...(length > 4096
        ? { message: "Length exceeds 4096, defaulting to 32." }
        : {}
      )
    } : {
      message: output.stderr
    })
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
      : { message: output.stderr }
    )
  }

  @Get("version")
  async version(@Res() res: any) {
    const output = await versionNumber()

    return res.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? { version: output.stdout }
      : { message: output.stderr }
    )
  }
}
