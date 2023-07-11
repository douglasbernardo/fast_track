import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { trackSchema } from './schemas/track.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: 'track',
        schema: trackSchema,
      },
    ]),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
