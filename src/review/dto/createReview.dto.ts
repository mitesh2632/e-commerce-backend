import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  files: string;
}
