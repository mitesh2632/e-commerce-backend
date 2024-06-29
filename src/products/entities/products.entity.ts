import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Products {
  @Prop()
  name: string;

  @Prop()
  rating: string;

  @Prop()
  price: number;

  @Prop()
  salePrice: string;

  @Prop()
  subTypeId: string;

  @Prop()
  size: string;

  @Prop()
  color: string;

  @Prop()
  description: string;

  @Prop()
  files: any[];

  @Prop()
  isFavourite: boolean;
}

export type ProductsDocument = Products & Document;
export const ProductsSchema = SchemaFactory.createForClass(Products);
