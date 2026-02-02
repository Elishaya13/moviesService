import { Controller, Get, Query } from '@nestjs/common';
import { GetAllMoviesUseCase } from '../../application/use-cases/GetAllMovies/GetAllMoviesUseCase';
import { GetAllMoviesDto } from '../../application/use-cases/GetAllMovies/GetAllMoviesDto';

@Controller('movies')
export class MovieController {
  constructor(private readonly getAllMoviesUseCase: GetAllMoviesUseCase) {}

  @Get()
  async getMovies(@Query() queryParams: GetAllMoviesDto) {
    return this.getAllMoviesUseCase.execute(queryParams);
  }
}
