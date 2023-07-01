import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private user: Model<User>) {}

  async createUser(data: any): Promise<User | undefined> {
    const pswHash = await bcrypt.hash(data.password, 12);
    const user = new this.user({
      name: data.name,
      email: data.email,
      password: pswHash,
    });
    return user.save();
  }
}
