import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/createReview.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async createReview(@Body() reviewDto: ReviewDto) {
    return this.reviewService.createReview(reviewDto);
  }
}
