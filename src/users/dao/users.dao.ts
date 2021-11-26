import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Injectable()
export class UsersDao {
  /**
   * Class constructor
   */
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  findByPseudo(pseudo: string): Observable<User | void> {
    return from(
      this._userModel.findOne({ pseudo: { $regex: pseudo, $options: 'i' } }),
    ).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  }
}
