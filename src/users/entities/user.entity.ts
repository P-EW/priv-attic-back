import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserMottoEntity } from './user-motto.entity';
import { IsOptional } from 'class-validator';
@Exclude()
export class UserEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiPropertyOptional({
    name: 'image',
    description: 'Image URL',
    example: 'randomuser.me/portraits/men/55.jpg',
    pattern: ' /([a-z\\-_0-9\\/\\:\\.]*\\.(jpg|jpeg|png|gif))/i',
  })
  @Expose()
  @Type(() => String)
  image: string;

  @ApiProperty({
    name: 'firstname',
    description: 'Firstname',
    example: 'Mclaughlin',
  })
  @Expose()
  @Type(() => String)
  firstname: string;
  @ApiProperty({
    name: 'pseudo',
    description: 'pseudo',
    example: 'ziak',
  })
  @Expose()
  @Type(() => String)
  pseudo: string;

  @ApiProperty({
    name: 'lastname',
    description: 'Lastname',
    example: 'Cochran',
  })
  @Expose()
  @Type(() => String)
  lastname: string;

  @ApiProperty({
    name: 'birthDate',
    description: 'Birthdate in timestamp format',
    example: '101343600000',
  })
  @Expose()
  @Type(() => Number)
  birthDate: number;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'firstName.LastName@undefined.com',
  })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiProperty({
    name: 'phone',
    description: 'Phone',
    example: '+33600000000',
    pattern: '/^(+d{11})$/',
  })
  @Expose()
  @Type(() => String)
  phone: string;

  @ApiProperty({
    name: 'isPrivate',
    description: 'Flag to know if this user is a private account',
    example: false,
  })
  @Expose()
  @Type(() => Boolean)
  isPrivate: boolean;

  @IsOptional()
  @ApiPropertyOptional({ name: 'motto', description: 'Motto' })
  @Expose()
  @Type(() => UserMottoEntity)
  motto?: UserMottoEntity;

  @Type(() => String)
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
