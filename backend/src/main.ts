import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://80.87.195.94:5173",
      "http://80.87.195.94:3000",
    ],
    credentials: true,
  });

  app.setGlobalPrefix("api");

  await app.listen(3000);
}
bootstrap();
