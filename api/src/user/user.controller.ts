import { Controller, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/cadastro')
  async create(@Request() req) {
    return this.userService.createUser(req.body);
  }
}
