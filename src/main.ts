import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Permet les requêtes cross-origin, nécessaire pour le frontend

  // --- Configuration Swagger ---
  const config = new DocumentBuilder()
    .setTitle('Movies Service')
    .setDescription('Microservice de gestion du catalogue de films')
    .setVersion('1.0')
    .addTag('movies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
