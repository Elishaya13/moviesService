import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ApplicationModule } from './application/application.module';
import { MovieController } from './presentation/controllers/MovieController';
// import { GetAllMoviesUseCase } from './application/use-cases/GetAllMovies/GetAllMoviesUseCase';
// import { GetMovieByIdUseCase } from './application/use-cases/GetMovieById/GetMovieByIdUseCase';
// import { CreateMovieUseCase } from './application/use-cases/CreateMovie/CreateMovieUseCase';
// import { DeleteMovieUseCase } from './application/use-cases/DeleteMovie/DeleteMovieUseCase';
// import { UpdateMovieUseCase } from './application/use-cases/UpdateMovie/UpdateMovieUseCase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ApplicationModule,
  ],
  controllers: [AppController, MovieController],
  providers: [
    AppService,
    // GetAllMoviesUseCase,
    // GetMovieByIdUseCase,
    // CreateMovieUseCase,
    // DeleteMovieUseCase,
    // UpdateMovieUseCase,
  ],
})
export class AppModule {}
