import { Request, Controller, Post, Res } from '@nestjs/common';
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

  @Post('/save')
  async saveCode(@Request() req) {
    return await this.trackService.saveTrack(req.body);
  }

  @Post('/meus-codigos')
  async getCodes(@Request() req) {
    return await this.trackService.getTrackCode(req.body);
  }

  @Post('/delete')
  async deleteTrackCode(@Request() req) {
    return this.trackService.deleteCode(req.body);
  }
}
