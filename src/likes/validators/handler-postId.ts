import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerPostId {
  @IsMongoId()
  @IsNotEmpty()
  postId: string;
}
