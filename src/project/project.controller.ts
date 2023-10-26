import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Post()
  @UseGuards(AuthGuard())
  async createProject(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectService.createProject(createProjectDto, req.user);
  }
}
