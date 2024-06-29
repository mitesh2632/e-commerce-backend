import { PartialType } from '@nestjs/swagger';
import { CreateSubType } from './createSubType.dto';

export class UpdateSubType extends PartialType(CreateSubType) {}
