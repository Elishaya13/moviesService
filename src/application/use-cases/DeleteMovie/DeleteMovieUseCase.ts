import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { Result } from 'src/shared/result';

@Injectable()
export class DeleteMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}
  async execute(id: string): Promise<Result<void>> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      return Result.fail<void>('Movie not found');
    }

    await this.movieRepository.delete(id);
    return Result.ok<void>();
  }
}

// async execute(id: string): Promise<void> {
//   const movie = await this.movieRepository.findById(id);

//   if (!movie) {
//     throw new NotFoundException(`Movie with ID ${id} not found`);
//   }

//   return this.movieRepository.delete(id);
// }
