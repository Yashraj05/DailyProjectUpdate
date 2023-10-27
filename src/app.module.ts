import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { DailyupdateModule } from './dailyupdate/dailyupdate.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    CompanyModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    EmployeeModule,
    ProjectModule,
    DailyupdateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
