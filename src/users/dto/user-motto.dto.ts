import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserMottoDto {
  @ApiProperty({
    name: 'title',
    description: 'Title',
    example: 'A good day',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    name: 'content',
    description: 'Content',
    example: 'yesterday, I played video game',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
