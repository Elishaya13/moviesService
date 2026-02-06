import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDate,
  IsUrl,
  IsInt,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MovieCategory } from 'src/domain/entities/movie-category.enum';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Un film sur les rêves' })
  @IsString()
  description!: string;

  @ApiProperty({
    enum: MovieCategory,
    example: MovieCategory.ACTION,
    description:
      'Catégorie du film (voir la liste des choix possibles dans le Schema)',
  })
  @IsEnum(MovieCategory) // Vérifie que la valeur envoyée est bien dans l'enum
  category!: MovieCategory;

  @ApiProperty({ example: '2010-07-16' })
  @Type(() => Date)
  @IsDate()
  releaseDate!: Date;

  @ApiProperty({ example: 148 })
  @IsInt()
  @Min(1)
  duration!: number;

  @ApiProperty({ example: 'https://image.com/poster.jpg' })
  @IsUrl()
  coverImage!: string;

  @ApiProperty({ example: 8.8 })
  @IsNumber()
  @Min(0)
  @Max(10)
  rating!: number;
}
