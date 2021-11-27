import { IsNotEmpty } from 'class-validator';

export class HandlerParams {
  @IsNotEmpty({
    message: 'pseudo must not be empty',
  })
  pseudo: string;
}
