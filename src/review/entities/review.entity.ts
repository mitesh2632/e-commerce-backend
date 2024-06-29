import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Review {
  @Prop()
  productId: string;

  @Prop()
  description: string;

  @Prop()
  rating: string;

  @Prop()
  files: any[];

  @Prop()
  user: string;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
