import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { FastifyReply } from 'fastify';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/cadastro')
  async create(@Body() data: UserDto, @Res() res: FastifyReply){
    console.log(data);
    const result = await this.userService.create(data);
    return res.send(result);
  }
}
