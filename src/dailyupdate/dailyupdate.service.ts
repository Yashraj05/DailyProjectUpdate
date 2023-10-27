import { Injectable } from '@nestjs/common';
import { DailyUpdate } from './schema/dailyUpdate.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Project } from 'src/project/schema/project.schema';
import * as Pusher from 'pusher';
import { Employee } from 'src/employee/schema/Employee.schema';
import { DailyUpdateDto } from './dto/createUpdate.dto';
// import * as admin from 'firebase-admin';
// admin.initializeApp({
//   credential: admin.credential.cert(
//     '/home/my/Desktop/firebase-crud/src/firebase/firebase-config/testing-fc6d0-firebase-adminsdk-7djm1-16b84c1e31.json',
//   ),
//   databaseURL: 'https://testing-fc6d0-default-rtdb.firebaseio.com', // Replace with your Firebase Realtime Database URL
// });
@Injectable()
export class DailyupdateService {
  pusher: Pusher;
  constructor(
    @InjectModel(DailyUpdate.name)
    private readonly dailyUpdateModel: Model<DailyUpdate>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>, // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ) {
    this.pusher = new Pusher({
      appId: '1695399',
      key: '6617161572132e880b76',
      secret: 'a4e17dbf8017f1f08759',
      cluster: 'ap2',
      useTLS: true,
    });
  }
  @Cron('0 33 17 * * *')
  async everydayAtMidnight() {
    const projects = await this.projectModel.find().exec();
    const today = new Date();
    console.log(today);
    today.setUTCHours(0, 0, 0, 0);
    console.log(today);

    // console.log(projects);
    for (const project of projects) {
      // console.log(project);
      const existingUpdate = await this.dailyUpdateModel
        .findOne({
          projectId: project._id,
          date: today,
        })
        .exec();
      // console.log(existingUpdate);

      if (!existingUpdate) {
        const data = Object.assign({
          projectId: project._id,
          date: today,
          data: '',
        });
        await this.dailyUpdateModel.create(data);
      }
      // const data = Object.assign({
      //   projectId: project._id,
      //   date: today,
      //   data: '',
      // });
      // await this.dailyUpdateModel.create(data);
    }
  }
  // @Cron('0 19 * * *')
  @Cron('*/30 * * * * *')
  async everydayAtsevenpm() {
    const pendingUpdates = await this.dailyUpdateModel.find({
      status: 'pending',
    });
    console.log(pendingUpdates.length);
    for (const update of pendingUpdates) {
      const project = await this.projectModel.findById(update.projectId);
      // console.log('>>>>project', project);

      const employee = await this.employeeModel.findById(project.employeeId);
      // console.log('>>>>employee', employee);
      // console.log(employee);
      // Send a real-time notification to the employee
      const notificationMessage = `You have a pending task for project: ${project.projectName}`;
      this.pusher.trigger(`employee-${employee._id}`, 'notification', {
        message: notificationMessage,
      });
      console.log(notificationMessage);
    }
  }
  async update(id: string, dailyUpdateDto: DailyUpdateDto) {
    const updated = {
      ...dailyUpdateDto,
      date: Date.now(),
      status: 'completed',
    };
    await this.dailyUpdateModel.findOneAndUpdate({ projectId: id }, updated);
  }
}
