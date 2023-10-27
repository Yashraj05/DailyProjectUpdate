import { Injectable } from '@nestjs/common';
import { Project } from './schema/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/createProject.dto';
import { Employee } from 'src/employee/schema/Employee.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}
  async createProject(createProjectDto: CreateProjectDto, emp: Employee) {
    const project = await this.projectModel.create(createProjectDto);
    project.employeeId = emp._id;
    project.save();
    return project;
  }
}
