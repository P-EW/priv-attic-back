import { IsMongoId, IsNotEmpty } from 'class-validator';

export class handlerAuthor {
  @IsMongoId()
  @IsNotEmpty()
  authorId: string;
}
