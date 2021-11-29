import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LikeDocument = Like & Document;
@Schema({
  toJSON: {
    virtuals: true,
  },
  versionKey: false,
})
export class Like {
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
}
export const LikeSchema = SchemaFactory.createForClass(Like);
