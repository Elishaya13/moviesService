import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';
import { RemoteAuthGuard } from './presentation/guards/remote-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ApplicationModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [RemoteAuthGuard], // Ajoutez le RemoteAuthGuard ici pour qu'il soit disponible dans toute l'application
})
export class AppModule {}
