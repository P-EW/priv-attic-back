import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerPublisherIdAndNull {
  @IsMongoId()
  @IsNotEmpty()
  publisherId: string;
}
