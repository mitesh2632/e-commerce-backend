import { ApiTags } from '@nestjs/swagger';
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
import { SubTypeService } from './subType.service';
import { CreateSubType } from './dto/createSubType.dto';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sub-type')
@ApiTags('sub-type')
export class SubTypeController {
  constructor(private readonly subTypeService: SubTypeService) {}

  @Post('create')
  async createSubType(@Req() req, @Body() createSubTypeDto: CreateSubType) {
    return this.subTypeService.createSubType(req, createSubTypeDto);
  }

  @Put('update')
  async updateSubType(
    @Req() req,
    @Query('id') id: string,
    @Body() createSubTypeDto: CreateSubType,
  ) {
    return this.subTypeService.updateSubType(req, id, createSubTypeDto);
  }

  @Get('getAll')
  async getAllSubType(@Req() req) {
    return this.subTypeService.getAllSubType(req);
  }

  @Get('getOne')
  async getOneSubType(@Req() req, @Query('id') id: string) {
    return this.subTypeService.getOneSubType(req, id);
  }

  @Delete('delete')
  async deleteSubType(@Req() req, @Query('id') id: string) {
    return this.subTypeService.deleteSubType(req, id);
  }
}
