import { Injectable } from '@nestjs/common';
import { Like, LikeDocument } from '../schemas/like.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLikeDto } from '../dto/create-like.dto';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class LikesDao {
  /**
   * Class constructor
   *
   * @param {Model<LikeDocument>} _likeModel instance of the model representing a Like
   */
  constructor(
    @InjectModel(Like.name)
    private readonly _likeModel: Model<LikeDocument>,
  ) {}

  /**
   * Returns a list of Like of the list matching pseudo in parameter
   *
   * @param {string} pseudo of the like in db
   *
   * @return {Observable<Like[] | void>}
   */
  findLikeByAuthor(pseudo: string): Observable<Like[] | void> {
    return from(
      this._likeModel.aggregate([
        {
          $lookup: {
            from: 'posts',
            localField: 'postId',
            foreignField: '_id',
            as: 'post',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'post.publisherId',
            foreignField: '_id',
            as: 'publisher',
          },
        },
        { $match: { 'publisher.pseudo': { $regex: pseudo, $options: 'i' } } },
        { $unset: ['publisher', 'post'] },
      ]),
    );
  }

  /**
   * Returns a list of Like of the list matching authorId in parameter
   *
   * @param {string} authorId of the like in db
   *
   * @returns {Observable<Like[] | void>}
   */
  findLikedByAuthorId(authorId: string): Observable<Like[] | void> {
    return from(this._likeModel.find({ authorId: authorId })).pipe(
      filter((docs: LikeDocument[]) => !!docs && docs.length > 0),
      map((docs: LikeDocument[]) => docs.map((_: LikeDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );
  }

  /**
   * Returns a list of Like of the list matching postId in parameter
   *
   * @param {string} postId of the like in db
   *
   * @returns {Observable<Like[] | void>}
   */
  findLikeByPostId(postId: string): Observable<Like[] | void> {
    return from(this._likeModel.find({ postId: postId })).pipe(
      filter((docs: LikeDocument[]) => !!docs && docs.length > 0),
      map((docs: LikeDocument[]) => docs.map((_: LikeDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );
  }

  /**
   * Check if like already exists with index and add it in likes list
   *
   * @param {CreateLikeDto} like to create
   *
   * @return {Observable<Like>}
   */
  save(like: CreateLikeDto): Observable<Like> {
    return from(new this._likeModel(like).save()).pipe(
      map((doc: LikeDocument) => doc.toJSON()),
    );
  }

  /**
   * Delete all likes of a authorId  in likes list
   *
   * @param {string} id of author
   *
   * @return {Observable<Like | void>}
   */
  findAllbyAuthorIdAndRemove(id: string): Observable<Like[] | void> {
    return from(this._likeModel.remove({ authorId: id })).pipe(
      filter((docs: LikeDocument[]) => !!docs && docs.length > 0),
      map((docs: LikeDocument[]) => docs.map((_: LikeDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );
  }
  /**
   * Delete all likes of a postId  in likes list
   *
   * @param {string} id of post
   *
   * @return {Observable<Like | void>}
   */
  findAllbypostIdAndRemove(id: string): Observable<Like[] | void> {
    return from(this._likeModel.remove({ postId: id })).pipe(
      filter((docs: LikeDocument[]) => !!docs && docs.length > 0),
      map((docs: LikeDocument[]) => docs.map((_: LikeDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );
  }

  /**
   * Delete a like in likes list
   *
   * @param {string} id of like
   *
   * @return {Observable<Like | void>}
   */
  findByIdAndRemove = (id: string): Observable<Like | void> =>
    from(this._likeModel.findByIdAndRemove(id)).pipe(
      filter((doc: LikeDocument) => !!doc),
      map((doc: LikeDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * get like of a author and post
   * @param postId of post
   * @param authorId of author
   */
  findByPostAndAuthorIDAndRemove = (
    postId: string,
    authorId: string,
  ): Observable<Like | void> =>
    from(
      this._likeModel.findOneAndRemove({
        postId: postId,
        authorId: authorId,
      }),
    ).pipe(
      filter((doc: LikeDocument) => !!doc),
      map((doc: LikeDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns true if the post is liked by a user
   * @param postId of post
   * @param authorId of user
   */
  findByPostAndAuthor = (
    postId: string,
    authorId: string,
  ): Observable<boolean | void> =>
    from(
      this._likeModel.findOne({
        postId: postId,
        authorId: authorId,
      }),
    ).pipe(
      filter((doc: LikeDocument) => !!doc),
      map((doc: LikeDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Get the number of like of a given post
   *
   * @param idPost of post
   */
  findNbLikesByPostId = (idPost: string): Observable<number | void> =>
    from(this._likeModel.countDocuments({ postId: idPost })).pipe(
      filter((doc: LikeDocument) => !!doc),
      defaultIfEmpty(undefined),
    );
}
