import {
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
import { UpdatePostDto } from './dto/update-post.dto';

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
   * Returns every posts of the list matching pseudo in parameter
   *
   * @param {string} pseudo of the post
   *
   * @returns {Observable<PostEntity[]>}
   */
  findAllPostsFromPseudo = (pseudo: string): Observable<PostEntity[] | void> =>
    this._postsDao.findPostsByPseudo(pseudo).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Post[]) =>
        !!_
          ? of(_.map((__: Post) => new PostEntity(__)))
          : throwError(
              () =>
                new NotFoundException(`Post with pseudo '${pseudo}' not found`),
            ),
      ),
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
   * Returns every posts of the list matching categories in parameter
   *
   * @param {string[]} categs of the post
   *
   * @returns {Observable<PostEntity[]>}
   */
  findAllPostsFromCategs = (
    categs: string[],
  ): Observable<PostEntity[] | void> =>
    this._postsDao.findByCategs(categs).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Post[]) =>
        !!_
          ? of(_.map((__: Post) => new PostEntity(__)))
          : throwError(
              () =>
                new NotFoundException(`Post with categs '${categs}' not found`),
            ),
      ),
      defaultIfEmpty(undefined),
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
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Post) => new PostEntity(_)),
    );

  /**
   * Update a post in posts list
   *
   * @param {string} id of the post to update
   * @param post data to update
   *
   * @returns {Observable<PostEntity>}
   */
  update = (id: string, post: UpdatePostDto): Observable<PostEntity> =>
    this._postsDao.findByIdAndUpdate(id, post).pipe(
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

  /**
   * Deletes one post in posts list
   *
   * @param {string} id of the post to delete
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._postsDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Post) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Post with id '${id}' not found`),
            ),
      ),
    );

  deleteAllPostById(id: string): Observable<void> {
    return this._postsDao.findAllByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap(() => of(undefined)),
    );
  }
}
