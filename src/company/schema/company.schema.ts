import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Company extends Document {
  @Prop({ unique: [true, 'duplicate Company name entered'] })
  companyName: string;
  @Prop()
  regNo: string;
  @Prop()
  email: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
