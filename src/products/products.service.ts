import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './entities/products.entity';
import mongoose, { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private ProductsModel: Model<ProductsDocument>,
    private readonly authService: AuthService,
  ) {}

  async createProducts(req, createProductsDto, publicUrl) {
    try {
      const data = await this.ProductsModel.create({ ...createProductsDto });
      data.files = [...data.files, ...publicUrl];
      data.save();

      return {
        data: data,
        message: 'Product Created Successfully!',
        stausCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateProducts(req, id, updateProductsDto, publicUrl) {
    try {
      const product = await this.ProductsModel.findOne({ _id: id });

      if (!product) {
        throw new HttpException(
          `Product not found with this ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (publicUrl) {
        updateProductsDto.files = [...product.files, ...publicUrl];
      }

      const data = await this.ProductsModel.findOneAndUpdate(
        { _id: id },
        updateProductsDto,
        { new: true },
      );

      return {
        data: data,
        message: 'Product Updated Successfully!',
        stausCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllProducts(req, filterData) {
    try {
      const { size, color, name, page, limit, category, minPrice, maxPrice } =
        filterData;
      const filters: any = {};

      if (size) filters.size = new RegExp(size, 'i');
      if (color) filters.color = new RegExp(color, 'i');
      if (name) filters.name = new RegExp(name, 'i');
      if (minPrice && maxPrice)
        filters.price = { $gte: +minPrice, $lte: +maxPrice };
      console.log('filters::::::::::', filters);

      const defaultPage = 1;
      const defaultLimit = 10;
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const validatedPage =
        isNaN(pageNum) || pageNum < 1 ? defaultPage : pageNum;
      const validatedLimit =
        isNaN(limitNum) || limitNum < 1 ? defaultLimit : limitNum;

      const skip = (validatedPage - 1) * validatedLimit;

      const data = await this.ProductsModel.aggregate([
        {
          $match: filters,
        },
        {
          $addFields: {
            subtypeObjectId: { $toObjectId: '$subTypeId' },
          },
        },
        {
          $lookup: {
            from: 'subtypes',
            localField: 'subtypeObjectId',
            foreignField: '_id',
            as: 'subtypesData',
          },
        },
        {
          $unwind: '$subtypesData',
        },
        {
          $addFields: {
            subCategoryObjectId: { $toObjectId: '$subtypesData.subCategoryId' },
          },
        },
        {
          $lookup: {
            from: 'subcategories',
            localField: 'subCategoryObjectId',
            foreignField: '_id',
            as: 'subCategoryData',
          },
        },
        {
          $unwind: '$subCategoryData',
        },
        {
          $addFields: {
            categoryObjectId: { $toObjectId: '$subCategoryData.categoryId' },
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryObjectId',
            foreignField: '_id',
            as: 'categoryData',
          },
        },
        {
          $unwind: '$categoryData',
        },
        {
          $match: {
            ...(category && { 'categoryData.type': new RegExp(category, 'i') }),
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: validatedLimit,
        },
        {
          $project: {
            name: 1,
            rating: 1,
            price: 1,
            salePrice: 1,
            size: 1,
            color: 1,
            description: 1,
            files: 1,
            isFavourite: 1,
            subtypesData: {
              _id: 1,
              name: 1,
              subCategoryId: 1,
            },
            subCategoryData: {
              _id: 1,
              name: 1,
              categoryId: 1,
            },
            categoryData: {
              _id: 1,
              name: 1,
              type: 1,
            },
          },
        },
      ]);

      const total = await this.ProductsModel.countDocuments(filters);

      return {
        data: data,
        total: total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneProducts(req, id) {
    try {
      const newData = await this.ProductsModel.findOne({ _id: id });

      if (!newData) {
        throw new HttpException(
          `Product not found with this ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      //   const data = await this.ProductsModel.findById(id);
      const data = await this.ProductsModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $addFields: {
            subtypeObjectId: { $toObjectId: '$subTypeId' },
          },
        },
        {
          $lookup: {
            from: 'subtypes',
            localField: 'subtypeObjectId',
            foreignField: '_id',
            as: 'subtypesData',
          },
        },
        {
          $unwind: '$subtypesData',
        },
        {
          $addFields: {
            subCategoryObjectId: { $toObjectId: '$subtypesData.subCategoryId' },
          },
        },
        {
          $lookup: {
            from: 'subcategories',
            localField: 'subCategoryObjectId',
            foreignField: '_id',
            as: 'subCategoryData',
          },
        },
        {
          $unwind: '$subCategoryData',
        },
        {
          $addFields: {
            categoryObjectId: { $toObjectId: '$subCategoryData.categoryId' },
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryObjectId',
            foreignField: '_id',
            as: 'categoryData',
          },
        },
        {
          $unwind: '$categoryData',
        },
        {
          $project: {
            name: 1,
            rating: 1,
            price: 1,
            salePrice: 1,
            files: 1,
            isFavourite: 1,
            subtypesData: 1,
            subCategoryData: 1,
            categoryData: 1,
          },
        },
      ]);

      return {
        data: data,
        stausCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProducts(req, id) {
    try {
      const newData = await this.ProductsModel.findOne({ _id: id });

      if (!newData) {
        throw new HttpException(
          `Product not found with this ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.ProductsModel.findByIdAndDelete(id);

      return {
        data: data,
        message: 'Product Deleted Successfully!',
        stausCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
