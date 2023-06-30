import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { HttpModule } from '@nestjs/axios';
import { TrackService } from './track.service';

@Module({
  imports: [HttpModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
