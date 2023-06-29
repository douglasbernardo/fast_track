import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrackModule } from './track/track.module';

@Module({
  imports: [TrackModule],
  controllers: [AppController],
})
export class AppModule {}
