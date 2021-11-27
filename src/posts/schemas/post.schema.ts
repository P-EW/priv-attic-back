import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  versionKey: false,
})
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
  textContent?: string;

  @Prop({
    type: String,
    trim: true,
  })
  mediaContent?: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: number;

  @Prop({
    type: Array,
    trim: true,
  })
  categories?: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  publisherId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
