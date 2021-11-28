import { IsNotEmpty } from 'class-validator';

export class HandlerCategories {
  @IsNotEmpty()
  categories: string[];
}
