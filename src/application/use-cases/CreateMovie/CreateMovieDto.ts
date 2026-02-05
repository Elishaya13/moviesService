/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDate,
  IsUrl,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Un film sur les rêves' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Sci-Fi' })
  @IsString()
  category: string;

  @ApiProperty({ example: '2010-07-16' })
  @Type(() => Date)
  @IsDate()
  releaseDate: Date;

  @ApiProperty({ example: 148 })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty({ example: 'https://image.com/poster.jpg' })
  @IsUrl()
  coverImage: string;

  @ApiProperty({ example: 8.8 })
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;
}
