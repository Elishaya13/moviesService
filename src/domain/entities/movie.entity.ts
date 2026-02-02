import { ApiProperty } from '@nestjs/swagger';

export class Movie {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  coverImage: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  rating: number;
  constructor(
    id: string,
    title: string,
    description: string,
    duration: number,
    coverImage: string,
    category: string,
    releaseDate: Date,
    rating: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.coverImage = coverImage;
    this.category = category;
    this.releaseDate = releaseDate;
    this.rating = rating;
  }
}
