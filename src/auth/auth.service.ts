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
  /**
   * Class constructor
   * @param _userService instance of the UserService
   * @param _jwtService instance of the JwtService
   */
  constructor(
    private _userService: UsersService,
    private _jwtService: JwtService,
  ) {}

  /**
   * Returns one User
   * @param {ConnectUserDto} connectUser to validate user
   *
   * @returns {Observable<UserEntity>}
   */
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

  /**
   * Check if user password and password given are similar
   * @param {string} givenPass
   * @param {string} userPass
   *
   * @returns {Observable<boolean>}
   */
  comparePassword(givenPass: string, userPass: string): Observable<boolean> {
    return bcrypt.compareSync(givenPass, userPass);
  }

  /**
   * Create a new token for this user
   *
   * @param {UserEntity} user
   *
   * @returns {Observable<Token>}
   */
  generateJWT(user: UserEntity): Observable<Token> {
    return of({
      access_token: this._jwtService.sign({ id: user.id }),
      expiry: new Date(jwtConstants.expireTimeNumber * 1000).getTime(),
      id: user.id,
    });
  }

  /**
   * Check if user exists and create token
   *
   * @param {ConnectUserDto} user to login
   *
   * @returns {Observable< Token | void>}
   */
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
