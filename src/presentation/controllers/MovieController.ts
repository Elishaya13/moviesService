import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Res,
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
import type { Response } from 'express';

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
  async getMovies(@Query() queryParams: GetAllMoviesDto, @Res() res: Response) {
    const result = await this.getAllMoviesUseCase.execute(queryParams);
    return res.status(200).json(result.getValue());
  }

  @Get(':id')
  @ApiOkResponse({ type: Movie, description: 'Movie retrieved successfully.' })
  async getMovieById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.getMovieByIdUseCase.execute(id);

    if (result.isFailure) {
      // Si le film n'existe pas, on renvoie une 404 (Not Found)
      return res.status(404).json({ message: result.error });
    }

    return res.status(200).json(result.getValue());
  }

  @Post()
  @ApiCreatedResponse({
    type: Movie,
    description: 'The movie has been successfully created.',
  })
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @Res() res: Response,
  ) {
    const result = await this.createMovieUseCase.execute(createMovieDto);

    if (result.isFailure) {
      return res.status(400).json({ message: result.error });
    }

    const movie = result.getValue();
    return res.status(201).json(movie); // On renvoie le film créé
  }

  @Patch(':id')
  @ApiOkResponse({ type: Movie, description: 'Movie updated successfully.' })
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Res() res: Response,
  ) {
    const result = await this.updateMovieUseCase.execute(id, updateMovieDto);
    if (result.isFailure) {
      return res.status(400).json({ message: result.error });
    }

    const movie = result.getValue();
    return res.status(200).json(movie);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Movie deleted successfully.' })
  async deleteMovie(@Param('id') id: string, @Res() res: Response) {
    const result = await this.deleteMovieUseCase.execute(id);
    if (result.isFailure) {
      return res.status(400).json({ message: result.error });
    }
    return res.status(204).send(); // No Content
  }

  // @Get()
  // @ApiOkResponse({
  //   type: Movie,
  //   isArray: true,
  //   description: 'List of movies retrieved successfully.',
  // })
  // async getMovies(@Query() queryParams: GetAllMoviesDto) {
  //   return this.getAllMoviesUseCase.execute(queryParams);
  // }
  // @Get(':id')
  // @ApiOkResponse({ type: Movie, description: 'Movie retrieved successfully.' })
  // async getMovieById(@Param('id') id: string) {
  //   return this.getMovieByIdUseCase.execute(id);
  // }
  // @Post()
  // @ApiCreatedResponse({
  //   type: Movie,
  //   description: 'The movie has been successfully created.',
  // })
  // async createMovie(@Body() createMovieDto: CreateMovieDto) {
  //   return this.createMovieUseCase.execute(createMovieDto);
  // }
  // }

  // @Patch(':id')
  // @ApiOkResponse({ type: Movie, description: 'Movie updated successfully.' })
  // async updateMovie(
  //   @Param('id') id: string,
  //   @Body() updateMovieDto: UpdateMovieDto,
  // ) {
  //   return this.updateMovieUseCase.execute(id, updateMovieDto);
  // }

  // @Delete(':id')
  // @ApiNoContentResponse({ description: 'Movie deleted successfully.' })
  // async deleteMovie(@Param('id') id: string) {
  //   return this.deleteMovieUseCase.execute(id);
  // }
}
