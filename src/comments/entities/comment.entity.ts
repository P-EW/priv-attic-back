import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CommentEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  _id: string;

  @ApiProperty({
    name: 'postID',
    description: 'Unique identifier of the post in the database',
    example: '61a14015645ee1c3b3b8c316',
  })
  @Expose()
  @Type(() => String)
  postId: string;

  @ApiProperty({
    name: 'authorId',
    description: 'Unique identifier of the author in the database',
    example: '61a14015645ee1c3b3b8c316',
  })
  @Expose()
  @Type(() => String)
  authorId: string;

  @ApiProperty({
    name: 'content',
    description: 'The text content of the comments',
    example: 'Lorem ipsum dolor sit amet',
  })
  @Expose()
  @Type(() => String)
  content: string;

  @ApiProperty({
    name: 'date',
    description: 'Publication date in timestamp format',
    example: '101343600000',
  })
  @Expose()
  @Type(() => Number)
  date: number;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }
}
