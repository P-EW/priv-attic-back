import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Model } from 'mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentsDao {
  constructor(
    @InjectModel(Comment.name)
    private readonly _commentModel: Model<CommentDocument>,
  ) {}

  /**
   * Call moogoose method, call toJson on each result and returns CommentModel[] or undefined
   *
   * @return {Observable<Comment[] | void>}
   */
  findCommentsByPost(postId: string): Observable<Comment[] | void> {
    return from(this._commentModel.find({ postId: postId })).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
  }

  /**
   *
   * @param comment
   */
  save(comment: CreateCommentDto): Observable<Comment> {
    return from(new this._commentModel(comment).save()).pipe(
      map((doc: CommentDocument) => doc.toJSON()),
    );
  }

  findAllbyAuthorIdAndRemove(id: string): Observable<Comment[] | void> {
    return from(this._commentModel.remove({ authorId: id })).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
  }

  findAllbypostIdAndRemove(id: string): Observable<Comment[] | void> {
    return from(this._commentModel.remove({ postId: id })).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
  }
}
