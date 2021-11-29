import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlePostId {
  @IsMongoId()
  @IsNotEmpty()
  postId: string;
}
