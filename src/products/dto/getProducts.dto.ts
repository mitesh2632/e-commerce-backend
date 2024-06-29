import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProducts {
  @ApiPropertyOptional()
  brand: string;

  @ApiPropertyOptional()
  size: string;

  @ApiPropertyOptional()
  color: string;

  @ApiPropertyOptional()
  limit: number;

  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  category: string;

  @ApiPropertyOptional()
  minPrice: number;

  @ApiPropertyOptional()
  maxPrice: number;
}
