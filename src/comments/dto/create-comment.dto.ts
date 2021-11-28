import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    name: 'content',
    description: 'The content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    name: 'postId',
    description: 'Unique identifier of the post in the database',
    example: '61a14015645ee1c3b3b8c316',
  })
  @IsMongoId()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({
    name: 'authorId',
    description: 'Unique identifier of the author in the database',
    example: '61a14015645ee1c3b3b8c316',
  })
  @IsMongoId()
  @IsNotEmpty()
  authorId: string;
}
