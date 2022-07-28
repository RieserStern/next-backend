import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String })
  phone: string;

  @Prop({
    type: [{ name: { type: String }, color: { type: String } }],
  })
  skills: Types.Array<Record<string, any>>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
