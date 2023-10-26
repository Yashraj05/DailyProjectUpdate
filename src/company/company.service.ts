import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schema/company.schema';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/createCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}
  async createCompany(createCompanyDto: CreateCompanyDto) {
    return await this.companyModel.create(createCompanyDto);
  }
}
