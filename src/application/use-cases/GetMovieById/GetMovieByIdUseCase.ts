import { Injectable } from '@nestjs/common';
import { Movie } from 'src/domain/entities/movie.entity';
import { MovieRepository } from 'src/domain/repositories/movie.repository';

@Injectable()
export class GetMovieByIdUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<Movie | null> {
    return this.movieRepository.findById(id);
  }
}
