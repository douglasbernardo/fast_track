import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly user: Model<User>,
  ) {}

  async createUser(data: any): Promise<User> {
    const user = new this.user({
      name: data.name,
      email: data.email,
      password: await bcrypt.hash(data.password, 12),
    });
    if (!user) {
      console.log('Hello work');
    }
    return user.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.user.findOne({ email: email });
  }
}
