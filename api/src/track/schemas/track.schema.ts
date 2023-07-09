import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Track extends Document {
  @Prop()
  code: string;
  @Prop()
  description: string;
  @Prop()
  createdBy: string;
}

export const trackSchema = SchemaFactory.createForClass(Track);
