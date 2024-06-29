import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { fileUploadService } from 'src/fileUpload/fileUpload.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
    ]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, fileUploadService],
})
export class ProductsModule {}
