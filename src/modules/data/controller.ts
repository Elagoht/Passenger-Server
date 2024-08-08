import {
  Body, Controller, Delete, Get, Header,
  HttpStatus, Param, Post, Put, Query,
  Req, Res, UploadedFile, UseInterceptors
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger"
import { Request, Response } from "express"
import { exportToCSV, importFromBrowser } from "src/services/dataTransferServices"
import {
  createEntry, deleteEntry, fetchAllEntries,
  fetchEntry, queryEntries, updateEntry
} from "src/services/passphraseServices"
import Translate from "src/utilities/Translate"
import {
  ExportRequest, ImportRequest,
  PassphraseEntryRequest
} from "./dto"

@ApiTags("Database")
@Controller("/")
@ApiBearerAuth()
export class DatabaseController {
  @Post("create")
  async create(
    @Body() body: PassphraseEntryRequest,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await createEntry(Translate.bearerToToken(request), body)

    return response.status(output.exitCode === 0
      ? HttpStatus.CREATED
      : Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Get("fetch-all")
  async fetchAll(
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await fetchAllEntries(Translate.bearerToToken(request))

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Get("fetch/:uuid")
  async fetch(
    @Param("uuid") uuid: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await fetchEntry(Translate.bearerToToken(request), uuid)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Get("query")
  async query(
    @Query("q") q: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await queryEntries(Translate.bearerToToken(request), q)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Put("update/:uuid")
  async update(
    @Param("uuid") uuid: string,
    @Req() request: Request,
    @Body() body: PassphraseEntryRequest,
    @Res() response: Response
  ) {
    const output = await updateEntry(Translate.bearerToToken(request), uuid, body)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Delete("delete/:uuid")
  async delete(
    @Param("uuid") uuid: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await deleteEntry(Translate.bearerToToken(request), uuid)
    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Post("import")
  @UseInterceptors(FileInterceptor("file"))
  @ApiQuery({ type: ImportRequest, description: 'Decide export file format' })
  async import(
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
    @Query() browser: keyof ImportRequest,
    @Res() response: Response
  ) {
    const output = await importFromBrowser(Translate.bearerToToken(request), browser,
      file.buffer.toString("utf-8")
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Get("export")
  @Header("Content-Type", "text/csv")
  @ApiQuery({ type: ExportRequest, description: 'Decide export file format' })
  async export(
    @Req() request: Request,
    @Query() type: keyof ExportRequest,
    @Res() response: Response
  ) {
    const output = await exportToCSV(Translate.bearerToToken(request), type)

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? output.stdout
      : Translate.errorMessages(output.stderr)
    )
  }
}
