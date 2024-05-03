import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './infra/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule, {
    snapshot: true,
    rawBody: true,
    // logger: false,
  });

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  function getSwaggerServerUrl() {
    switch (process.env.NODE_ENV) {
      case 'production':
        return 'https://nestjs-base-project-alpha.vercel.app';
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
    title: 'Hello Nest',
    logo: {
      url: 'https://redocly.github.io/redoc/petstore-logo.png',
      backgroundColor: '#F0F0F0',
      altText: 'PetStore logo',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    auth: {
      enabled: true,
      user: 'admin',
      password: '123',
    },
    // tagGroups: [
    //   {
    //     name: 'Core resources',
    //     tags: ['cats'],
    //   },
    // ],
  };
  app.enableCors();

  await RedocModule.setup('/docs/v1', app, document, redocOptions);
  //SwaggerModule.setup('docs/v1', app, document);

  await app.listen(port);
}
bootstrap();
