import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  verifyNumbers(value) {
    const digits = value.match(/\d/g);
    return digits !== null && digits.length === 9;
  }

  async saveTrack(data): Promise<Track | undefined> {
    const user = await this.userService.findByEmail(data.user);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (data.trackCode < 13 || !this.verifyNumbers(data.trackCode)) {
      throw new UnauthorizedException('Código de rastreio inválido');
    }
    const codeTrack = new this.trackSchema({
      code: data.trackCode,
      description: data.description,
      createdBy: user._id,
    });

    return codeTrack.save();
  }
  async getTrackCode(data) {
    const user = await this.userService.findByEmail(data.user);
    return this.trackSchema.find({ createdBy: user._id }).exec();
  }

  async deleteCode(data) {
    const user = await this.userService.findByEmail(data.user);
    if (!user) throw new UnauthorizedException('Você não pode excluir');
    return await this.trackSchema.findByIdAndDelete(data.idCode);
  }
}
