import { Module } from "@nestjs/common"
import { AuthController } from "./modules/auth/controller"
import { DatabaseController } from "./modules/data/controller"
import { GeneratorController } from "./modules/gen/controller"
import { ReportController } from "./modules/report/controller"
import { OthersController } from "./modules/other/controller"

@Module({
  imports: [],
  controllers: [
    AuthController,
    DatabaseController,
    GeneratorController,
    OthersController,
    ReportController
  ],
  providers: [],
})
export class PassengerModule { }
