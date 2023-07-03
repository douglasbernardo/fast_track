import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/admin'),
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
