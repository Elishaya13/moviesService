import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { Result } from 'src/shared/result';
import { SearchMoviesDto } from './SearchMoviesDto';
import { Movie } from 'src/domain/entities/movie.entity';

@Injectable()
export class SearchMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(dto: SearchMoviesDto): Promise<Result<Movie[]>> {
    try {
      const movies = await this.movieRepository.search(dto);

      // Même si la liste est vide (on renvoie [] )
      return Result.ok<Movie[]>(movies);
    } catch (error) {
      console.error('Error searching movies:', error);
      return Result.fail<Movie[]>(
        'Une erreur est survenue lors de la recherche des films',
      );
    }
  }
}
