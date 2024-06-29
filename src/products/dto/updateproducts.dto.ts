import { PartialType } from '@nestjs/swagger';
import { CreateProducts } from './createproducts.dto';

export class UpdateProducts extends PartialType(CreateProducts) {}
