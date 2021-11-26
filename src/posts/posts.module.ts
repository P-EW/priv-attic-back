import { Logger, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from './schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsDao } from './dao/posts.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostsService, Logger, PostsDao],
  controllers: [PostsController],
})
export class PostsModule {}
