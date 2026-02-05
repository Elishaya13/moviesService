import { Injectable } from '@nestjs/common';
import { Movie } from 'src/domain/entities/movie.entity';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { GetAllMoviesDto } from './GetAllMoviesDto';
import { Result } from 'src/shared/result';

@Injectable()
export class GetAllMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(filters?: GetAllMoviesDto): Promise<Result<Movie[]>> {
    const movies = await this.movieRepository.findAll({
      category: filters?.category,
    });
    return Result.ok<Movie[]>(movies);
  }
}
