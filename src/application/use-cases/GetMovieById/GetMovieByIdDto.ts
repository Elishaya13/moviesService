import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetMovieByIdDto {
  @ApiProperty({
    description: 'ID unique du film ',
    example: 'ac5ca30d-8e60-4e0f-8e5f-916525f92195',
  })
  @IsNotEmpty()
  id!: string;
}
