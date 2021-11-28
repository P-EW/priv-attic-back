import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({
    name: 'firstname',
    description: 'Firstname',
    example: 'Mclaughlin',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    name: 'lastname',
    description: 'Lastname',
    example: 'Cochran',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'Mclaughlin.Cochran@undefined.com',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    name: 'birthDate',
    description: 'Birthdate in timestamp format',
    example: '101343600000',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  birthDate?: number;

  @ApiProperty({
    name: 'phone',
    description: 'Phone',
    example: '+33600000000',
    pattern: '/^(+d{11})$/',
  })
  @IsPhoneNumber('FR')
  phone: string;

  @ApiProperty({
    name: 'isPrivate',
    description: 'Flag to know if this user is a private account',
    example: false,
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  isPrivate?: boolean;

  @ApiProperty({
    name: 'password',
    description: 'Mot de passe',
    example: 'jZfdsfsea8',
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
  @IsOptional()
  password?: string;
}
