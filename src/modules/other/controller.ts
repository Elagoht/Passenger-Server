import { Controller, Get, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { versionNumber } from "../../services/otherServices"
import Translate from "../../utilities/Translate"

@ApiTags("Other")
@Controller("/")
export class OthersController {
  @Get("version")
  async version(@Res() res: any) {
    const output = await versionNumber()

    return res.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? { version: output.stdout }
      : Translate.errorMessages(output.stderr)
    )
  }
}