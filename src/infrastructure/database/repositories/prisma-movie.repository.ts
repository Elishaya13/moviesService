import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  MovieFilters,
  MovieRepository,
} from 'src/domain/repositories/movie.repository';
import { Movie } from 'src/domain/entities/movie.entity';
import { Prisma } from '@prisma/client';

// Prisma implementation of the MovieRepository interface
@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(movieData: Omit<Movie, 'id'>): Promise<Movie> {
    const created = await this.prisma.movie.create({
      data: {
        title: movieData.title,
        description: movieData.description,
        duration: movieData.duration,
        coverImage: movieData.coverImage,
        category: movieData.category,
        releaseDate: movieData.releaseDate,
        rating: movieData.rating,
      },
    });
    // Return a new Movie entity
    return new Movie(
      created.id,
      created.title,
      created.description,
      created.duration,
      created.coverImage,
      created.category,
      created.releaseDate,
      created.rating,
    );
  }

  async findAll(filters?: MovieFilters): Promise<Movie[]> {
    const where: Prisma.MovieWhereInput = {};

    if (filters?.category) {
      where.category = filters.category;
    }

    const movies = await this.prisma.movie.findMany({ where });

    return movies.map(
      (m) =>
        new Movie(
          m.id,
          m.title,
          m.description,
          m.duration,
          m.coverImage,
          m.category,
          m.releaseDate,
          m.rating,
        ),
    );
  }

  async findById(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    if (!movie) return null;
    return new Movie(
      movie.id,
      movie.title,
      movie.description,
      movie.duration,
      movie.coverImage,
      movie.category,
      movie.releaseDate,
      movie.rating,
    );
  }

  async update(id: string, movieData: Partial<Movie>): Promise<Movie> {
    const updated = await this.prisma.movie.update({
      where: { id },
      data: movieData,
    });
    return new Movie(
      updated.id,
      updated.title,
      updated.description,
      updated.duration,
      updated.coverImage,
      updated.category,
      updated.releaseDate,
      updated.rating,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.movie.delete({ where: { id } });
  }
}
