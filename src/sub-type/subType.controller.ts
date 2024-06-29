import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SubTypeService } from './subType.service';
import { CreateSubType } from './dto/createSubType.dto';

@Controller('sub-type')
@ApiTags('sub-type')
export class SubTypeController {
  constructor(private readonly subTypeService: SubTypeService) {}

  @Post('create')
  async createSubType(@Body() createSubTypeDto: CreateSubType) {
    return this.subTypeService.createSubType(createSubTypeDto);
  }

  @Put('update')
  async updateSubType(
    @Query('id') id: string,
    @Body() createSubTypeDto: CreateSubType,
  ) {
    return this.subTypeService.updateSubType(id, createSubTypeDto);
  }

  @Get('getAll')
  async getAllSubType() {
    return this.subTypeService.getAllSubType();
  }

  @Get('getOne')
  async getOneSubType(@Query('id') id: string) {
    return this.subTypeService.getOneSubType(id);
  }

  @Delete('delete')
  async deleteSubType(@Query('id') id: string) {
    return this.subTypeService.deleteSubType(id);
  }
}
