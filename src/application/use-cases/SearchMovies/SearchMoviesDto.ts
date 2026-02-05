/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchMoviesDto {
  @ApiPropertyOptional({ description: 'Filtrer par titre' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Filtrer par catégorie' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Note minimale', example: 7 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minRating?: number;
}
