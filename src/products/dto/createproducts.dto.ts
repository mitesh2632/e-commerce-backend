import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProducts {
  @ApiProperty()
  name: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  subTypeId: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional()
  salePrice: string;

  @ApiPropertyOptional({ format: 'binary' })
  files: Express.Multer.File[];

  @ApiPropertyOptional({ default: false })
  isFavourite: boolean;
}
