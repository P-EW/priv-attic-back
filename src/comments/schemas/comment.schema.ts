import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type CommentDocument = Comment & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  versionKey: false,
})
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  postId: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  authorId: any;

  @Prop({
    type: String,
    trim: true,
  })
  content: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
