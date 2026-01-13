import { Injectable } from '@nestjs/common';
import { Movie } from 'src/domain/entities/movie.entity';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { GetAllMoviesDto } from './GetAllMoviesDto';

@Injectable()
export class GetAllMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(filters?: GetAllMoviesDto): Promise<Movie[]> {
    return this.movieRepository.findAll({
      category: filters?.category,
    });
  }
}
