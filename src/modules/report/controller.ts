import { Controller, Get, Req, Res } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { Request, Response } from 'express'
import { getDetectiveReports, getStatistics } from "../../services/reportServices"
import Translate from "../../utilities/Translate"
import { SwaggerDetectiveReportsFetched, SwaggerStatisticsFetched } from "src/decorators/endpoint"

@ApiTags("Reports")
@Controller("/")
@ApiBearerAuth()
export class ReportController {
  @Get("stats")
  @SwaggerStatisticsFetched()
  async stats(
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await getStatistics(Translate.bearerToToken(request))

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }

  @Get("detect")
  @SwaggerDetectiveReportsFetched()
  async detect(
    @Req() request: Request,
    @Res() response: Response
  ) {
    const output = await getDetectiveReports(Translate.bearerToToken(request))

    return response.status(
      Translate.exitToStatus(output.exitCode)
    ).send(output.exitCode === 0
      ? JSON.parse(output.stdout)
      : Translate.errorMessages(output.stderr)
    )
  }
}
