import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { authorParams } from './validators/author-params';

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
   * Handler to answer to POST /post route
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
  //@UseGuards(JwtAuthGuard)
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

  @ApiNoContentResponse({
    description: 'The post has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Post with the given "id" doesn\'t exist in the database',
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
  @Delete('from/:authorId')
  deleteAllCommentByID(@Param() params: authorParams): Observable<void> {
    return this._commentsService.deleteAllCommentById(params.authorId);
  }
}
