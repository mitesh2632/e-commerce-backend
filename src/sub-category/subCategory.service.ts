import { InjectModel } from '@nestjs/mongoose';
import {
  SubCategory,
  SubCategoryDocument,
} from './entities/subCategory.entity';
import mongoose, { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private SubCategoryModel: Model<SubCategoryDocument>,
  ) {}

  async createSubCategory(createSubCategory) {
    try {
      const { name, categoryId } = createSubCategory;
      const newName = await this.SubCategoryModel.findOne({ name });
      const newCategoryId = await this.SubCategoryModel.findOne({ categoryId });

      if (newCategoryId && newName) {
        throw new HttpException(
          'Sub category already Exist with this category and Name',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.SubCategoryModel.create({ ...createSubCategory });

      return {
        data: data,
        message: 'Sub category Created successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateSubCategory(id, updateSubCategory) {
    try {
      const data = await this.SubCategoryModel.findByIdAndUpdate(
        id,
        updateSubCategory,
        {
          new: true,
        },
      );

      if (!data) {
        throw new NotFoundException(`Category ${id} not found`);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Sub Category has been updated successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllSubCategory() {
    try {
      const data = await this.SubCategoryModel.find();

      return {
        data: data,
        message: 'Sub Category Getted Successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneSubCategory(id) {
    try {
      // Populate
      // const data =
      //   await this.SubCategoryModel.findById(id).populate('categoryId');

      // Aggregation
      const data = await this.SubCategoryModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $addFields: {
            categoryObjectId: { $toObjectId: '$categoryId' },
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
            categoryData: 1,
          },
        },
      ]);

      return {
        data: data,
        message: 'Sub Category Getted Successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSubCategory(id) {
    try {
      const data = await this.SubCategoryModel.findByIdAndDelete(id);

      return {
        data: data,
        message: 'Sub Category deleted Successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
