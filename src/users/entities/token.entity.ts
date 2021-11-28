import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class TokenEntity {
  @ApiProperty({ name: 'access_token', description: 'Le token' })
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
    name: 'pseudo',
    description: 'pseudo of user',
    example: 'ziak',
  })
  @Type(() => String)
  pseudo: string;
}
