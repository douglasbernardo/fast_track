import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TrackModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
