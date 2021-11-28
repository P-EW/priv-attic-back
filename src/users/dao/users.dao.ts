import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersDao {
  /**
   * Class constructor
   */
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  /**
   * Returns one user of the list matching pseudo in parameter
   *
   * @param {string} pseudo of the user in the db
   *
   * @return {Observable<User | void>}
   */
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
   * Returns one user of the list matching id in parameter
   *
   * @param {string} id of the user in the db
   *
   * @return {Observable<User | void>}
   */
  findById = (id: string): Observable<User | void> =>
    from(this._userModel.findById(id)).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

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

  /**
   *  Delete a user in users list
   *  @param {string} pseudo
   *  @return {Observable<User | void>}
   */
  findByPseudoAndRemove(pseudo: string): Observable<User | void> {
    return from(
      this._userModel.findOneAndRemove({
        pseudo: { $regex: pseudo, $options: 'i' },
      }),
    ).pipe(
      filter((doc: UserDocument) => !!doc),
      map((doc: UserDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
  }

  findByPseudoAndUpdate(
    pseudo: string,
    user: UpdateUserDto,
  ): Observable<any | void> {
    return from(
      this._userModel.findOneAndUpdate(
        { pseudo: { $regex: pseudo, $options: 'i' } },
        user,
        {
          new: true,
          runValidators: true,
        },
      ),
    ).pipe(map((u) => (!!u ? u.toJSON() : undefined)));
  }
}
