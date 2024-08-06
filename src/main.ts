import { NestFactory } from "@nestjs/core";
import { AppModule } from "./passenger.module";

async function bootstrap() {
  const passenger = await NestFactory.create(AppModule);
  await passenger.listen(3000);
}
bootstrap();
