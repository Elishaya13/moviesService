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
    return Movie.toDomain({
      id: created.id,
      title: created.title,
      description: created.description,
      duration: created.duration,
      coverImage: created.coverImage,
      category: created.category,
      releaseDate: created.releaseDate,
      rating: created.rating,
    });
  }

  async findAll(filters?: MovieFilters): Promise<Movie[]> {
    const where: Prisma.MovieWhereInput = {};

    if (filters?.category) {
      where.category = filters.category;
    }

    const movies = await this.prisma.movie.findMany({ where });
    return movies.map((m) =>
      Movie.toDomain({
        id: m.id,
        title: m.title,
        description: m.description,
        duration: m.duration,
        coverImage: m.coverImage,
        category: m.category,
        releaseDate: m.releaseDate,
        rating: m.rating,
      }),
    );
  }

  async findById(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    if (!movie) return null;
    return Movie.toDomain({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      coverImage: movie.coverImage,
      category: movie.category,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
    });
  }

  async update(id: string, movieData: Partial<Movie>): Promise<Movie> {
    const updated = await this.prisma.movie.update({
      where: { id },
      data: movieData,
    });
    return Movie.toDomain({
      id: updated.id,
      title: updated.title,
      description: updated.description,
      duration: updated.duration,
      coverImage: updated.coverImage,
      category: updated.category,
      releaseDate: updated.releaseDate,
      rating: updated.rating,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.movie.delete({ where: { id } });
  }
}
