import { IsMongoId, IsNotEmpty } from 'class-validator';

export class authorParams {
  @IsMongoId()
  @IsNotEmpty()
  authorId: string;
}
