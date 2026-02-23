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
  ApiOperation,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { GetMovieByIdUseCase } from 'src/application/use-cases/GetMovieById/GetMovieByIdUseCase';
import { CreateMovieDto } from 'src/application/use-cases/CreateMovie/CreateMovieDto';
import { CreateMovieUseCase } from 'src/application/use-cases/CreateMovie/CreateMovieUseCase';
import { DeleteMovieUseCase } from 'src/application/use-cases/DeleteMovie/DeleteMovieUseCase';
import { UpdateMovieUseCase } from 'src/application/use-cases/UpdateMovie/UpdateMovieUseCase';
import { UpdateMovieDto } from 'src/application/use-cases/UpdateMovie/UpdateMovieDto';
import { SearchMoviesDto } from 'src/application/use-cases/SearchMovies/SearchMoviesDto';
import { SearchMoviesUseCase } from 'src/application/use-cases/SearchMovies/SearchMoviesUseCase';
import { MovieResponseDto } from '../dto/movie-response.dto';
import { GetMovieByIdDto } from 'src/application/use-cases/GetMovieById/GetMovieByIdDto';
import { RemoteAuthGuard } from '../guards/remote-auth.guard';

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
  @ApiOperation({
    summary: 'Get all movies',
    description:
      'Retrieves the complete list of movies available in the catalog.',
  })
  @ApiOkResponse({
    type: MovieResponseDto,
    isArray: true,
    description: 'List of movies retrieved successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request parameters.' })
  async getMovies() {
    const result = await this.getAllMoviesUseCase.execute();
    if (result.isFailure) {
      throw new BadRequestException(result.error);
    }
    return result.getValue();
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search movies',
    description:
      'Filters movies by title, category, or rating using query parameters.',
  })
  @ApiOkResponse({
    type: [MovieResponseDto],
    description: 'Filtered list of movies.',
  })
  @ApiBadRequestResponse({ description: 'Invalid search criteria provided.' })
  async search(@Query() query: SearchMoviesDto) {
    const result = await this.searchMoviesUseCase.execute(query);

    if (result.isFailure) {
      throw new BadRequestException(result.error);
    }

    return result.getValue();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get movie by ID',
    description:
      'Retrieves detailed information about a specific movie using its unique UUID.',
  })
  @ApiOkResponse({
    type: MovieResponseDto,
    description: 'Movie found and returned.',
  })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format.' })
  async getMovieById(@Param() params: GetMovieByIdDto) {
    const result = await this.getMovieByIdUseCase.execute(params.id);

    if (result.isFailure) {
      // Si le film n'existe pas, on renvoie une 404 (Not Found)
      throw new NotFoundException(result.error); // result.error contient le message d'erreur "Movie not found"
    }

    return result.getValue();
  }

  // Routes protegées par JWT
  @Post()
  // @UseGuards(RemoteAuthGuard) // Utilise le RemoteAuthGuard pour valider le token et vérifier le rôle admin
  // @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new movie',
    description: 'Adds a new movie to the catalog. Requires Admin privileges.',
  })
  @ApiCreatedResponse({
    type: MovieResponseDto,
    description: 'Movie created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed for the provided data.',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid authentication token.',
  })
  @ApiForbiddenResponse({ description: 'Access denied. Admin role required.' })
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    const result = await this.createMovieUseCase.execute(createMovieDto);

    if (result.isFailure) {
      throw new BadRequestException(result.error); // Gère les erreurs de validation
    }

    return result.getValue(); // NestJS renvoie automatiquement 201 Created pour un POST
  }

  @Patch(':id')
  // @UseGuards(RemoteAuthGuard) // Utilise le RemoteAuthGuard pour valider le token et vérifier le rôle admin
  // @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a movie',
    description:
      'Updates specific fields of an existing movie. Requires Admin privileges.',
  })
  @ApiOkResponse({
    type: MovieResponseDto,
    description: 'Movie updated successfully.',
  })
  @ApiNotFoundResponse({ description: 'No movie found with the provided ID.' })
  @ApiBadRequestResponse({ description: 'Invalid data or UUID format.' })
  @ApiUnauthorizedResponse({ description: 'Authentication required.' })
  @ApiForbiddenResponse({ description: 'Admin role required.' })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  // @UseGuards(RemoteAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a movie',
    description:
      'Removes a movie permanently from the database. Requires Admin privileges.',
  })
  @ApiNoContentResponse({ description: 'Movie deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiUnauthorizedResponse({ description: 'Authentication required.' })
  @ApiForbiddenResponse({ description: 'Admin role required.' })
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
  }
}
