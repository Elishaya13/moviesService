import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from 'src/domain/repositories/movie.repository';

@Injectable()
export class DeleteMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<void> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return this.movieRepository.delete(id);
  }
}
