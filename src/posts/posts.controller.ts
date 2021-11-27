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
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { Observable } from 'rxjs';
import { HandlerParams } from './validators/handler-params';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
@ApiTags('posts')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class PostsController {
  /**
   * Class constructor
   * @param _postsService
   */
  constructor(private readonly _postsService: PostsService) {}

  /**
   * Handler to answer to GET /posts route
   *
   * @returns Observable<PostEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of posts',
    type: PostEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @Get()
  findAll(): Observable<PostEntity[] | void> {
    return this._postsService.findAll();
  }

  /**
   * Handler to answer to GET /posts/:id route
   *
   * @param {HandlerParams} params list of route params to take post id
   *
   * @returns Observable<PostEntity>
   */
  @ApiOkResponse({
    description: 'Returns the post for the given "id"',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    description: 'Post with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the post in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<PostEntity> {
    return this._postsService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /post route
   *
   * @param createPostDto data to create
   *
   * @returns Observable<PostEntity>
   */
  @ApiCreatedResponse({
    description: 'The post has been successfully created',
    type: PostEntity,
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new post',
    type: CreatePostDto,
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto): Observable<PostEntity> {
    return this._postsService.create(createPostDto);
  }
}
