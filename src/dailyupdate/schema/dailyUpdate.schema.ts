import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Project } from 'src/project/schema/project.schema';
@Schema({ timestamps: true })
export class DailyUpdate extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectId: Project;
  @Prop({ default: 'pending' })
  status: string;

  @Prop({ required: true })
  date: Date;
  @Prop()
  data: string;
}
export const DailyUpdateSchema = SchemaFactory.createForClass(DailyUpdate);
DailyUpdateSchema.index(
  { projectId: 1, date: 1 },
  { unique: true, sparse: true },
);
