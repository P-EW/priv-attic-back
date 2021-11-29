import { IsMongoId, IsNotEmpty } from 'class-validator';

export class handlerAuthorId {
  @IsMongoId()
  @IsNotEmpty()
  authorId: string;
}
