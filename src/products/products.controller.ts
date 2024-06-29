import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProducts } from './dto/createproducts.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { fileUploadService } from 'src/fileUpload/fileUpload.service';
import { UpdateProducts } from './dto/updateproducts.dto';
import { GetProducts } from './dto/getProducts.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadService: fileUploadService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: '/home/xrstudio/backend/ecommerce-images/',
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
  async createProducts(
    @Body() createProduct: CreateProducts,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let publicUrl;
    if (Array.isArray(files) && files.length > 0) {
      publicUrl = await this.uploadService.uploadImages(files);
    }
    return this.productsService.createProducts(createProduct, publicUrl);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: '/home/xrstudio/backend/ecommerce-images/',
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
  @Put('update')
  async updateProducts(
    @Query('id') id: string,
    @Body() updateProduct: UpdateProducts,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let publicUrl;
    if (Array.isArray(files) && files.length > 0) {
      publicUrl = await this.uploadService.uploadImages(files);
    }
    return this.productsService.updateProducts(id, updateProduct, publicUrl);
  }

  @Get('getAll')
  async getAllProducts(@Query() data: GetProducts) {
    return this.productsService.getAllProducts(data);
  }

  @Get('getOne')
  async getOneProducts(@Query('id') id: string) {
    return this.productsService.getOneProducts(id);
  }

  @Delete('delete')
  async deleteProducts(@Query('id') id: string) {
    return this.productsService.deleteProducts(id);
  }
}
