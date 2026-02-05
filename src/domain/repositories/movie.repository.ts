import { SearchMoviesDto } from 'src/application/use-cases/SearchMovies/SearchMoviesDto';
import { Movie } from '../entities/movie.entity';

export interface MovieFilters {
  category?: string;
}

export abstract class MovieRepository {
  abstract create(movie: Omit<Movie, 'id'>): Promise<Movie>;
  abstract findAll(filters?: MovieFilters): Promise<Movie[]>;
  abstract findById(id: string): Promise<Movie | null>;
  abstract update(id: string, movie: Partial<Movie>): Promise<Movie>;
  abstract delete(id: string): Promise<void>;
  abstract search(filters: SearchMoviesDto): Promise<Movie[]>;
}
