import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Employee } from 'src/employee/schema/Employee.schema';
@Schema({ timestamps: true })
export class Project extends Document {
  @Prop()
  projectName: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  employeeId: Employee;
  @Prop()
  description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
