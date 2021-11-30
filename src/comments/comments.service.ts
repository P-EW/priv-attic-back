import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommentsDao } from './dao/comments.dao';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { Comment } from './schemas/comment.schema';
@Injectable()
export class CommentsService {
  /**
   * Class constructor
   *
   * @param {CommentsDao} _commentsDao instance of the DAO
   */
  constructor(private readonly _commentsDao: CommentsDao) {}

  /**
   * Returns every posts of the list matching pseudo in parameter
   *
   * @param {string} postId of the post
   *
   * @returns {Observable<CommentEntity[]>}
   */
  findAllCommentbyPost = (postId: string): Observable<CommentEntity[] | void> =>
    this._commentsDao.findCommentsByPost(postId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Comment[]) =>
        !!_
          ? of(_.map((__: Comment) => new CommentEntity(__)))
          : throwError(() => new NotFoundException('post no found')),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if post already exists and add it in posts list
   *
   * @param comment to create
   *
   * @returns {Observable<PostEntity>}
   */
  create = (comment: CreateCommentDto): Observable<CommentEntity> =>
    this._addComment(comment).pipe(
      mergeMap((_: CreateCommentDto) => this._commentsDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Comment) => new CommentEntity(_)),
    );

  deleteAllCommentByAuthorId(id: string): Observable<void> {
    return this._commentsDao.findAllbyAuthorIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap(() => of(undefined)),
    );
  }
  deleteAllCommentByPostId(id: string): Observable<void> {
    return this._commentsDao.findAllbypostIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap(() => of(undefined)),
    );
  }
  private _addComment = (
    comment: CreateCommentDto,
  ): Observable<CreateCommentDto> =>
    of({
      ...comment,
      date: Date.now(),
    });
}
