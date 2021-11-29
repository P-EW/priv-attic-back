import { IsNotEmpty } from 'class-validator';

export class HandlerFilename {
  @IsNotEmpty({
    message: 'filename must not be empty',
  })
  filename: string;
}
