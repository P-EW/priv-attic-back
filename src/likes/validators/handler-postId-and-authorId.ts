import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerPostIdAndAuthorId {
  @IsMongoId()
  @IsNotEmpty()
  postId: string;

  @IsMongoId()
  @IsNotEmpty()
  authorId: string;
}
