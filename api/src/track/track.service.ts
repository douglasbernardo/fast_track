import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { rastrearEncomendas } from 'correios-brasil/dist';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Track } from './schemas/track.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel('track')
    private trackSchema: Model<Track>,
    private userService: UserService,
  ) {}

  async tracking(req) {
    const code = [`${req.body.orderCode}`];
    return rastrearEncomendas(code).then((response) => {
      return response;
    });
  }

  async saveTrack(data): Promise<Track | undefined> {
    const user = await this.userService.findByEmail(data.user);
    if (!user) {
      throw new UnauthorizedException();
    }
    const codeTrack = new this.trackSchema({
      code: data.trackCode,
      description: data.description,
      createdBy: user._id,
    });

    return codeTrack.save();
  }
}
