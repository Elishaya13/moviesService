import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { CreateMovieDto } from './CreateMovieDto';
import { Movie } from 'src/domain/entities/movie.entity';
import { Result } from 'src/shared/result';

@Injectable()
export class CreateMovieUseCase {
  // Implementation of the use case to create a movie
  constructor(private readonly movieRepository: MovieRepository) {}

  // async execute(dto: CreateMovieDto): Promise<Movie> {
  //   return this.movieRepository.create({
  //     title: dto.title,
  //     description: dto.description,
  //     category: dto.category,
  //     releaseDate: dto.releaseDate,
  //     duration: dto.duration,
  //     coverImage: dto.coverImage,
  //     rating: dto.rating,
  //   });
  // }
  async execute(dto: CreateMovieDto): Promise<Result<Movie>> {
    // Ajoute le type Result ici
    const movieResult = Movie.create(dto); // Utilise la validation de l'entité

    if (movieResult.isFailure) {
      return Result.fail<Movie>(movieResult.error as string); // Retourne l'erreur si la validation échoue
    }

    const movie = movieResult.getValue();
    await this.movieRepository.create(movie);

    return Result.ok<Movie>(movie);
  }
}
