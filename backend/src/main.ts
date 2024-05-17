import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env, EnvService } from './infra/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { ConfigService } from '@nestjs/config';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule, {
    snapshot: true,
    rawBody: true,
    // logger: false,
  });

  const configService: ConfigService<Env, true> = app.get(EnvService);
  const port = configService.get('PORT', { infer: true });

  function getSwaggerServerUrl() {
    switch (process.env.NODE_ENV) {
      case 'production':
        return 'https://localhost';
      default:
        return `http://localhost:${port}`;
    }
  }

  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('0.1')
    .addServer(getSwaggerServerUrl())
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const redocOptions: RedocOptions = {
    title: 'Project Base',
    logo: {
      url: `http://localhost:${port}/document-logo.jpg`,
      backgroundColor: '#FFFFFF',
      altText: 'Project Base',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    auth: {
      enabled: true,
      user: 'admin',
      password: '123',
    },
  };
  app.enableCors();

  await RedocModule.setup('/docs/v1', app, document, redocOptions);
  //SwaggerModule.setup('docs/v1', app, document);

  await app.listen(port);
}
bootstrap();
