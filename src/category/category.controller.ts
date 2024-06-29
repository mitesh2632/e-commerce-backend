import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategory } from './dto/createCategory.dto';
import { CategoryType } from './enums/category-type.enum';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';

@ApiTags('Category')
@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryControler {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @ApiQuery({ name: 'type', enum: CategoryType })
  async createCategory(
    @Req() req,
    @Query('name') name: string,
    @Query('type') type: CategoryType = CategoryType.Women,
  ) {
    return this.categoryService.createCategory(req, name, type);
  }

  @Put('update')
  @ApiQuery({ name: 'type', enum: CategoryType })
  async updateCategory(
    @Req() req,
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('type') type: CategoryType = CategoryType.Women,
  ) {
    return this.categoryService.updateCategory(req, id, name, type);
  }

  @Get('getAll')
  async getAllCategory(@Req() req) {
    return this.categoryService.getAllCategory(req);
  }

  @Get('getOne')
  async getOneCategory(@Req() req, @Query('id') id: string) {
    return this.categoryService.getOneCategory(req, id);
  }

  @Delete('delete')
  async deleteategory(@Req() req, @Query('id') id: string) {
    return this.categoryService.deleteCategory(req, id);
  }
}
