import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
   * Call mongoose method, call toJSON on each result and returns PostModel[] or undefined
   *
   * @return {Observable<Post[] | void>}
   */
  find = (): Observable<Post[] | void> =>
    from(this._postModel.find({})).pipe(
      filter((docs: PostDocument[]) => !!docs && docs.length > 0),
      map((docs: PostDocument[]) => docs.map((_: PostDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );
}
