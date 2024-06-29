import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/createReview.dto';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { fileUploadService } from 'src/fileUpload/fileUpload.service';
@UseGuards(JwtAuthGuard)
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly uploadService: fileUploadService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: '/home/xrstudio/backend/ecommerce-images/review-images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @Post('create')
  async createReview(
    @Req() req,
    @Body() reviewDto: ReviewDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let publicUrl;
    if (Array.isArray(files) && files.length > 0) {
      publicUrl = await this.uploadService.uploadImages('product', files);
    }
    return this.reviewService.createReview(req, reviewDto, publicUrl);
  }

  @Get('getAll')
  async getAllReview(@Req() req) {
    return this.reviewService.getAllReview(req);
  }

  @Get('getOne')
  async getOneReview(@Req() req, @Query('id') id: string) {
    return this.reviewService.getOneReview(req, id);
  }

  @Delete('getOne')
  async deleteReview(@Req() req, @Query('id') id: string) {
    return this.reviewService.deleteReview(req, id);
  }
}
