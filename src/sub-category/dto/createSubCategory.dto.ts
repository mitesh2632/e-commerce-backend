import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategory {
  @ApiProperty()
  name: string;

  @ApiProperty()
  categoryId: string;
}
