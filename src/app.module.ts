import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [DatabaseModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
