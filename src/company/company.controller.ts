import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }
}
