import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class PostsDao {
  /**
   * Class constructor
   *
   * @param {Model<PostDocument>} _postModel instance of the model representing a Post
   */
  constructor(
    @InjectModel(Post.name)
    private readonly _postModel: Model<PostDocument>,
  ) {}

  /**
   * Returns every posts of the list matching poseudo in parameter
   *
   * @param {string} pseudo of the post in the db
   *
   * @param id
   * @return {Observable<Post[] | void>}
   */
  findPostsByPseudo(pseudo: string, id: string): Observable<Post[] | void> {
    return from(
      this._postModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'publisherId',
            foreignField: '_id',
            as: 'publisher',
          },
        },
        {
          $match: {
            $and: [
              { 'publisher.pseudo': pseudo },
              {
                $or: [
                  { 'publisher._id': new mongoose.Types.ObjectId(id) },
                  { 'publisher.isPrivate': false },
                ],
              },
            ],
          },
        },
        { $unset: 'publisher' },
      ]),
    ).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),
      map((docs: PostDocument[]) => docs.map((_: PostDocument) => _)),
      defaultIfEmpty(undefined),
    );
  }
  /*from(
      this._postModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'publisherId',
            foreignField: '_id',
            as: 'publisher',
          },
        },
        { $match: { 'publisher.pseudo': { $regex: pseudo, $options: 'i' } } },
        { $unset: 'publisher' },
      ]),
    ).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),
      map((docs: PostDocument[]) => docs.map((_: PostDocument) => _)),
      defaultIfEmpty(undefined),
    );

     */

  /**
   * Returns every posts of the list matching id in parameter and posts public
   *
   * @param id
   */
  findPostsPublicAndById(id: string): Observable<Post[] | void> {
    return from(
      this._postModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'publisherId',
            foreignField: '_id',
            as: 'publisher',
          },
        },
        {
          $match: {
            $or: [
              { 'publisher._id': new mongoose.Types.ObjectId(id) },
              { 'publisher.isPrivate': false },
            ],
          },
        },
        { $unset: 'publisher' },
      ]),
    ).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),

      map((docs: PostDocument[]) => docs.map((_: PostDocument) => _)),

      defaultIfEmpty(undefined),
    );
  }

  /**
   * Returns one post of the list matching id in parameter
   *
   * @param {string} id of the post in the db
   *
   * @param idToken
   * @return {Observable<Post | void>}
   */
  findById(id: string, idToken: string): Observable<Post | void> {
    console.log(id);
    console.log(idToken);
    return from(
      this._postModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'publisherId',
            foreignField: '_id',
            as: 'publisher',
          },
        },
        {
          $match: {
            $and: [
              { _id: new mongoose.Types.ObjectId(id) },
              {
                $or: [
                  { 'publisher._id': new mongoose.Types.ObjectId(idToken) },
                  { 'publisher.isPrivate': false },
                ],
              },
            ],
          },
        },
        { $unset: 'publisher' },
      ]),
    ).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),
      map((docs: PostDocument[]) => docs[0]),
      defaultIfEmpty(undefined),
    );
  }

  /**
   * Returns every posts of the list matching the categories in parameter
   *
   * @param {string[]} categs of the post in the db
   *
   * @param id
   * @return {Observable<Post[] | void>}
   */
  findByCategs = (categs: string[], id: string): Observable<Post[] | void> =>
    from(
      this._postModel.aggregate(
        [
          {
            $lookup: {
              from: 'users',
              localField: 'publisherId',
              foreignField: '_id',
              as: 'publisher',
            },
          },
          {
            $match: {
              $and: [
                {
                  $or: [
                    { 'publisher._id': new mongoose.Types.ObjectId(id) },
                    { 'publisher.isPrivate': false },
                  ],
                },
                { categories: { $all: categs.toString().split(',') } },
              ],
            },
          },
          { $unset: 'publisher' },
        ],
        { collation: { locale: 'en', strength: 2 } },
      ),
    ).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),
      map((docs: PostDocument[]) => docs.map((_: PostDocument) => _)),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if post already exists with index and add it in posts list
   *
   * @param {CreatePostDto} post to create
   *
   * @return {Observable<Post>}
   */
  save = (post: CreatePostDto): Observable<Post> =>
    from(new this._postModel(post).save()).pipe(
      map((doc: PostDocument) => doc.toJSON()),
    );

  /**
   * Update a post in posts list
   *
   * @param {string} id
   * @param {UpdatePostDto} post
   *
   * @return {Observable<Post | void>}
   */
  findByIdAndUpdate = (
    id: string,
    post: UpdatePostDto,
  ): Observable<Post | void> =>
    from(
      this._postModel.findByIdAndUpdate(id, post, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: PostDocument) => !!doc),
      map((doc: PostDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete a post in posts list
   *
   * @param {string} id
   *
   * @return {Observable<Post | void>}
   */
  findByIdAndRemove = (id: string): Observable<Post | void> =>
    from(this._postModel.findByIdAndRemove(id)).pipe(
      filter((doc: PostDocument) => !!doc),
      map((doc: PostDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete all Posts of a publisherId in posts list
   *
   * @param {string} id
   *
   * @returns {Observable<Post[] | void>}
   */
  findAllByIdAndRemove(id: string): Observable<Post[] | void> {
    return from(this._postModel.remove({ publisherId: id })).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),
      map((docs: PostDocument[]) => docs.map((_: PostDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );
  }
}
