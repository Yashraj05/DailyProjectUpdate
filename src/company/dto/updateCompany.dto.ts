import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsOptional()
  @IsString()
  companyName?: string;
  @IsOptional()
  @IsNumberString()
  regNo?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
}
