import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
