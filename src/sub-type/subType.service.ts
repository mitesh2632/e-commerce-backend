import { InjectModel } from '@nestjs/mongoose';
import { SubType, SubTypeDocument } from './entities/subType.entity';
import mongoose, { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class SubTypeService {
  constructor(
    @InjectModel(SubType.name) private SubTypeModel: Model<SubTypeDocument>,
  ) {}

  async createSubType(req, createSubTypeDto) {
    try {
      const { name, categoryId } = createSubTypeDto;
      const newName = await this.SubTypeModel.findOne({ name });
      const newCategoryId = await this.SubTypeModel.findOne({ categoryId });

      if (newCategoryId && newName) {
        throw new HttpException(
          'Sub category already Exist with this category and Name',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.SubTypeModel.create({ ...createSubTypeDto });

      return {
        data: data,
        message: 'Sub type Created successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateSubType(req, id, updateSubType) {
    try {
      const data = await this.SubTypeModel.findByIdAndUpdate(
        id,
        updateSubType,
        { new: true },
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

  async getOneSubType(req, id) {
    try {
      const newId = await this.SubTypeModel.findOne({ _id: id });

      if (!newId) {
        throw new HttpException(
          `Sub type not found with this ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Nested Populate
      // const data = await this.SubTypeModel.findById(id).populate({
      //   path: 'subCategoryId',
      //   // select: 'name categoryId',
      //   populate: { path: 'categoryId', select: 'name type' },
      // });

      // Aggregation
      const data = await this.SubTypeModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $addFields: {
            subCategoryObjectId: { $toObjectId: '$subCategoryId' },
          },
        },
        {
          $lookup: {
            from: 'subcategories',
            localField: 'subCategoryObjectId',
            foreignField: '_id',
            as: 'subcategoryData',
          },
        },
        {
          $unwind: '$subcategoryData',
        },
        {
          $addFields: {
            categoryObjectId: { $toObjectId: '$subcategoryData.categoryId' },
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
            subcategoryData: 1,
          },
        },
      ]);

      return {
        data: data,
        message: 'Sub type getted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllSubType(req) {
    try {
      const data = await this.SubTypeModel.find();

      return {
        data: data,
        message: 'Sub type getted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSubType(req, id) {
    try {
      const newId = await this.SubTypeModel.findOne({ _id: id });
      if (!newId) {
        throw new HttpException(
          `Sub type not found with this ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.SubTypeModel.findByIdAndDelete(id);

      return {
        data: data,
        message: 'Sub type deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
