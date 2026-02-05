import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
  BadRequestException,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetAllMoviesUseCase } from '../../application/use-cases/GetAllMovies/GetAllMoviesUseCase';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { GetMovieByIdUseCase } from 'src/application/use-cases/GetMovieById/GetMovieByIdUseCase';
import { CreateMovieDto } from 'src/application/use-cases/CreateMovie/CreateMovieDto';
import { CreateMovieUseCase } from 'src/application/use-cases/CreateMovie/CreateMovieUseCase';
import { DeleteMovieUseCase } from 'src/application/use-cases/DeleteMovie/DeleteMovieUseCase';
import { UpdateMovieUseCase } from 'src/application/use-cases/UpdateMovie/UpdateMovieUseCase';
import { UpdateMovieDto } from 'src/application/use-cases/UpdateMovie/UpdateMovieDto';
import { Movie } from 'src/domain/entities/movie.entity';
import { JwtAuthGuard } from '../guards/auth.guard';
import { SearchMoviesDto } from 'src/application/use-cases/SearchMovies/SearchMoviesDto';
import { SearchMoviesUseCase } from 'src/application/use-cases/SearchMovies/SearchMoviesUseCase';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
    private readonly searchMoviesUseCase: SearchMoviesUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les films' })
  @ApiOkResponse({
    type: Movie,
    isArray: true,
    description: 'List of movies retrieved successfully.',
  })
  async getMovies() {
    const result = await this.getAllMoviesUseCase.execute();
    if (result.isFailure) {
      throw new BadRequestException(result.error);
    }
    return result.getValue();
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher des films' })
  @ApiOkResponse({
    type: Movie,
    isArray: true,
    description: 'Movies retrieved successfully based on search criteria.',
  })
  async search(@Query() query: SearchMoviesDto) {
    const result = await this.searchMoviesUseCase.execute(query);

    if (result.isFailure) {
      throw new BadRequestException(result.error);
    }

    return result.getValue();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un film par son ID' })
  @ApiOkResponse({ type: Movie, description: 'Movie retrieved successfully.' })
  async getMovieById(@Param('id') id: string) {
    const result = await this.getMovieByIdUseCase.execute(id);

    if (result.isFailure) {
      // Si le film n'existe pas, on renvoie une 404 (Not Found)
      throw new NotFoundException(result.error); // result.error contient le message d'erreur "Movie not found"
    }

    return result.getValue();
  }

  // Routes protegées par JWT
  @Post()
  @ApiOperation({ summary: 'Créer un nouveau film' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: Movie,
    description: 'The movie has been successfully created.',
  })
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    const result = await this.createMovieUseCase.execute(createMovieDto);

    if (result.isFailure) {
      throw new BadRequestException(result.error); // Gère les erreurs de validation
    }

    return result.getValue(); // NestJS renvoie automatiquement 201 Created pour un POST
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Mettre à jour un film' })
  @ApiOkResponse({ type: Movie, description: 'Movie updated successfully.' })
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const result = await this.updateMovieUseCase.execute(id, updateMovieDto);

    if (result.isFailure) {
      // Si le film n'existe pas pour être mis à jour, 404, sinon 400
      if (result.error === 'Film non trouvé')
        throw new NotFoundException(result.error);
      throw new BadRequestException(result.error);
    }

    return result.getValue();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Force le code 204
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Supprimer un film' })
  @ApiNoContentResponse({ description: 'Movie deleted successfully.' })
  async deleteMovie(@Param('id') id: string) {
    const result = await this.deleteMovieUseCase.execute(id);

    if (result.isFailure) {
      if (
        result.error === 'Movie not found' ||
        result.error === 'Film non trouvé'
      ) {
        throw new NotFoundException(result.error);
      }
      throw new BadRequestException(result.error);
    }
    // Pas besoin de return, NestJS enverra 204 grâce au @HttpCode
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
