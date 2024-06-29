import { PartialType } from '@nestjs/swagger';
import { CreateSubCategory } from './createSubCategory.dto';

export class UpdateSubCategory extends PartialType(CreateSubCategory) {}
