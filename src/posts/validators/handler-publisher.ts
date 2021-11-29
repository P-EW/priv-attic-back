import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerPublisher {
  @IsMongoId()
  @IsNotEmpty({
    message: 'pseudo must not be empty',
  })
  publisherId: string;
}
