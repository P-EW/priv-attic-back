import {
  Body,
  ClassSerializerInterceptor,
  Controller,
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
import { LikesService } from './likes.service';
import { Observable } from 'rxjs';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './entities/like.entity';
import { HandlePostId } from './validators/handle-postId';
import { handlerAuthorId } from './validators/handler-authorId';

@Controller('likes')
@ApiTags('likes')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class LikesController {
  constructor(private readonly _likesService: LikesService) {}

  @ApiCreatedResponse({
    description: 'The post has been successfully created',
    type: LikeEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new post',
    type: CreateLikeDto,
  })
  @Post()
  //@UseGuards(JwtAuthGuard)
  create(@Body() createLikeDto: CreateLikeDto): Observable<LikeEntity> {
    return this._likesService.create(createLikeDto);
  }

  @ApiOkResponse({
    description: 'Returns an array of comments',
    type: LikeEntity,
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
  @Get('from/post/:postId')
  findAllLikesByPost(
    @Param() params: HandlePostId,
  ): Observable<LikeEntity[] | void> {
    return this._likesService.findAllLikebyPost(params.postId);
  }

  @ApiOkResponse({
    description: 'Returns an array of comments',
    type: LikeEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @ApiNotFoundResponse({
    description:
      'Comment with the given "postId" doesn\'t exist in the database',
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
}
