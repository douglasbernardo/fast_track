import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TrackService } from './track.service';
import { CodeDto } from './dto/code.dto';
import { FastifyReply } from 'fastify';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async trackOrder() {
    return this.trackService.trackingTest();
  }

  @Post()
  async track(@Body() code: CodeDto, @Res() res: FastifyReply) {
    const result = await this.trackService.tracking(code);
    return res.send(result);
  }
}
