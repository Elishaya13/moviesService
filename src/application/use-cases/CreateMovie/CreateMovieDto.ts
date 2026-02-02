import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception' })
  title: string;

  @ApiProperty({ example: 'Un film sur les rêves' })
  description: string;

  @ApiProperty({ example: 'Sci-Fi' })
  category: string;

  @ApiProperty({ example: '2010-07-16' })
  releaseDate: Date;

  @ApiProperty({ example: 148 })
  duration: number;

  @ApiProperty({ example: 'https://image.com/poster.jpg' })
  coverImage: string;

  @ApiProperty({ example: 8.8 })
  rating: number;
}
