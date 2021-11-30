import { IsMongoId, IsNotEmpty } from 'class-validator';

export class handlerPost {
  @IsMongoId()
  @IsNotEmpty()
  postId: string;
}
