import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LikesDao } from './dao/likes.dao';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LikeEntity } from './entities/like.entity';
import { Like } from './schemas/like.schema';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  /**
   * Class constructor
   *
   * @param {LikesDao} _likesDao instance of the DAO
   */
  constructor(private readonly _likesDao: LikesDao) {}

  /**
   * Returns all likes of the list matching postId in parameter
   *
   * @param {string} postId of the likes
   *
   * @returns {Observable<LikeEntity[]>}
   */
  findAllLikebyPost = (postId: string): Observable<LikeEntity[] | void> =>
    this._likesDao.findLikeByPostId(postId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Like[]) =>
        !!_
          ? of(_.map((__: Like) => new LikeEntity(__)))
          : throwError(() => new NotFoundException('post no found')),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns all likes of the list matching authorId in parameter
   *
   * @param {string} authorId of the likes
   *
   * @returns {Observable<LikeEntity[]>}
   */
  findAllLikebyAuthor = (authorId: string): Observable<LikeEntity[] | void> =>
    this._likesDao.findLikeByAuthorId(authorId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Like[]) =>
        !!_
          ? of(_.map((__: Like) => new LikeEntity(__)))
          : throwError(() => new NotFoundException('post no found')),
      ),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if person already exists and add it in people list
   *
   * @param like to create
   *
   * @return {Observable<LikeEntity>}
   */

  create = (like: CreateLikeDto): Observable<LikeEntity> =>
    of(like).pipe(
      mergeMap((_: CreateLikeDto) => this._likesDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Like) => new LikeEntity(_)),
    );

  /**
   * Deletes likes in likes list
   *
   * @param {string} id of the author to delete
   *
   * @return {Observable<void>}
   */
  deleteAllLikeByAuthorId(id: string): Observable<void> {
    return this._likesDao.findAllbyAuthorIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap(() => of(undefined)),
    );
  }
  /**
   * Deletes likes in likes list
   *
   * @param {string} id of the post to delete
   *
   * @return {Observable<void>}
   */
  deleteAllLikeByPostId(id: string): Observable<void> {
    return this._likesDao.findAllbypostIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap(() => of(undefined)),
    );
  }

  /**
   * Deletes one like in likes list
   *
   * @param {string} id of the like to delete
   *
   * @return {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._likesDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Like) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Like with id '${id}' not found`),
            ),
      ),
    );

  deleteByPostAndAuthor = (
    postId: string,
    authorId: string,
  ): Observable<void> =>
    this._likesDao.findByPostAndAuthorIDAndRemove(postId, authorId).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Like) =>
        !!_
          ? of(undefined)
          : throwError(
              () =>
                new NotFoundException(
                  `Like with postId '${postId}' and authorId '${authorId} not found`,
                ),
            ),
      ),
    );

  /**
   * Get number of like in post
   * @param {string} idPost of post
   *
   * @return {Observable<number>}
   */
  nBLikesByPostId(idPost: string): Observable<number | void> {
    return this._likesDao.findNbLikesByPostId(idPost).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: number) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Like with id '${idPost}' not found`),
            ),
      ),
    );
  }
}
