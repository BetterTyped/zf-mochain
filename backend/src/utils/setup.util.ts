import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const useSwagger = (app: NestExpressApplication) => {
  const path = '/docs';

  const options = new DocumentBuilder()
    .setTitle('Mochain api')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(path, app, document);
};


export const setup = (app: NestExpressApplication) => {
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  useSwagger(app);
  app.useLogger(logger);
  app.enableCors({
    exposedHeaders: 'log-filename',
  });

  return {
    getLogger: () => logger.logger,
  };
};
