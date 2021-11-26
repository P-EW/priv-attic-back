import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    trim: true,
  })
  textContent: string;

  @Prop({
    type: String,
    trim: true,
  })
  mediaContent: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: number;

  @Prop({
    set: (val: string[]) => val.join(' '),
    get: (val: string) => val.split(' '),
    type: String,
    trim: true,
  })
  categories: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  publisherId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
