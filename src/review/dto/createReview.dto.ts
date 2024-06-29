import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rating: string;

  @ApiPropertyOptional({ format: 'binary' })
  files: Express.Multer.File[];
}
