import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schema/Employee.schema';
import { Model } from 'mongoose';
import { CreateEmpDto } from './dto/createEmp.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginEmpDto } from './dto/loginEmp.dto';
import * as admin from 'firebase-admin';
admin.initializeApp({
  credential: admin.credential.cert(
    '/home/my/Desktop/firebase-crud/src/firebase/firebase-config/testing-fc6d0-firebase-adminsdk-7djm1-16b84c1e31.json',
  ),
  databaseURL: 'https://testing-fc6d0-default-rtdb.firebaseio.com', // Replace with your Firebase Realtime Database URL
});
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    private jwtService: JwtService,
  ) {}
  async signUp(createEmp: CreateEmpDto): Promise<{ token: string }> {
    const { name, email, password, companyId } = createEmp;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.employeeModel.create({
      name,
      email,
      password: hashedPassword,
      companyId,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
  async login(loginDto: LoginEmpDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    console.log(loginDto);

    const user = await this.employeeModel.findOne({ email });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log(password);
    console.log(user.password);
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
