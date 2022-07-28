import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  image?: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
