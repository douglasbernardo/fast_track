import { Request, Controller, Get, Post, Res } from '@nestjs/common';
import { TrackService } from './track.service';
import { FastifyReply } from 'fastify';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async track(@Request() req, @Res() res: FastifyReply) {
    const result = await this.trackService.tracking(req);
    return res.send(result);
  }
}
