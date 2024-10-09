import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API ecommerce Mariano Hilario - example')
    .setDescription(
      "API built with NestJS, PostgreSQL, Typeorm, Swagger and JWT for the Backend specialty of the Fullstack Developer career. In it you can create, update, delete and view information about products, categories, orders, and view a user's purchase history.",
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // With the following line we remove the keys from the schemas
  document.components.schemas = Object.keys(document.components.schemas)
    .filter((key) => key !== '')
    .reduce((acc, key) => {
      acc[key] = document.components.schemas[key];
      return acc;
    }, {});
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
