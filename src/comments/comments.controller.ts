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
import { Observable } from 'rxjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entities/comment.entity';
import { HandlerParams } from './validators/handler-params';
import { handlerAuthor } from './validators/handler-author';
import { handlerPost } from './validators/handler-post';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { HandlerId } from '../users/validators/handler-id';

@Controller('comments')
@ApiTags('comments')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class CommentsController {
  /**
   * Class constructor
   * @param _commentsService
   */
  constructor(private readonly _commentsService: CommentsService) {}

  /**
   * Handler to answer to POST /comment route
   *
   * @param createCommentDto data to create
   *
   * @returns Observable<CommentEntity>
   */
  @ApiCreatedResponse({
    description: 'The post has been successfully created',
    type: CommentEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new post',
    type: CreateCommentDto,
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
  ): Observable<CommentEntity> {
    return this._commentsService.create(createCommentDto);
  }

  /**
   * Handler to answer to GET /comments route
   *
   * @returns Observable<PostEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of comments',
    type: CommentEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @ApiNotFoundResponse({
    description:
      'Comment with the given "postId" doesn\'t exist in the database',
  })
  @ApiParam({
    name: 'postId',
    description: 'Unique identifier of the postId in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('from/:postId')
  findAllCommentByPost(
    @Param() params: HandlerParams,
  ): Observable<CommentEntity[] | void> {
    return this._commentsService.findAllCommentbyPost(params.postId);
  }

  /**
   * Handler to answer to GET /comments route
   *
   * @returns Observable<PostEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of comments',
    type: CommentEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @ApiNotFoundResponse({
    description:
      'Comment with the given "authorId" doesn\'t exist in the database',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the authorId in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('author/:id')
  findAllCommentByAuthor(
    @Param() params: HandlerId,
  ): Observable<CommentEntity[] | void> {
    return this._commentsService.findAllCommentbyAuthor(params.id);
  }

  @ApiNoContentResponse({
    description: 'The comments has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'authorId with the given "id" doesn\'t exist in the database',
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
  deleteAllCommentByAuthorID(@Param() params: handlerAuthor): Observable<void> {
    return this._commentsService.deleteAllCommentByAuthorId(params.authorId);
  }

  @ApiNoContentResponse({
    description: 'The comments has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'authorId with the given "id" doesn\'t exist in the database',
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
  deleteAllCommentByPostId(@Param() params: handlerPost): Observable<void> {
    return this._commentsService.deleteAllCommentByPostId(params.postId);
  }
}
