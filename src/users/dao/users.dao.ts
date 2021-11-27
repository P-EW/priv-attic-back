import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CreateUserDto } from '../dto/create-user.dto';

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

  /**
   *  Check if user already exists with index and add it in users list
   * @param {CreateUserDto } user to create
   *
   * @return {Observable<User>}
   */
  save = (user: CreateUserDto): Observable<any> =>
    from(new this._userModel(user).save()).pipe(
      map((doc: UserDocument) => doc.toJSON()),
    );
}
