import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class UpdatePostDto {
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
}
