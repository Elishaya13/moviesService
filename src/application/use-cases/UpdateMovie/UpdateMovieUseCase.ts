import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { UpdateMovieDto } from './UpdateMovieDto';
import { Movie } from 'src/domain/entities/movie.entity';
import { Result } from 'src/shared/result';

@Injectable()
export class UpdateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string, dto: UpdateMovieDto): Promise<Result<Movie>> {
    // 1. On vérifie si le film existe
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      return Result.fail<Movie>('Film non trouvé');
    }

    // 2. On effectue la mise à jour via le repository
    // Le repository renvoie un objet Movie, on l'emballe dans un Result.ok
    const updatedMovie = await this.movieRepository.update(id, dto);
    return Result.ok<Movie>(updatedMovie);
  }
}

// async execute(id: string, dto: UpdateMovieDto): Promise<Movie> {
//   const existingMovie = await this.movieRepository.findById(id);

//   if (!existingMovie) {
//     throw new NotFoundException(`Movie with ID ${id} not found`);
//   }
//   return this.movieRepository.update(id, dto);
// }
