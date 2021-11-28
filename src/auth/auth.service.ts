import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
import { UserEntity } from '../users/entities/user.entity';
import { ConnectUserDto } from '../users/dto/connect-user.dto';
import * as bcrypt from 'bcrypt';
import { map } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants, Token } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private _userService: UsersService,
    private _jwtService: JwtService,
  ) {}

  validateUser(connectUser: ConnectUserDto): Observable<UserEntity | void> {
    return this._userService
      .findOnePseudo(connectUser.pseudo)
      .pipe(
        mergeMap((user) =>
          of(this.comparePassword(connectUser.password, user.password)).pipe(
            map((u) => (u ? user : undefined)),
          ),
        ),
      );
  }

  comparePassword(givenPass: string, userPass: string): Observable<boolean> {
    return bcrypt.compareSync(givenPass, userPass);
  }

  generateJWT(user: UserEntity): Observable<Token> {
    return of({
      access_token: this._jwtService.sign({ id: user.id }),
      expiry: new Date(jwtConstants.expireTimeNumber * 1000).getTime(),
      id: user.id,
    });
  }

  login(user: ConnectUserDto): Observable<Token | void> {
    return of(user).pipe(
      mergeMap(() => this.validateUser(user)),
      mergeMap((user) =>
        !!user
          ? this.generateJWT(user)
          : throwError(() => new UnauthorizedException()),
      ),
      catchError(() => throwError(() => new UnauthorizedException())),
    );
  }
}
