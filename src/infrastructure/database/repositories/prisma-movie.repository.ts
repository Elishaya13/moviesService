import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  MovieFilters,
  MovieRepository,
} from 'src/domain/repositories/movie.repository';
import { Movie } from 'src/domain/entities/movie.entity';
import { Prisma, Movie as PrismaMovie } from '@prisma/client';
import { SearchMoviesDto } from 'src/application/use-cases/SearchMovies/SearchMoviesDto';

// Prisma implementation of the MovieRepository interface
@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Méthode de mapping pour transformer les données Prisma en entités du Domaine (Movie)
  // Centralise la transformation Primsa -> Domaine
  private mapToDomain(movie: PrismaMovie): Movie {
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

  // Implémentation des méthodes du MovieRepository en utilisant Prisma
  // Create
  async create(movieData: Omit<Movie, 'id'>): Promise<Movie> {
    const created = await this.prisma.movie.create({
      data: { ...movieData },
    });
    return this.mapToDomain(created);
  }

  // Read
  async findAll(filters?: MovieFilters): Promise<Movie[]> {
    const where: Prisma.MovieWhereInput = filters?.category
      ? { category: filters.category }
      : {};
    const movies = await this.prisma.movie.findMany({ where });
    return movies.map((m) => this.mapToDomain(m));
  }
  // async findAll(filters?: MovieFilters): Promise<Movie[]> {
  //   const where: Prisma.MovieWhereInput = {};

  //   if (filters?.category) {
  //     where.category = filters.category;
  //   }

  //   const movies = await this.prisma.movie.findMany({ where });
  //   return movies.map((m) =>
  //     Movie.toDomain({
  //       id: m.id,
  //       title: m.title,
  //       description: m.description,
  //       duration: m.duration,
  //       coverImage: m.coverImage,
  //       category: m.category,
  //       releaseDate: m.releaseDate,
  //       rating: m.rating,
  //     }),
  //   );
  // }

  // async findById(id: string): Promise<Movie | null> {
  //   const movie = await this.prisma.movie.findUnique({ where: { id } });
  //   if (!movie) return null;
  //   return Movie.toDomain({
  //     id: movie.id,
  //     title: movie.title,
  //     description: movie.description,
  //     duration: movie.duration,
  //     coverImage: movie.coverImage,
  //     category: movie.category,
  //     releaseDate: movie.releaseDate,
  //     rating: movie.rating,
  //   });
  // }

  // Read by ID
  async findById(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    return movie ? this.mapToDomain(movie) : null;
  }

  // Update
  // async update(id: string, movieData: Partial<Movie>): Promise<Movie> {
  //   const updated = await this.prisma.movie.update({
  //     where: { id },
  //     data: movieData,
  //   });
  //   return Movie.toDomain({
  //     id: updated.id,
  //     title: updated.title,
  //     description: updated.description,
  //     duration: updated.duration,
  //     coverImage: updated.coverImage,
  //     category: updated.category,
  //     releaseDate: updated.releaseDate,
  //     rating: updated.rating,
  //   });
  // }
  async update(id: string, movieData: Partial<Movie>): Promise<Movie> {
    const updated = await this.prisma.movie.update({
      where: { id },
      data: movieData,
    });
    return this.mapToDomain(updated);
  }

  // Delete
  async delete(id: string): Promise<void> {
    await this.prisma.movie.delete({ where: { id } });
  }

  // Search with filters
  async search(filters: SearchMoviesDto): Promise<Movie[]> {
    const where: Prisma.MovieWhereInput = {
      title: filters.title
        ? { contains: filters.title, mode: 'insensitive' }
        : undefined,
      category: filters.category || undefined,
      rating: filters.minRating ? { gte: filters.minRating } : undefined,
    };

    const movies = await this.prisma.movie.findMany({ where });
    return movies.map((m) => this.mapToDomain(m));
  }
}
