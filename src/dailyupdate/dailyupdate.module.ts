import { Module } from '@nestjs/common';
import { DailyupdateController } from './dailyupdate.controller';
import { DailyupdateService } from './dailyupdate.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyUpdate, DailyUpdateSchema } from './schema/dailyUpdate.schema';
import { Project } from 'src/project/schema/project.schema';
import { Employee } from 'src/employee/schema/Employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyUpdate.name, schema: DailyUpdateSchema },
    ]),
    MongooseModule.forFeature([{ name: Project.name, schema: Project }]),
    MongooseModule.forFeature([{ name: Employee.name, schema: Employee }]),
  ],
  controllers: [DailyupdateController],
  providers: [DailyupdateService],
})
export class DailyupdateModule {}
