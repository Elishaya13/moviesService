import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { GetAllMoviesUseCase } from '../../application/use-cases/GetAllMovies/GetAllMoviesUseCase';
import { GetAllMoviesDto } from '../../application/use-cases/GetAllMovies/GetAllMoviesDto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetMovieByIdUseCase } from 'src/application/use-cases/GetMovieById/GetMovieByIdUseCase';
import { CreateMovieDto } from 'src/application/use-cases/CreateMovie/CreateMovieDto';
import { CreateMovieUseCase } from 'src/application/use-cases/CreateMovie/CreateMovieUseCase';
import { DeleteMovieUseCase } from 'src/application/use-cases/DeleteMovie/DeleteMovieUseCase';
import { UpdateMovieUseCase } from 'src/application/use-cases/UpdateMovie/UpdateMovieUseCase';
import { UpdateMovieDto } from 'src/application/use-cases/UpdateMovie/UpdateMovieDto';
import { Movie } from 'src/domain/entities/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}

  @Get()
  @ApiOkResponse({
    type: Movie,
    isArray: true,
    description: 'List of movies retrieved successfully.',
  })
  async getMovies(@Query() queryParams: GetAllMoviesDto) {
    return this.getAllMoviesUseCase.execute(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: Movie, description: 'Movie retrieved successfully.' })
  async getMovieById(@Param('id') id: string) {
    return this.getMovieByIdUseCase.execute(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: Movie,
    description: 'The movie has been successfully created.',
  })
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.createMovieUseCase.execute(createMovieDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Movie, description: 'Movie updated successfully.' })
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.updateMovieUseCase.execute(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Movie deleted successfully.' })
  async deleteMovie(@Param('id') id: string) {
    return this.deleteMovieUseCase.execute(id);
  }
}
