import { Movie } from '../entities/movie.entity';

export interface MovieFilters {
  category?: string;
}
export interface MovieSearchCriteria {
  title?: string;
  category?: string;
  minRating?: number;
}

export abstract class MovieRepository {
  abstract create(movie: Omit<Movie, 'id'>): Promise<Movie>;
  abstract findAll(): Promise<Movie[]>;
  abstract findById(id: string): Promise<Movie | null>;
  abstract update(id: string, movie: Partial<Movie>): Promise<Movie>;
  abstract delete(id: string): Promise<void>;
  abstract search(filters: MovieSearchCriteria): Promise<Movie[]>;
}
