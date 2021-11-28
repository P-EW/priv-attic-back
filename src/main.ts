import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as Config from 'config';
import { AppConfig, SwaggerConfig } from './app.types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap(
  config: AppConfig,
  swaggerUsersConfig: SwaggerConfig,
  swaggerPostsConfig: SwaggerConfig,
  swaggerAuthConfig: SwaggerConfig,
) {
  // create NestJS application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // enable CORS for NG Application's calls
  await app.enableCors({ origin: config.cors });

  // use global pipe validation
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // create swaggy swaggers
  _initializeSwagger(swaggerUsersConfig, app, UsersModule);
  _initializeSwagger(swaggerPostsConfig, app, PostsModule);
  _initializeSwagger(swaggerAuthConfig, app, AuthModule);

  // launch server
  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at http://${config.host}:${config.port}`,
    'bootstrap',
  );
}

bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swaggerUsers'),
  Config.get<SwaggerConfig>('swaggerPosts'),
  Config.get<SwaggerConfig>('swaggerAuth'),

);

const _initializeSwagger = (
  swaggerConfig: SwaggerConfig,
  app: NestFastifyApplication,
  module: any,
) => {
  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  // create swagger document
  const document = SwaggerModule.createDocument(app, options, {
    include: [module],
  });

  // setup swagger module
  SwaggerModule.setup(
    swaggerConfig.path + '/' + swaggerConfig.tag,
    app,
    document,
  );
};
