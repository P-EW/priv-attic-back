import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersDao } from './dao/users.dao';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { User } from './schemas/user.schema';
import { map } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly _usersDao: UsersDao) {}

  /**
   * Returns one user of the list matching pseudo in parameter
   * @param {string} pseudo of the user
   *
   * @returns {Observable<UserEntity>}
   */
  findOnePseudo(pseudo: string): Observable<UserEntity> {
    return this._usersDao.findByPseudo(pseudo).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((u: User) =>
        !!u
          ? of(new UserEntity(u))
          : throwError(
              () =>
                new NotFoundException(`User with pseudo '${pseudo}' not found`),
            ),
      ),
    );
  }

  /**
   * Check if person already exists and add it in user list
   *
   * @param user to create
   *
   * @returns {Observable<UserEntity>}
   */
  create = (user: CreateUserDto): Observable<UserEntity | void> =>
    this._addUser(user).pipe(
      map((user) => Object.assign(user, this.hashPassWord(user.password))),
      mergeMap((_: CreateUserDto) => this._usersDao.save(_)),
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `People with Pseudo '${user.pseudo}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: User) => new UserEntity(_)),
    );

  delete(pseudo: string): Observable<void> {
    return this._usersDao.findByPseudoAndRemove(pseudo).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((u: User) =>
        !!u
          ? of(undefined)
          : throwError(
              () =>
                new NotFoundException(`User with pseudo "${pseudo}" not found`),
            ),
      ),
    );
  }

  update(pseudo: string, user: UpdateUserDto): Observable<UserEntity> {
    return of(user).pipe(
      map((user) => Object.assign(user, this.hashPassWord(user.password))),
      mergeMap((user) =>
        this._usersDao.findByPseudoAndUpdate(pseudo, user).pipe(
          catchError((e) =>
            e.code === 11000
              ? throwError(() => new ConflictException())
              : throwError(() => new UnprocessableEntityException(e.message)),
          ),
          mergeMap((_: User) =>
            !!_
              ? of(new UserEntity(_))
              : throwError(
                  () =>
                    new NotFoundException(
                      `People with pseudo '${pseudo}' not found`,
                    ),
                ),
          ),
        ),
      ),
    );
  }

  private _addUser = (person: CreateUserDto): Observable<CreateUserDto> =>
    of({
      ...person,
      birthDate: this._parseDate('06/05/1985'),
    });

  hashPassWord(pth: string): any {
    return { password: bcrypt.hashSync(pth, 10) };
  }

  private _parseDate = (date: string): number => {
    const dates = date.split('/');
    return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
  };
}
