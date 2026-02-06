import { Module } from '@nestjs/common';
import { MovieController } from './controllers/MovieController';
import { ApplicationModule } from '../application/application.module';
import { HttpModule } from '@nestjs/axios';
import { RemoteAuthGuard } from './guards/remote-auth.guard';

@Module({
  imports: [ApplicationModule, HttpModule], // Import HttpModule pour faire des requêtes HTTP dans RemoteAuthGuard
  controllers: [MovieController],
  providers: [RemoteAuthGuard], // Enregistre le RemoteAuthGuard comme provider pour pouvoir l'injecter dans les contrôleurs
})
export class PresentationModule {}
