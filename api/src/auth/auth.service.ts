import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user && bcrypt.hashSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }
}
