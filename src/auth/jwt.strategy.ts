import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConnectUserDto } from '../users/dto/connect-user.dto';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(connectUser: ConnectUserDto): Promise<any> {
    const user = await this._authService.validateUser(connectUser);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
