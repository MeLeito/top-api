import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Класс для характеристики продукта
class ProductCharacteristic {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;
}

// Интерфейс для ProductModel, который расширяет Document (Mongoose документ)
// export interface ProductModel extends Document {
//   image: string;
//   title: string;
//   price: number;
//   oldPrice?: number;
//   credit: number;
//   calculatedRating?: number;
//   description: string;
//   advantages?: string;
//   disAdvantages?: string;
//   categories: string[];
//   tags?: string[];
//   characteristics: ProductCharacteristic[];
// }

// Основной класс модели продукта
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop({ required: true })
  credit: number;

  @Prop()
  calculatedRating?: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  advantages?: string;

  @Prop()
  disAdvantages?: string;

  @Prop({ type: () => [String], required: true })
  categories: string[];

  @Prop({ type: () => [String] })
  tags?: string[];

  @Prop({ type: () => [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[];
}

// Создание схемы Mongoose
export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;