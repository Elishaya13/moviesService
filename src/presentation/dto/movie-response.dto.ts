import { ApiProperty } from '@nestjs/swagger';
import { MovieCategory } from 'src/domain/entities/movie-category.enum';

export class MovieResponseDto {
  @ApiProperty({ example: 'uuid-1234' })
  id: string;

  @ApiProperty({ example: 'Inception' })
  title: string;

  @ApiProperty({ example: 'Un film sur les rêves' })
  description: string;

  @ApiProperty({ example: 148 })
  duration: number;

  @ApiProperty({ example: 'https://image.com/poster.jpg' })
  coverImage: string;

  @ApiProperty({ enum: MovieCategory, example: MovieCategory.ACTION })
  category: MovieCategory;

  @ApiProperty({ example: '2010-07-16' })
  releaseDate: Date;

  @ApiProperty({ example: 8.8 })
  rating: number;
}
