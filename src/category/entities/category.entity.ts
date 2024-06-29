import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryType } from '../enums/category-type.enum';

@Schema({ timestamps: true })
export class Category {
  @Prop()
  name: string;

  @Prop({ enum: CategoryType })
  type: CategoryType;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
