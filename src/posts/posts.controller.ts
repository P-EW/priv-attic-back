import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseInterceptors,
  UseGuards,
  Headers,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { UpdatePostDto } from './dto/update-post.dto';
import { HandlerPseudo } from './validators/handler-pseudo';
import { HandlerCategories } from './validators/handler-categories';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { HandlerPublisher } from './validators/handler-publisher';
import { Token } from '../auth/constants';
import jwtDecode from 'jwt-decode';

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
  @ApiNotFoundResponse({
    description: 'Post with the given "pseudo" doesn\'t exist in the database',
  })
  @ApiParam({
    name: 'pseudo',
    description: 'Unique identifier of the user in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('from/:pseudo')
  findAllPostsFromPseudo(
    @Param() params: HandlerPseudo,
    @Headers() token: any,
  ): Observable<PostEntity[] | void> {
    console.log(token);
    let res;
    if (
      token?.authorization === 'Bearer undefined' ||
      token?.authorization === undefined
    ) {
      res = null;
    } else {
      const userToken = jwtDecode(token.authorization) as Token;
      res = userToken.id;
    }

    return this._postsService.findAllPostsFromPseudo(params.pseudo, res);
  }

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
  findAll(@Headers() token: any): Observable<PostEntity[] | void> {
    let res;
    if (
      token?.authorization === 'Bearer undefined' ||
      token?.authorization === undefined
    ) {
      res = null;
    } else {
      const userToken = jwtDecode(token.authorization) as Token;
      res = userToken.id;
    }
    return this._postsService.findAllPostsFromPublicAndId(res);
  }

  /**
   * Handler to answer to GET /posts/:id route
   *
   * @param token
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
  findOne(
    @Headers() token: any,
    @Param() params: HandlerParams,
  ): Observable<PostEntity> {
    let res;
    if (
      token?.authorization === 'Bearer undefined' ||
      token?.authorization === undefined
    ) {
      res = null;
    } else {
      const userToken = jwtDecode(token.authorization) as Token;
      res = userToken.id;
    }
    return this._postsService.findOne(params.id, res);
  }

  /**
   * Handler to answer to GET /posts/cats/:categories route
   *
   * @returns Observable<PostEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of posts',
    type: PostEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No post exists in database' })
  @ApiNotFoundResponse({
    description: "Post with the given categs doesn't exist in the database",
  })
  @ApiParam({
    name: 'categories',
    description: "Array of string matching Post's categories in the database",
    type: Array,
    allowEmptyValue: false,
  })
  @Get('cats/:categories')
  findAllPostsFromCategs(
    @Headers() token: any,
    @Param() params: HandlerCategories,
  ): Observable<PostEntity[] | void> {
    let res;
    if (
      token?.authorization === 'Bearer undefined' ||
      token?.authorization === undefined
    ) {
      res = null;
    } else {
      const userToken = jwtDecode(token.authorization) as Token;
      res = userToken.id;
    }
    return this._postsService.findAllPostsFromCategs(params.categories, res);
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  create(@Body() createPostDto: CreatePostDto): Observable<PostEntity> {
    return this._postsService.create(createPostDto);
  }

  /**
   * Handler to answer to PUT /posts/:id route
   *
   * @param {HandlerParams} params list of route params to take post id
   * @param updatePostDto data to update
   *
   * @returns Observable<PostEntity>
   */
  @ApiOkResponse({
    description: 'The post has been successfully updated',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    description: 'Post with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The post already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the post in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a person', type: UpdatePostDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  update(
    @Param() params: HandlerParams,
    @Body() updatePostDto: UpdatePostDto,
  ): Observable<PostEntity> {
    return this._postsService.update(params.id, updatePostDto);
  }

  /**
   * Handler to answer to DELETE /posts/:id route
   *
   * @param {HandlerParams} params list of route params to take post id
   *
   * @returns Observable<void>
   */
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
    name: 'id',
    description: 'Unique identifier of the post in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._postsService.delete(params.id);
  }

  @ApiNoContentResponse({
    description: 'The posts has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'publisher with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'publisherId',
    description: 'Unique identifier of the publisher in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete('from/:publisherId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  deleteAllCommentByID(@Param() params: HandlerPublisher): Observable<void> {
    return this._postsService.deleteAllPostById(params.publisherId);
  }
}
