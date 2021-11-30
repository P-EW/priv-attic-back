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
   * @param _likesDao
   */
  constructor(private readonly _likesDao: LikesDao) {}

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

  create = (like: CreateLikeDto): Observable<LikeEntity> =>
    of(like).pipe(
      mergeMap((_: CreateLikeDto) => this._likesDao.save(_)),
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Like) => new LikeEntity(_)),
    );

  deleteAllLikeByAuthorId(id: string): Observable<void> {
    return this._likesDao.findAllbyAuthorIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap(() => of(undefined)),
    );
  }
  deleteAllLikeByPostId(id: string): Observable<void> {
    return this._likesDao.findAllbypostIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap(() => of(undefined)),
    );
  }

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
}
