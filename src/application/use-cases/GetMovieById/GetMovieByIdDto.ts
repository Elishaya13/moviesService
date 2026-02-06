import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetMovieByIdDto {
  @ApiProperty({
    description: 'ID unique du film (UUID)',
    example: 'ac5ca30d-8e60-4e0f-8e5f-916525f92195',
  })
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}
