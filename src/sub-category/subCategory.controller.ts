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
import { ApiTags } from '@nestjs/swagger';
import { SubCategoryService } from './subCategory.service';
import { CreateSubCategory } from './dto/createSubCategory.dto';
import { UpdateSubCategory } from './dto/updateSubCategory.dto';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';

@Controller('sub-category')
@UseGuards(JwtAuthGuard)
@ApiTags('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('create')
  async createSubCategory(
    @Req() req,
    @Body() createSubCategory: CreateSubCategory,
  ) {
    return this.subCategoryService.createSubCategory(req, createSubCategory);
  }

  @Put('update')
  async updateSubCategory(
    @Req() req,
    @Query('id') id: string,
    @Body() updateSubCategory: UpdateSubCategory,
  ) {
    return this.subCategoryService.updateSubCategory(
      req,
      id,
      updateSubCategory,
    );
  }

  @Get('getAll')
  async getAllSubCategory(@Req() req) {
    return this.subCategoryService.getAllSubCategory(req);
  }

  @Get('getOne')
  async getOneSubCategory(@Req() req, @Query('id') id: string) {
    return this.subCategoryService.getOneSubCategory(req, id);
  }

  @Delete('delete')
  async deleteSubCategory(@Req() req, @Query('id') id: string) {
    return this.subCategoryService.deleteSubCategory(req, id);
  }
}
