import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModal: Model<CategoryDocument>,
    private readonly authService: AuthService,
  ) {}

  async createCategory(req, name, type) {
    try {
      const user = await this.authService.getUserIdFromToken(req);
      const newName = await this.CategoryModal.findOne({ name });
      const newType = await this.CategoryModal.findOne({ type });

      if (newName && newType) {
        throw new HttpException(
          'Category Already Exist with this name and type',
          HttpStatus.BAD_REQUEST,
        );
      }

      const body = { name, type };

      await this.CategoryModal.create(body);

      return {
        data: body,
        message: 'Category Successfully Created',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateCategory(req, id, name, type) {
    try {
      const body = { name, type };

      const data = await this.CategoryModal.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!data) {
        throw new NotFoundException(`Category ${id} not found`);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Category has been updated successfully',
        data: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllCategory(req) {
    try {
      const user = await this.authService.getUserIdFromToken(req);
      console.log('user', user);

      const data = await this.CategoryModal.find();

      return {
        data: data,
        message: 'Data Getted Successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneCategory(req, id) {
    try {
      const data = await this.CategoryModal.findById(id);

      return {
        data: data,
        message: 'Data Getted Successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCategory(req, id) {
    try {
      await this.CategoryModal.findByIdAndDelete(id);

      return {
        message: 'Data Deleted Successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
