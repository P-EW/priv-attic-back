import { Logger, Module } from '@nestjs/common';
import { MediaDeliveryController } from './media-delivery.controller';
import { UsersService } from '../users/users.service';
import { UsersDao } from '../users/dao/users.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { PostsDao } from '../posts/dao/posts.dao';
import { PostsService } from '../posts/posts.service';
import { Post, PostSchema } from '../posts/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [UsersService, Logger, UsersDao, PostsDao, PostsService],
  controllers: [MediaDeliveryController],
})
export class MediaDeliveryModule {}
