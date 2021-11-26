import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class UserMottoEntity {
  @ApiProperty({
    name: 'title',
    description: 'Title',
    example: 'A good day',
  })
  @Expose()
  title: string;

  @ApiPropertyOptional({
    name: 'content',
    description: 'Content',
    example: 'yesterday, I played video game',
  })
  @Expose()
  content: string;
}
