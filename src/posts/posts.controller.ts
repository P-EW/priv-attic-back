import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { Observable } from 'rxjs';

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
}
