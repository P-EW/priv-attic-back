import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerPublisher {
  @IsMongoId()
  @IsNotEmpty({
    message: 'publisherId must not be empty',
  })
  publisherId: string;
}
