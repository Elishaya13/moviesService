import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { GetAllMoviesUseCase } from './use-cases/GetAllMovies/GetAllMoviesUseCase';
import { UpdateMovieUseCase } from './use-cases/UpdateMovie/UpdateMovieUseCase';
import { DeleteMovieUseCase } from './use-cases/DeleteMovie/DeleteMovieUseCase';
import { CreateMovieUseCase } from './use-cases/CreateMovie/CreateMovieUseCase';
import { GetMovieByIdUseCase } from './use-cases/GetMovieById/GetMovieByIdUseCase';
import { SearchMoviesUseCase } from './use-cases/SearchMovies/SearchMoviesUseCase';

@Module({
  imports: [DatabaseModule], // Import the DatabaseModule to access repositories
  providers: [
    GetAllMoviesUseCase,
    GetMovieByIdUseCase,
    CreateMovieUseCase,
    DeleteMovieUseCase,
    UpdateMovieUseCase,
    SearchMoviesUseCase,
  ],
  exports: [
    GetAllMoviesUseCase,
    GetMovieByIdUseCase,
    CreateMovieUseCase,
    DeleteMovieUseCase,
    UpdateMovieUseCase,
    SearchMoviesUseCase,
  ],
})
export class ApplicationModule {}
