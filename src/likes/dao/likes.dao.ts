import { Injectable } from '@nestjs/common';
import { Like, LikeDocument } from '../schemas/like.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLikeDto } from '../dto/create-like.dto';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  Comment,
  CommentDocument,
} from '../../comments/schemas/comment.schema';

@Injectable()
export class LikesDao {
  constructor(
    @InjectModel(Like.name)
    private readonly _likeModel: Model<LikeDocument>,
  ) {}

  findLikeByAuthorId(authorId: string): Observable<Like[] | void> {
    return from(this._likeModel.find({ authorId: authorId })).pipe(
      filter((docs: LikeDocument[]) => !!docs && docs.length > 0),
      map((docs: LikeDocument[]) => docs.map((_: LikeDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );
  }
  findLikeByPostId(postId: string): Observable<Like[] | void> {
    return from(this._likeModel.find({ postId: postId })).pipe(
      filter((docs: LikeDocument[]) => !!docs && docs.length > 0),
      map((docs: LikeDocument[]) => docs.map((_: LikeDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );
  }

  save(like: CreateLikeDto): Observable<Like> {
    return from(new this._likeModel(like).save()).pipe(
      map((doc: LikeDocument) => doc.toJSON()),
    );
  }

  findAllbyAuthorIdAndRemove(id: string): Observable<Comment[] | void> {
    return from(this._likeModel.remove({ authorId: id })).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
  }

  findAllbypostIdAndRemove(id: string): Observable<Comment[] | void> {
    return from(this._likeModel.remove({ postId: id })).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
  }

  findByIdAndRemove = (id: string): Observable<Like | void> =>
    from(this._likeModel.findByIdAndRemove(id)).pipe(
      filter((doc: LikeDocument) => !!doc),
      map((doc: LikeDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
