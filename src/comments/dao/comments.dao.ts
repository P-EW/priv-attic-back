import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Model } from 'mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentsDao {
  /**
   * Class constructor
   *
   * @param {Model<CommentDocument>} _commentModel instance of the model representing a Comment
   */
  constructor(
    @InjectModel(Comment.name)
    private readonly _commentModel: Model<CommentDocument>,
  ) {}

  /**
   * Call moogoose method, call toJson on each result and returns CommentModel[] or undefined
   *
   * @param {string} postId of the comment in the db
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
   * Call moogoose method, call toJson on each result and returns CommentModel[] or undefined
   *
   * @param {string} authorId of the comment in the db
   * @return {Observable<Comment[] | void>}
   */
  findCommentsByAuthor(authorId: string): Observable<Comment[] | void> {
    return from(this._commentModel.find({ authorId: authorId })).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
  }

  /**
   * Check if Comment already exists with index and add it in comments list
   *
   * @param {CreateCommentDto} comment to create
   *
   * @return {Observable<Comment>}
   */
  save(comment: CreateCommentDto): Observable<Comment> {
    return from(new this._commentModel(comment).save()).pipe(
      map((doc: CommentDocument) => doc.toJSON()),
    );
  }

  /**
   * Delete all comments of a authorId  in comments list
   *
   * @param {string} id
   *
   * @return {Observable<Comment | void>}
   */
  findAllbyAuthorIdAndRemove(id: string): Observable<Comment[] | void> {
    return from(this._commentModel.remove({ authorId: id })).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
  }

  /**
   * Delete all comments of a postId  in comments list
   *
   * @param {string} id
   *
   * @return {Observable<Comment | void>}
   */
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
