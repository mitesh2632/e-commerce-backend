import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './entities/cart.entity';
import mongoose, { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private readonly authService: AuthService,
  ) {}

  async GetCartProducts(req) {
    try {
      const getUser = await this.authService.getUserIdFromToken(req);
      const userId = getUser._id.toString();
      //   const data = await this.cartModel.find({ userId });

      const data = await this.cartModel.aggregate([
        {
          $addFields: { productObjectId: { $toObjectId: '$productId' } },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productObjectId',
            foreignField: '_id',
            as: 'productData',
          },
        },
        {
          $unwind: '$productData',
        },
        {
          $project: {
            userId: 1,
            productData: 1,
          },
        },
      ]);

      return {
        data: data,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addToCart(req, productId) {
    try {
      const getUser = await this.authService.getUserIdFromToken(req);
      const userId = getUser._id.toString();

      const data = {
        productId,
        userId,
      };

      const submitData = await this.cartModel.create({ ...data });
      console.log('submitData', submitData);

      return {
        data: submitData,
        message: 'Product added to cart',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeFromCart(req, id) {
    try {
      const submitData = await this.cartModel.findByIdAndDelete(id);

      return {
        data: submitData,
        message: 'Product Removed from cart',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
