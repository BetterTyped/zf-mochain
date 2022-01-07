import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import {NestExpressApplication} from "@nestjs/platform-express";
import {setup} from "./utils/setup.util";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  setup(app);
  await app.listen(port);
}
bootstrap();
