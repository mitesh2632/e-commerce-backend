import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProducts {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ default: 0 })
  rating: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  subTypeId: string;

  @ApiPropertyOptional()
  stock: number;

  @ApiPropertyOptional()
  size: string;

  @ApiPropertyOptional()
  color: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  salePrice: string;

  @ApiPropertyOptional({ format: 'binary' })
  files: Express.Multer.File[];

  @ApiPropertyOptional({ default: false })
  isFavourite: boolean;
}
