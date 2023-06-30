import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { rastrearEncomendas } from 'correios-brasil/dist';

@Injectable()
export class TrackService {
  constructor(private readonly httpService: HttpService) {}

  async tracking(req) {
    const code = [`${req.body.orderCode}`];
    return rastrearEncomendas(code).then((response) => {
      return response;
    });
  }
}
