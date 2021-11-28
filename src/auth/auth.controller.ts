import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { AuthService } from './auth.service';
import { TokenEntity } from '../users/entities/token.entity';
import { ConnectUserDto } from '../users/dto/connect-user.dto';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class AuthController {
  /**
   * class constructor
   * @param _authService
   */
  constructor(private readonly _authService: AuthService) {}

  /**
   *
   * @param user
   */

  @ApiCreatedResponse({
    description: 'connection succes',
    type: TokenEntity,
  })
  @ApiBadRequestResponse({ description: "this user don't exist" })
  @Post('login')
  login(@Body() user: ConnectUserDto): Observable<TokenEntity | void> {
    return this._authService.login(user);
  }
}
