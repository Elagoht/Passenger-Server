import {
  Body, Controller, Delete, Get,
  HttpStatus, Param, Post, Put, Query,
  Req, Res, UploadedFile, UseInterceptors
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger"
import { Request, Response } from "express"
import {
  SwaggerAllEntriesFetched, SwaggerBrowserTypeError,
  SwaggerEntryCreated, SwaggerEntryDeleted,
  SwaggerEntryFetched, SwaggerEntryNotFound,
  SwaggerEntryUpdated, SwaggerEntryValidationFailed,
  SwaggerExportedToCsv, SwaggerExportTypeError,
  SwaggerFoundOnRespository, SwaggerImported,
  SwaggerInternalServerError, SwaggerProduceImportErrorResult,
  SwaggerUnauthorized
} from "src/decorators/endpoint"
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
  @SwaggerUnauthorized()
  @SwaggerEntryCreated()
  @SwaggerFoundOnRespository()
  @SwaggerEntryValidationFailed()
  async create(
    @Body() body: PassphraseEntryRequest,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await createEntry(
      Translate.bearerToToken(request),
      body
    )

    return response.status(output.exitCode === 0
      ? HttpStatus.CREATED
      : Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Get("fetch-all")
  @SwaggerUnauthorized()
  @SwaggerAllEntriesFetched()
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
  @SwaggerUnauthorized()
  @SwaggerEntryFetched()
  @SwaggerEntryNotFound()
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
  @SwaggerUnauthorized()
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
  @SwaggerUnauthorized()
  @SwaggerEntryUpdated()
  @SwaggerEntryNotFound()
  @SwaggerFoundOnRespository()
  @SwaggerEntryValidationFailed()
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
  @SwaggerUnauthorized()
  @SwaggerEntryDeleted()
  @SwaggerEntryNotFound()
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
  @ApiQuery({
    type: ImportRequest,
    description: "Specify browser type"
  })
  @SwaggerImported()
  @SwaggerUnauthorized()
  @SwaggerBrowserTypeError()
  @SwaggerInternalServerError()
  @SwaggerProduceImportErrorResult()
  @UseInterceptors(FileInterceptor("file"))
  async import(
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response
  ) {
    const output = await importFromBrowser(
      Translate.bearerToToken(request),
      request.query.browser as string,
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
  @ApiQuery({
    type: ExportRequest,
    description: "Decide export file format"
  })
  @SwaggerUnauthorized()
  @SwaggerExportedToCsv()
  @SwaggerExportTypeError()
  async export(
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await exportToCSV(
      Translate.bearerToToken(request),
      request.query.browser as string
    )

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).setHeader("Content-Type",
      output.exitCode === 0
        ? "text/csv"
        : "application/json"
    ).send(output.exitCode === 0
      ? output.stdout
      : Translate.errorMessages(output.stderr)
    )
  }
}
