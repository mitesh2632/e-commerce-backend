import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategory } from './dto/createCategory.dto';
import { CategoryType } from './enums/category-type.enum';

@ApiTags('Category')
@Controller('category')
export class CategoryControler {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @ApiQuery({ name: 'type', enum: CategoryType })
  async createCategory(
    @Query('name') name: string,
    @Query('type') type: CategoryType = CategoryType.Women,
  ) {
    return this.categoryService.createCategory(name, type);
  }

  @Put('update')
  @ApiQuery({ name: 'type', enum: CategoryType })
  async updateCategory(
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('type') type: CategoryType = CategoryType.Women,
  ) {
    return this.categoryService.updateCategory(id, name, type);
  }

  @Get('getAll')
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Get('getOne')
  async getOneCategory(@Query('id') id: string) {
    return this.categoryService.getOneCategory(id);
  }

  @Delete('delete')
  async deleteategory(@Query('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
