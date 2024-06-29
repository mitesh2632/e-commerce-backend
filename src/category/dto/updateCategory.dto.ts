import { PartialType } from '@nestjs/swagger';
import { CreateCategory } from './createCategory.dto';

export class UpdateCategory extends PartialType(CreateCategory) {}
