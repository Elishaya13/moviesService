import { Module } from '@nestjs/common';
import { MovieController } from './controllers/MovieController';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [ApplicationModule], // On importe les Use Cases exportés par ApplicationModule
  controllers: [MovieController],
})
export class PresentationModule {}
