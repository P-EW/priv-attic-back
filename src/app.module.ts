import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
  ],
})
export class AppModule {}
