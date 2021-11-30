import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerId {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
