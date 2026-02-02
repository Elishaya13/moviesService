import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from '../CreateMovie/CreateMovieDto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
