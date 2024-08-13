import { HttpStatus } from "@nestjs/common";
import exitStatus from "./ExitStatus";
import { Request } from "express";

/**
 * Passenger CLI Translation Utility
 *
 * Core application is designed to be able to be
 * easily translated to an HTTP API. This utility
 * is used to translate the core application to
 * an HTTP API.
 */
class Translate {
  public static exitToStatus = (exit: number): HttpStatus =>
    exitStatus[exit as keyof typeof exitStatus]

  public static unixErrorToMessage = (error: string): string => error
    .replace(/^passenger: /, "")
    .replace(/^[a-z]/, (letter) => letter.toUpperCase())

  public static errorMessages = (error: string): {
    message: string
  } => ({
    message: Translate.unixErrorToMessage(error)
  })

  public static bearerToToken = (request: Request): string =>
    request.headers.authorization?.replace(/^Bearer /, "") ?? ""
}

export default Translate
