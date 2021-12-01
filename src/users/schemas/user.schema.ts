import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      // delete obsolete data
      delete ret._id;
    },
  },
  versionKey: false,
})
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: string;

  @Prop({
    type: String,
    trim: true,
  })
  image: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    collation: {
      strength: 2,
    },
  })
  pseudo: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  firstname: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  lastname: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: Date,
    required: true,
  })
  birthDate: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  isPrivate: boolean;

  @Prop({
    type: String,
    required: true,
    match: /^(\+\d{11})$/,
  })
  phone: string;

  @Prop({
    type: String,
  })
  motto: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

/**
 *
 */
export const UserSchema = SchemaFactory.createForClass(User);
