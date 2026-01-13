import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { GetAllMoviesUseCase } from './use-cases/GetAllMovies/GetAllMoviesUseCase';

@Module({
  imports: [DatabaseModule], // Import the DatabaseModule to access repositories
  providers: [GetAllMoviesUseCase],
  exports: [GetAllMoviesUseCase],
})
export class ApplicationModule {}
