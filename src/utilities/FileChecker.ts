import { HttpStatus } from "@nestjs/common"

export const checkCSVFile = (file: Express.Multer.File): [HttpStatus, string
] => {
  if (!file)
    return [HttpStatus.BAD_REQUEST, "No file uploaded"]
  if (file.mimetype !== "text/csv" || !file.originalname.match(/\.(csv)$/))
    return [HttpStatus.UNSUPPORTED_MEDIA_TYPE, "File is not a CSV"]
  if (file.size > 1024 * 1024 * 8)
    return [HttpStatus.PAYLOAD_TOO_LARGE, "File is too large"]
  return [HttpStatus.OK, ""]
}