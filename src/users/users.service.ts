import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersDao } from './dao/users.dao';
import {
  catchError,
  defaultIfEmpty,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { User } from './schemas/user.schema';
import { filter, map } from 'rxjs/operators';

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
}
