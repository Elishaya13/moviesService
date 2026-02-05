import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { UpdateMovieDto } from './UpdateMovieDto';
import { Movie } from 'src/domain/entities/movie.entity';
import { Result } from 'src/shared/result';

@Injectable()
export class UpdateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string, dto: UpdateMovieDto): Promise<Result<Movie>> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      return Result.fail<Movie>('Film non trouvé');
    }
    const updatedMovie = await this.movieRepository.update(id, dto);
    return Result.ok<Movie>(updatedMovie);
  }
}
