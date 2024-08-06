import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import {
  AuthRequest,
  ManipulateRequest,
  PassphraseEntryRequest,
  ResetMasterPassphraseRequest,
} from "./passenger.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("/")
export class PassengerController {
  @Post("register")
  register(@Body() body: AuthRequest) {
    return `Hello, ${body.username}! We created your account with passphrase ${body.passphrase}.`;
  }

  @Post("login")
  login(@Body() body: AuthRequest) {
    return `Hello, ${body.username}! Your passphrase is ${body.passphrase}.`;
  }

  @Post("reset")
  reset(@Body() body: ResetMasterPassphraseRequest) {
    return `Hello, ${body.username}! Your old passphrase was ${body.passphrase}, and your new passphrase is ${body.newPassphrase}.`;
  }

  @Post("create")
  create(@Body() body: PassphraseEntryRequest) {
    return `Your passphrase entry for ${body.identity} on ${body.platform} which published at ${body.url} is ${body.passphrase}. ${body.notes ? `Notes: ${body.notes}` : ""}`;
  }

  @Get("fetchAll")
  fetchAll() {
    return "All your passphrase entries have been fetched.";
  }

  @Get("fetch/:uuid")
  fetch(@Param("uuid") uuid: string) {
    return `Your passphrase entry with UUID ${uuid} has been fetched.`;
  }

  @Get("query")
  query(@Query("q") q: string) {
    return `Your search query is ${q}.`;
  }

  @Put("update/:uuid")
  update(@Param("uuid") uuid: string) {
    return `Your passphrase entry with UUID ${uuid} has been updated.`;
  }

  @Delete("delete/:uuid")
  delete(@Param("uuid") uuid: string) {
    return `Your passphrase entry with UUID ${uuid} has been deleted.`;
  }

  @Get("stats")
  stats() {
    return "Here are your stats.";
  }

  @Get("detect")
  detect() {
    return "Detective did his job for you.";
  }

  @Post("import")
  @UseInterceptors(FileInterceptor("file"))
  import(@UploadedFile() file: Express.Multer.File) {
    return `Your file ${file.originalname} has been imported.`;
  }

  @Get("export")
  @Header("Content-Type", "text/csv")
  export() {
    return `platform,identity,url,passphrase,notes
Google,john doe,https://accounts.google.com,123456,This is a note.`;
  }

  @Get("generate")
  generate(@Query("length") length?: number) {
    return `Your generated passphrase is ${"x".repeat(length ?? 32)}.`;
  }

  @Post("manipulate")
  manipulate(@Body() body: ManipulateRequest) {
    return `Your passphrase is ${body.passphrase.toUpperCase()}.`;
  }

  @Get("version")
  version() {
    return { version: "0.3.0-beta.1" };
  }
}
