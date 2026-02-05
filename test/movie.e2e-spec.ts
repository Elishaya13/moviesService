import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import * as jwt from 'jsonwebtoken';
import { MovieCategory } from 'src/domain/entities/movie-category.enum';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  // let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // On active les pipes pour transformer les strings en Date dans les tests
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();

    // prisma = app.get(PrismaService);

    const secret = 'KeySecretMovies';
    adminToken = jwt.sign(
      {
        sub: 'user_admin_01',
        username: 'admin_test',
        role: 'admin',
      },
      secret,
    );
  });

  // TEST 1 : Succès avec Auth et date fixe
  it('/movies (POST) - Success', () => {
    // On utilise un titre unique pour ce test précis pour ne pas polluer ta base
    const testMovieTitle = `Inception-Test-${Date.now()}`;

    return request(app.getHttpServer())
      .post('/movies')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: testMovieTitle,
        description: 'A thief who steals corporate secrets...',
        duration: 148,
        coverImage: 'https://example.com/inception.jpg',
        category: MovieCategory.SCI_FI,
        // Format ISO complet pour que Prisma accepte la date sans broncher
        releaseDate: '2010-07-16T00:00:00.000Z',
        rating: 8.8,
      })
      .expect(201)
      .expect(
        ({
          body,
        }: {
          body: { title: string; id: string; releaseDate: string };
        }) => {
          expect(body.title).toBe(testMovieTitle);
          expect(body.id).toBeDefined();
          expect(body.releaseDate).toContain('2010-07-16');
        },
      );
  });

  // TEST 2 : Sécurité
  it('/movies (POST) - Failure (Unauthorized)', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({ title: 'Stranger Movie' })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
