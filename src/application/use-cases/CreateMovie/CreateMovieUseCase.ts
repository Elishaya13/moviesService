import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { CreateMovieDto } from './CreateMovieDto';
import { Movie } from 'src/domain/entities/movie.entity';

@Injectable()
export class CreateMovieUseCase {
  // Implementation of the use case to create a movie
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(dto: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.create({
      title: dto.title,
      description: dto.description,
      category: dto.category,
      releaseDate: dto.releaseDate,
      duration: dto.duration,
      coverImage: dto.coverImage,
      rating: dto.rating,
    });
  }
}
