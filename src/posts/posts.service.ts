import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PostsDao } from './dao/posts.dao';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { Post } from './schemas/post.schema';
import { PostEntity } from './entities/post.entity';
import { filter, map, mergeMap } from 'rxjs/operators';
import { CreatePostDto } from './dto/create-post.dto';

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

  /**
   * Returns one post of the list matching id in parameter
   *
   * @param {string} id of the post
   *
   * @returns {Observable<PostEntity>}
   */
  findOne = (id: string): Observable<PostEntity> =>
    this._postsDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Post) =>
        !!_
          ? of(new PostEntity(_))
          : throwError(
              () => new NotFoundException(`Post with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if post already exists and add it in posts list
   *
   * @param post to create
   *
   * @returns {Observable<PostEntity>}
   */
  create = (post: CreatePostDto): Observable<PostEntity> =>
    this._addPost(post).pipe(
      mergeMap((_: CreatePostDto) => this._postsDao.save(_)),
      map((_: Post) => new PostEntity(_)),
    );

  /**
   * Add post with good data in posts list
   *
   * @param post to add
   *
   * @returns {Observable<CreatePostDto>}
   *
   * @private
   */
  private _addPost = (post: CreatePostDto): Observable<CreatePostDto> =>
    of({
      ...post,
      date: Date.now(),
    });
}
