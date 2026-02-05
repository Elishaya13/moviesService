import { Injectable } from '@nestjs/common';
import { Movie } from 'src/domain/entities/movie.entity';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { Result } from 'src/shared/result';

@Injectable()
export class GetMovieByIdUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<Result<Movie | null>> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      return Result.fail<Movie | null>('Movie not found');
    }
    return Result.ok<Movie | null>(movie);
  }
}
