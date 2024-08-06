import { Module } from "@nestjs/common";
import { PassengerController } from "./passenger.controller";

@Module({
  imports: [],
  controllers: [PassengerController],
  providers: [],
})
export class AppModule {}
