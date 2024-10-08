import { NestFactory } from "@nestjs/core"
import { PassengerModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const passenger = await NestFactory.create(PassengerModule)
  passenger.enableCors({
    origin: "*",
    maxAge: 86400
  })

  if (process.env.SWAGGER === "1") {
    const document = SwaggerModule.createDocument(
      passenger,
      new DocumentBuilder()
        .setTitle("Passenger Server")
        .setDescription("An HTTP translator for Passenger Core CLI")
        .setVersion("0.3.0-beta.1")
        .setExternalDoc("Website", "https://passenger-landing.vercel.app/")
        .setLicense("GPL-3.0", "https://www.gnu.org/licenses/gpl-3.0.html")
        .addBearerAuth()
        .build()
    )

    SwaggerModule.setup(
      "swagger", passenger, document, {
      swaggerOptions: { persistAuthorization: true }
    })
  }

  await passenger.listen(3000)
}

bootstrap()
