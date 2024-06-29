import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class SubCategory {
  @Prop()
  name: string;

  @Prop({ ref: 'Category' })
  categoryId: mongoose.Types.ObjectId;
}

export type SubCategoryDocument = SubCategory & Document;
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
