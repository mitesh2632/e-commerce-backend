import { Controller, Delete, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('getCartProducts')
  async GetCartProducts(@Req() req) {
    return this.cartService.GetCartProducts(req);
  }

  @Post('addToCart')
  async addToCart(@Req() req, @Query('productId') id: string) {
    return this.cartService.addToCart(req, id);
  }

  @Delete('removeFromCart')
  async removeFromCart(@Req() req, @Query('id') id: string) {
    return this.cartService.removeFromCart(req, id);
  }
}
