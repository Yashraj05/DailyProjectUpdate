import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Company } from 'src/company/schema/company.schema';
@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ unique: [true, 'duplicate email entered'] })
  email: string;
  @Prop()
  password: string;
  @Prop()
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  companyId: Company;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
