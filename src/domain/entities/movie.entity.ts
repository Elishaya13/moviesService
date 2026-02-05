import { ApiProperty } from '@nestjs/swagger';
import { Result } from '../../shared/result';
import { MovieCategory } from './movie-category.enum';

export interface MovieProps {
  id?: string;
  title: string;
  description: string;
  duration: number;
  coverImage: string;
  category: MovieCategory;
  releaseDate: Date;
  rating: number;
}

export class Movie {
  @ApiProperty() public readonly id: string;

  @ApiProperty() public readonly title: string;

  @ApiProperty() public readonly description: string;

  @ApiProperty() public readonly duration: number;

  @ApiProperty() public readonly coverImage: string;
  @ApiProperty({ enum: MovieCategory }) public readonly category: MovieCategory;

  @ApiProperty() public readonly releaseDate: Date;

  @ApiProperty() public readonly rating: number;

  private constructor(props: MovieProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.title = props.title;
    this.description = props.description;
    this.duration = props.duration;
    this.coverImage = props.coverImage;
    this.category = props.category;
    this.releaseDate = props.releaseDate;
    this.rating = props.rating;
  }

  public static create(props: MovieProps): Result<Movie> {
    // Validation métier
    if (!props.title || props.title.trim() === '') {
      return Result.fail<Movie>('Title is required');
    }
    if (props.duration <= 0) {
      return Result.fail<Movie>('Duration must be greater than 0');
    }
    if (props.rating < 0 || props.rating > 10) {
      return Result.fail<Movie>('Rating must be between 0 and 10');
    }
    if (props.releaseDate > new Date()) {
      return Result.fail<Movie>('Release date cannot be in the future');
    }

    // Si tout est valide, on crée l'instance de Movie
    const movie = new Movie(props);
    return Result.ok<Movie>(movie);
  }

  public static toDomain(props: MovieProps): Movie {
    return new Movie(props);
  }
}
