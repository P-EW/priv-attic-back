import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({
    name: 'firstname',
    description: 'Firstname',
    example: 'Mclaughlin',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstname?: string;

  @ApiProperty({
    name: 'lastname',
    description: 'Lirstname',
    example: 'dupon',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastname?: string;

  @ApiProperty({
    name: 'pseudo',
    description: 'pseudo',
    example: 'ziak',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pseudo?: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'Mclaughlin.Cochran@undefined.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    name: 'birthDate',
    description: 'Birthdate in timestamp format',
    example: '101343600000',
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  birthDate?: number;

  @ApiPropertyOptional({
    name: 'image',
    description: 'Image URL',
    example: 'randomuser.me/portraits/men/55.jpg',
    pattern: '/^.(jpg|png|gif)$',
  })
  @IsString()
  @Matches('^.*\\.(jpg|png|gif)$')
  @IsOptional()
  image?: string;

  @ApiProperty({
    name: 'phone',
    description: 'Phone',
    example: '+33600000000',
    pattern: '/^(+d{11})$/',
  })
  @IsOptional()
  @IsPhoneNumber('FR')
  phone?: string;

  @ApiProperty({
    name: 'isPrivate',
    description: 'Flag to know if this user is a private account',
    example: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPrivate?: boolean;

  @ApiProperty({
    name: 'password',
    description: 'Mot de passe',
    example: 'Azerty1234',
  })
  @MinLength(8, {
    message: 'Password too low',
  })
  @IsString({
    message: 'Password must be a string',
  })
  @IsOptional()
  password?: string;

  @ApiProperty({
    name: 'motto',
    description: 'motto',
    example: 'I love coding',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  motto?: string;
}
