import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PostEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '61a14015645ee1c3b3b8c316',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'textContent',
    description: 'The text content of the post',
    example: 'Lorem ipsum dolor sit amet',
  })
  @Expose()
  @Type(() => String)
  textContent: string;

  @ApiProperty({
    name: 'mediaContent',
    description: "The url of the post's media content",
    example: 'Lorem ipsum dolor sit amet',
  })
  @Expose()
  @Type(() => String)
  mediaContent: string;

  @ApiProperty({
    name: 'date',
    description: 'Publication date in timestamp format',
    example: '101343600000',
  })
  @Expose()
  @Type(() => Number)
  date: number;

  @ApiProperty({
    name: 'categories',
    description: "The post's categories",
    example: 'Dog, Cat, Meme...',
  })
  @Expose()
  @Type(() => String)
  categories: string[];

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
