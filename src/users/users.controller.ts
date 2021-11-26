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
import { HandlerParams } from './validators/handler-params';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class UsersController {
  /**
   * class constructor
   * @param _userService
   */
  constructor(private readonly _userService: UsersService) {}

  @ApiOkResponse({
    description: 'Returns the person for the given "pseudo"',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "pseudo" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'pseudo',
    description: 'Unique pseudo of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':pseudo')
  findOne(@Param() params: HandlerParams): Observable<UserEntity | void> {
    return this._userService.findOnePseudo(params.pseudo);
  }
}
