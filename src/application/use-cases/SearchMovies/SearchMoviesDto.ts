import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieCategory } from 'src/domain/entities/movie-category.enum';

export class SearchMoviesDto {
  @ApiPropertyOptional({ description: 'Filtrer par titre' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    enum: MovieCategory,
    description: 'Filtrer par catégorie',
  })
  @IsOptional()
  @IsEnum(MovieCategory)
  category?: MovieCategory;

  @ApiPropertyOptional({ description: 'Note minimale', example: 7 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minRating?: number;
}
