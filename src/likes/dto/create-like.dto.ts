import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
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
    description: 'Unique identifier of the authorId in the database',
    example: '61a14015645ee1c3b3b8c316',
  })
  @IsMongoId()
  @IsNotEmpty()
  authorId: string;
}
