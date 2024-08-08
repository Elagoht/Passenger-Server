import { HttpStatus } from "@nestjs/common";

/**
 * Exit Code + Status Code = Exit Status
 */
const exitStatus = {
  0: HttpStatus.OK,
  33: HttpStatus.SEE_OTHER,
  40: HttpStatus.BAD_REQUEST,
  41: HttpStatus.UNAUTHORIZED,
  43: HttpStatus.FORBIDDEN,
  44: HttpStatus.NOT_FOUND,
  46: HttpStatus.NOT_ACCEPTABLE,
  49: HttpStatus.CONFLICT,
  45: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
  50: HttpStatus.INTERNAL_SERVER_ERROR
}

export default exitStatus