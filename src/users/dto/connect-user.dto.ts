import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ConnectUserDto {
  @ApiProperty({
    name: 'pseudo',
    description: 'pseudo',
    example: 'ziak',
  })
  @IsString({
    message: 'pseudo must be a string',
  })
  @IsNotEmpty({
    message: 'pseudo must not be empty',
  })
  pseudo: string;

  @ApiProperty({
    name: 'password',
    description: 'Mot de passe',
    example: 'jZadqzdqz8',
  })
  @MinLength(8, {
    message: 'Password too low',
  })
  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({
    message: 'Password must not be empty',
  })
  password: string;
}
