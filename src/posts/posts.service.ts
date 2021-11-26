import { Injectable } from '@nestjs/common';
import { PostsDao } from './dao/posts.dao';
import { defaultIfEmpty, Observable } from 'rxjs';
import { Post } from './schemas/post.schema';
import { PostEntity } from './entities/post.entity';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class PostsService {
  /**
   * Class constructor
   *
   * @param {PostsDao} _postsDao instance of the DAO
   */
  constructor(private readonly _postsDao: PostsDao) {}

  /**
   * Returns all existing posts in the list
   *
   * @returns {Observable<PostEntity[] | void>}
   */
  findAll = (): Observable<PostEntity[] | void> =>
    this._postsDao.find().pipe(
      filter((_: Post[]) => !!_),
      map((_: Post[]) => _.map((__: Post) => new PostEntity(__))),
      defaultIfEmpty(undefined),
    );
}
