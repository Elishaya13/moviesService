import { Injectable } from '@nestjs/common';
import { Movie } from 'src/domain/entities/movie.entity';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { Result } from 'src/shared/result';

@Injectable()
export class GetAllMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  // On peut même retirer le paramètre "filters" s'il est vide
  async execute(): Promise<Result<Movie[]>> {
    try {
      // On appelle findAll() sans rien.
      // Le repository Prisma fera alors un "select * from movies"
      const movies = await this.movieRepository.findAll();

      return Result.ok<Movie[]>(movies);
    } catch (error) {
      console.error('Error fetching all movies:', error);
      return Result.fail<Movie[]>(
        'Impossible de récupérer le catalogue complet',
      );
    }
  }
}
