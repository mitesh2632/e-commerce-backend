import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '../enums/category-type.enum';

export class CreateCategory {
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: CategoryType, enumName: 'CategoryType' })
  type: CategoryType;
}
