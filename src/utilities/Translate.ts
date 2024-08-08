import { HttpStatus } from "@nestjs/common";
import exitStatus from "./ExitStatus";

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
}

export default Translate
