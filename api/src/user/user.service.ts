import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly user: Model<User>,
  ) {}

  async create(data: UserDto) {
    console.log(data);
    return data;
  }
}
