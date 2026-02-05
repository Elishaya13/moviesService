import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non définies dans les DTOs
      forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés non définies
      transform: true, // Transforme les payloads en instances de classes DTO
    }),
  ); // Active la validation globale des DTOs
  app.enableCors(); // Permet les requêtes cross-origin, nécessaire pour le frontend

  // --- Configuration Swagger ---
  const config = new DocumentBuilder()
    .setTitle('Movies Service')
    .setDescription('Microservice de gestion du catalogue de films')
    .setVersion('1.0')
    .addBearerAuth() // Ajoute la possibilité d'authentification par token dans Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
