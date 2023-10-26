import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { Employee } from '../schema/Employee.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload) {
    const { id } = payload;
    const employee = await this.employeeModel.findById(id);
    if (!employee) {
      throw new UnauthorizedException('Login to access this point');
    }
    return employee;
  }
}
