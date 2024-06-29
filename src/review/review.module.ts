import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { AuthModule } from 'src/auth/auth.module';
import { fileUploadService } from 'src/fileUpload/fileUpload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    AuthModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, fileUploadService],
})
export class ReviewModule {}
