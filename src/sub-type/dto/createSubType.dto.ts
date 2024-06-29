import { ApiProperty } from '@nestjs/swagger';

export class CreateSubType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  subCategoryId: string;
}
