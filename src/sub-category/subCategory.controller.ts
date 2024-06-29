import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubCategoryService } from './subCategory.service';
import { CreateSubCategory } from './dto/createSubCategory.dto';
import { UpdateSubCategory } from './dto/updateSubCategory.dto';

@Controller('sub-category')
@ApiTags('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('create')
  async createSubCategory(@Body() createSubCategory: CreateSubCategory) {
    return this.subCategoryService.createSubCategory(createSubCategory);
  }

  @Put('update')
  async updateSubCategory(
    @Query('id') id: string,
    @Body() updateSubCategory: UpdateSubCategory,
  ) {
    return this.subCategoryService.updateSubCategory(id, updateSubCategory);
  }

  @Get('getAll')
  async getAllSubCategory() {
    return this.subCategoryService.getAllSubCategory();
  }

  @Get('getOne')
  async getOneSubCategory(@Query('id') id: string) {
    return this.subCategoryService.getOneSubCategory(id);
  }

  @Delete('delete')
  async deleteSubCategory(@Query('id') id: string) {
    return this.subCategoryService.deleteSubCategory(id);
  }
}
