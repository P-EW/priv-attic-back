import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { LikesService } from './likes.service';
import { Observable } from 'rxjs';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './entities/like.entity';
import { HandlerPostId } from './validators/handler-postId';
import { handlerAuthorId } from './validators/handler-authorId';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { HandlerId } from './validators/handler-id';
import { handlerPost } from '../comments/validators/handler-post';

@Controller('likes')
@ApiTags('likes')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class LikesController {
  /**
   * Class contructor
   * @param _likesService
   */
  constructor(private readonly _likesService: LikesService) {}

  /**
   * Handler to answer to Like /likes route
   *
   * @param createLikeDto data to create
   *
   * @returns Observable<LikeEntity>
   */
  @ApiCreatedResponse({
    description: 'The like has been successfully created',
    type: LikeEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new like',
    type: CreateLikeDto,
  })
  @Post()
  //@UseGuards(JwtAuthGuard)
  create(@Body() createLikeDto: CreateLikeDto): Observable<LikeEntity> {
    return this._likesService.create(createLikeDto);
  }

  /**
   * Handler to answer to GET /like/from/post/:postId route
   *
   * @param {HandlerPostId} params list of route params to take like postId
   *
   * @returns Observable<LikeEntity[]>
   */
  @ApiOkResponse({
    description: 'Returns an array of likes',
    type: LikeEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @ApiNotFoundResponse({
    description: 'Like with the given "postId" doesn\'t exist in the database',
  })
  @ApiParam({
    name: 'postId',
    description: 'Unique identifier of the postId in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('from/post/:postId')
  findAllLikesByPost(
    @Param() params: HandlerPostId,
  ): Observable<LikeEntity[] | void> {
    return this._likesService.findAllLikebyPost(params.postId);
  }

  /**
   * Handler to answer to GET /like/from/authorId/:authorId route
   *
   * @param {HandlerPostId} params list of route params to take like authorId
   *
   * @returns Observable<LikeEntity[]>
   */
  @ApiOkResponse({
    description: 'Returns an array of comments',
    type: LikeEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @ApiNotFoundResponse({
    description:
      'Like with the given "authorId" doesn\'t exist in the database',
  })
  @ApiParam({
    name: 'authorId',
    description: 'Unique identifier of the postId in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('from/author/:authorId')
  findAllLikesByAuthor(
    @Param() params: handlerAuthorId,
  ): Observable<LikeEntity[] | void> {
    return this._likesService.findAllLikebyAuthor(params.authorId);
  }

  /**
   * Handler to answer to DELETE /likes/from/author/:authorId route
   *
   * @param {handlerAuthorId} params list of route params to take like authorId
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The Likes have been successfully deleted',
  })
  @ApiNotFoundResponse({
    description:
      'Likes with the given "authorId" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'authorId',
    description: 'Unique identifier of the post in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete('from/author/:authorId')
  deleteAllCommentByAuthorID(
    @Param() params: handlerAuthorId,
  ): Observable<void> {
    return this._likesService.deleteAllLikeByAuthorId(params.authorId);
  }

  /**
   * Handler to answer to DELETE /likes/from/postId/:postId route
   *
   * @param {handlerAuthorId} params list of route params to take like postId
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The Likes have been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Likes with the given "postId" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'postId',
    description: 'Unique identifier of the post in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete('from/postId/:postId')
  deleteAllCommentByPostId(@Param() params: HandlerPostId): Observable<void> {
    return this._likesService.deleteAllLikeByPostId(params.postId);
  }

  /**
   * Handler to answer to DELETE /likes/:id route
   *
   * @param {HandlerParams} params list of route params to take like id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The post has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Like with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the like in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  delete(@Param() params: HandlerId): Observable<void> {
    return this._likesService.delete(params.id);
  }

  /**
   * Handler to answer to GET /like/from/authorId/:authorId route
   *
   * @param {HandlerPostId} params list of route params to take like authorId
   *
   * @returns Observable<LikeEntity[]>
   */
  @ApiOkResponse({
    description: 'Returns the numbers of likes',
    type: LikeEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @ApiNotFoundResponse({
    description: 'Like with the given "postId" doesn\'t exist in the database',
  })
  @ApiParam({
    name: 'postId',
    description: 'Unique identifier of the postId in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('nbLike/:postId')
  nBLikesByPostId(@Param() params: handlerPost): Observable<number | void> {
    return this._likesService.nBLikesByPostId(params.postId);
  }
}
