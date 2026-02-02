import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { UpdateMovieDto } from './UpdateMovieDto';
import { Movie } from 'src/domain/entities/movie.entity';

@Injectable()
export class UpdateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string, dto: UpdateMovieDto): Promise<Movie> {
    const existingMovie = await this.movieRepository.findById(id);

    if (!existingMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return this.movieRepository.update(id, dto);
  }
}
