import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { diskStorage, FileFastifyInterceptor } from 'fastify-file-interceptor';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { Observable, throwError } from 'rxjs';
import { HandlerPseudo } from '../posts/validators/handler-pseudo';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UpdatePostDto } from '../posts/dto/update-post.dto';
import { PostsService } from '../posts/posts.service';
import { HandlerId } from '../users/validators/handler-id';
import { createReadStream } from 'fs';
import { join } from 'path';
import { HandlerFilename } from './validators/handler-filename';

@Controller('media')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class MediaDeliveryController {
  /**
   * class constructor
   * @param _userService
   * @param _postsService
   */
  constructor(
    private readonly _userService: UsersService,
    private readonly _postsService: PostsService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @Post('user/:pseudo')
  @UseInterceptors(
    FileFastifyInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = randomUUID();
          const ext = extname(file.originalname);

          cb(null, `${filename}${ext}`);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  uploadFileUser(
    @UploadedFile() file: Express.Multer.File,
    @Param() params: HandlerPseudo,
  ): Observable<any> {
    if (!file) {
      return throwError(
        () => new UnauthorizedException('Error, this is not an image'),
      );
    } else {
      const updatePersonDto: UpdateUserDto = new UpdateUserDto();
      updatePersonDto.image = file.filename;
      return this._userService.update(params.pseudo, updatePersonDto);
    }
  }

  @ApiConsumes('multipart/form-data')
  @Post('post/:id')
  @UseInterceptors(
    FileFastifyInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = randomUUID();
          const ext = extname(file.originalname);

          cb(null, `${filename}${ext}`);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  uploadFilePost(
    @UploadedFile() file: Express.Multer.File,
    @Param() params: HandlerId,
  ): Observable<any> {
    if (!file) {
      return throwError(
        () => new UnauthorizedException('Error, this is not an image'),
      );
    } else {
      const updatePostDto: UpdatePostDto = new UpdatePostDto();
      updatePostDto.mediaContent = file.filename;
      return this._postsService.update(params.id, updatePostDto);
    }
  }

  @Get(':filename')
  getFile(@Param() params: HandlerFilename): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), '/uploads/' + params.filename),
    );
    return new StreamableFile(file);
  }
}
