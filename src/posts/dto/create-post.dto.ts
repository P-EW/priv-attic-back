import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    name: 'textContent',
    description: 'The text content of the post',
    example: 'Lorem ipsum dolor sit amet',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  textContent?: string;

  @ApiProperty({
    name: 'mediaContent',
    description: "The url of the post's media content",
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  mediaContent?: string;

  @ApiProperty({
    name: 'categories',
    description: "The post's categories",
    example: '["Dog", "Cat", "Meme"]',
  })
  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  categories?: string[];

  @ApiProperty({
    name: 'publisherId',
    description: 'Unique identifier of the publisher in the database',
    example: '61a14015645ee1c3b3b8c316',
  })
  @IsMongoId()
  @IsNotEmpty()
  publisherId: string;
}
