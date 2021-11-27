import { IsNotEmpty } from 'class-validator';

export class HandlerPseudo {
  @IsNotEmpty({
    message: 'pseudo must not be empty',
  })
  pseudo: string;
}
