import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('MovieController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // TEST 1 : Création réussie
  it('/movies (POST) - Success', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Inception',
        description: 'A thief who steals corporate secrets...',
        duration: 148,
        coverImage: 'https://example.com/inception.jpg',
        category: 'Sci-Fi',
        releaseDate: new Date(),
        rating: 8.8,
      })
      .expect(201) // Vérifie que le contrôleur renvoie 201
      .expect((res) => {
        // On crée une constante typée pour forcer le linter à valider l'accès
        const body = res.body as { title: string; id: string };
        expect(body.title).toBe('Inception');
        expect(body.id).toBeDefined();
      });
  });

  // TEST 2 : Échec de validation (Rating trop élevé)
  it('/movies (POST) - Failure (Validation error)', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Bad Movie',
        duration: 120,
        rating: 15, // La validation dans Movie.create() devrait bloquer ici
      })
      .expect(400) // Vérifie que le contrôleur renvoie 400 en cas de result.isFailure
      .expect((res) => {
        const body = res.body as { message: string };
        expect(body.message).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
