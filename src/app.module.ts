import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import * as Config from 'config';
import { MediaDeliveryModule } from './media-delivery/media-delivery.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    AuthModule,
    CommentsModule,
    MediaDeliveryModule,
  ],
})
export class AppModule {}
