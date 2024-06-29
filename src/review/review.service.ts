import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import mongoose, { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private readonly authService: AuthService,
  ) {}

  async createReview(req, reviewDto, publicUrl) {
    try {
      const getUser = await this.authService.getUserIdFromToken(req);
      const user = getUser._id.toString();

      const body = {
        ...reviewDto,
        user: user,
      };

      const data = await this.reviewModel.create({ ...body });
      data.files = [...data.files, ...publicUrl];
      data.save();

      return {
        data: data,
        message: 'Review added Successfully!',
        stausCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllReview(req) {
    try {
      const data = await this.reviewModel.aggregate([
        {
          $addFields: {
            userObjectId: { $toObjectId: '$user' },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userObjectId',
            foreignField: '_id',
            as: 'userData',
          },
        },
        {
          $unwind: '$userData',
        },
        {
          $addFields: {
            productIdObjectId: { $toObjectId: '$productId' },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productIdObjectId',
            foreignField: '_id',
            as: 'productData',
          },
        },
        {
          $unwind: '$productData',
        },
        {
          $project: {
            productId: 1,
            description: 1,
            rating: 1,
            files: 1,
            userData: {
              email: 1,
              name: 1,
            },
            productData: {
              name: 1,
              price: 1,
              rating: 1,
              salePrice: 1,
              size: 1,
              color: 1,
              isFavourite: 1,
            },
          },
        },
      ]);

      return {
        data: data,
        stausCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneReview(req, id) {
    try {
      const getId = await this.reviewModel.findOne({ _id: id });

      if (!getId) {
        throw new HttpException(
          `Review Not found with this ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.reviewModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $addFields: {
            userObjectId: { $toObjectId: '$user' },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userObjectId',
            foreignField: '_id',
            as: 'userData',
          },
        },
        {
          $unwind: '$userData',
        },
        {
          $addFields: {
            productIdObjectId: { $toObjectId: '$productId' },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productIdObjectId',
            foreignField: '_id',
            as: 'productData',
          },
        },
        {
          $unwind: '$productData',
        },
        {
          $project: {
            productId: 1,
            description: 1,
            rating: 1,
            files: 1,
            userData: {
              email: 1,
              name: 1,
            },
            productData: {
              name: 1,
              price: 1,
              rating: 1,
              salePrice: 1,
              size: 1,
              color: 1,
              isFavourite: 1,
            },
          },
        },
      ]);

      return {
        data: data,
        stausCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteReview(req, id) {
    try {
      const getId = await this.reviewModel.findOne({ _id: id });

      if (!getId) {
        throw new HttpException(
          `Review Not found with this ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.reviewModel.findByIdAndDelete(id);

      return {
        data: data,
        stausCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
