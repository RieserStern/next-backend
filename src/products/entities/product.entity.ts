import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ type: Number, index: true })
  price: number;
  @Prop({ type: Number })
  stock: number;
  @Prop()
  image?: string;

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  categories: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ price: 1, stock: -1 });
