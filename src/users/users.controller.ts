import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
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
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { UpdateUserDto } from './dto/update-user.dto';
import { HandlerId } from './validators/handler-id';

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
    description: 'Returns the user for the given "pseudo"',
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
    description: 'Unique pseudo of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':pseudo')
  findOne(@Param() params: HandlerParams): Observable<UserEntity | void> {
    return this._userService.findOnePseudo(params.pseudo);
  }

  /**
   * Handler to answer to GET /users/user/:id route
   *
   * @param {HandlerParams} params list of route params to take user id
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'Returns the user for the given "id"',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('user/:id')
  findOneById(@Param() params: HandlerId): Observable<UserEntity> {
    return this._userService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /users route
   *
   *
   * @returns Observable<UserEntity>
   * @param createUserDto
   */

  @ApiConflictResponse({
    description: 'the user exists already in bdd',
  })
  @ApiBadRequestResponse({
    description: 'The data sent is not correct',
  })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity | void> {
    return this._userService.create(createUserDto);
  }

  /**
   * Handler to answer to DELETE /users/:pseudo route
   *
   * @param {HandlerParams} params list of route params to take user pseudo
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The user has been successfully deleted',
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
    description: 'Unique identifier of the person in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':pseudo')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._userService.delete(params.pseudo);
  }

  /**
   * Handler to answer to PUT /users/:id route
   *
   * @param {HandlerParams} params list of route params to take person id
   * @param updatePersonDto data to update
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({
    description: 'The user has been successfully updated',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The user already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'pseudo',
    description: 'Unique pseudo of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a user', type: UpdateUserDto })
  @Patch(':pseudo')
  update(
    @Param() params: HandlerParams,
    @Body() updatePersonDto: UpdateUserDto,
  ): Observable<UserEntity> {
    return this._userService.update(params.pseudo, updatePersonDto);
  }
}
