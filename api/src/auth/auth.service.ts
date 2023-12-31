import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(req) {
    const user = await this.userService.findByEmail(req.email);
    if (!user) {
      throw new UnauthorizedException('E-mail não existe');
    }
    if (!bcrypt.compareSync(req.password, user.password)) {
      throw new UnauthorizedException('Senha inválida');
    }
    if (user && bcrypt.compareSync(req.password, user.password)) {
      const payload = { sub: user._id, username: user.email, name: user.name };
      return {
        access_token: await this.jwtService.signAsync(payload),
        payload,
      };
    } else {
      throw new UnauthorizedException('Algum erro aconteceu');
    }
  }
}
