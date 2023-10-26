import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmpDto } from './dto/createEmp.dto';
import { LoginEmpDto } from './dto/loginEmp.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private empService: EmployeeService) {}

  @Post('/signup')
  signUp(@Body() createEmpDto: CreateEmpDto): Promise<{ token: string }> {
    return this.empService.signUp(createEmpDto);
  }
  @Post('/login')
  async login(@Body() loginEmpDto: LoginEmpDto) {
    return await this.empService.login(loginEmpDto);
  }
}
