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

  app.enableCors({
    origin: ['http://localhost:4000'], // Remplacez par l'URL de votre service backend cinema-service
    methods: 'GET', // Autorise uniquement les requêtes GET
  });

  // --- Configuration Swagger ---
  const config = new DocumentBuilder()
    .setTitle('Movies Service')
    .setDescription('Microservice de gestion du catalogue de films')
    .setVersion('1.0')
    .addBearerAuth() // Ajoute la possibilité d'authentification par token dans Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      // On garde tagsSorter en 'alpha' pour que "1. Public" reste avant "2. Admin"
      tagsSorter: 'alpha',

      // On définit l'ordre des verbes manuellement
      operationsSorter: (a: any, b: any) => {
        const methodsOrder = ['get', 'post', 'patch', 'put', 'delete'];
        let result =
          methodsOrder.indexOf(a.get('method')) -
          methodsOrder.indexOf(b.get('method'));

        // Si les méthodes sont identiques, on trie par l'URL (path)
        if (result === 0) {
          result = a.get('path').localeCompare(b.get('path'));
        }
        return result;
      },
    },
  });

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
