import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { AppModule } from './app.module';
import { PORT } from './core/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule
    , {
      logger: WinstonModule.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/logs.log' }),
        ],
      })
    }
  );
  //Swagger API documentation configuration
  const config = new DocumentBuilder()
    .setTitle('Ing Atms Apis')
    .setDescription('Ing Atms API Documenation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Please Enter Bearer Token',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap();
