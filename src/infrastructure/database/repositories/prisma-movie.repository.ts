/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  MovieFilters,
  MovieRepository,
} from 'src/domain/repositories/movie.repository';
import { Movie } from 'src/domain/entities/movie.entity';
import {
  Prisma,
  Movie as PrismaMovie,
  Category as PrismaCategory,
} from '@prisma/client';
import { SearchMoviesDto } from 'src/application/use-cases/SearchMovies/SearchMoviesDto';
import { MovieCategory } from 'src/domain/entities/movie-category.enum';

// Prisma implementation of the MovieRepository interface
@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(movie: PrismaMovie): Movie {
    return Movie.toDomain({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      coverImage: movie.coverImage,
      // On passe par 'unknown' pour convertir un Enum vers un autre proprement
      category: movie.category as unknown as MovieCategory,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
    });
  }

  async create(movieData: Omit<Movie, 'id'>): Promise<Movie> {
    const created = await this.prisma.movie.create({
      data: {
        ...movieData,
        category: this.toPrismaCategory(movieData.category),
      },
    });
    return this.mapToDomain(created);
  }

  async findAll(filters?: MovieFilters): Promise<Movie[]> {
    const where: Prisma.MovieWhereInput = filters?.category
      ? { category: filters.category as unknown as PrismaCategory }
      : {};
    const movies = await this.prisma.movie.findMany({ where });
    return movies.map((m) => this.mapToDomain(m));
  }

  async update(id: string, movieData: Partial<Movie>): Promise<Movie> {
    const data: Prisma.MovieUpdateInput = {
      title: movieData.title,
      description: movieData.description,
      duration: movieData.duration,
      coverImage: movieData.coverImage,
      releaseDate: movieData.releaseDate,
      rating: movieData.rating,
    };

    if (movieData.category) {
      data.category = this.toPrismaCategory(movieData.category);
    }

    const updated = await this.prisma.movie.update({
      where: { id },
      data,
    });

    return this.mapToDomain(updated);
  }

  async search(filters: SearchMoviesDto): Promise<Movie[]> {
    const where: Prisma.MovieWhereInput = {
      title: filters.title
        ? { contains: filters.title, mode: 'insensitive' }
        : undefined,
      category: filters.category
        ? this.toPrismaCategory(filters.category)
        : undefined,
      rating: filters.minRating ? { gte: filters.minRating } : undefined,
    };

    const movies = await this.prisma.movie.findMany({ where });
    return movies.map((m) => this.mapToDomain(m));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.movie.delete({ where: { id } });
  }

  async findById(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    return movie ? this.mapToDomain(movie) : null;
  }

  private toPrismaCategory(domainCat: MovieCategory): PrismaCategory {
    return domainCat as unknown as PrismaCategory;
  }

  private toDomainCategory(prismaCat: PrismaCategory): MovieCategory {
    return prismaCat as unknown as MovieCategory;
  }
}
