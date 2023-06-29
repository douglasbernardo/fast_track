import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { CodeDto } from './dto/code.dto';

@Injectable()
export class TrackService {
  constructor(private readonly httpService: HttpService) {}

  async tracking(code: CodeDto) {
    console.log(code);
    //const code = 'NB322454721BR';
    return this.httpService
      .get(
        `https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${code.orderCode}`,
        {
          headers: {
            Accept: 'application/json',
          },
          maxRedirects: 30,
        },
      )
      .pipe(map((response) => response.data));
  }
  async trackingTest() {
    //const code = 'NB322454721BR';
    return this.httpService
      .get(
        `https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=NB322454721BR`,
        {
          headers: {
            Accept: 'application/json',
          },
          maxRedirects: 30,
        },
      )
      .pipe(map((response) => response.data));
  }
}
