import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class SubType {
  @Prop()
  name: string;

  @Prop({ ref: 'SubCategory' })
  subCategoryId: mongoose.Types.ObjectId;
}

export type SubTypeDocument = SubType & Document;
export const SubTypeSchema = SchemaFactory.createForClass(SubType);
