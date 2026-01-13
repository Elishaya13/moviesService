import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaMovieRepository } from './repositories/prisma-movie.repository';
import { MovieRepository } from '../../domain/repositories/movie.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: MovieRepository,
      // Use the Prisma implementation of the MovieRepository
      useClass: PrismaMovieRepository,
    },
  ],
  exports: [PrismaService, MovieRepository],
})
export class DatabaseModule {}
