import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class TokenEntity {
  @ApiProperty({
    name: 'access_token',
    description: 'Le token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @Exclude()
  @Type(() => String)
  access_token: string;

  @ApiProperty({
    name: 'expiry',
    description: 'time before experation ',
    example: '1000000',
  })
  @Expose()
  @Type(() => String)
  @Expose()
  expiry: number;

  @ApiProperty({
    name: 'id',
    description: 'id of user',
    example: '61a14015645ee1c3b3b8c315',
  })
  @Type(() => String)
  id: string;
}
