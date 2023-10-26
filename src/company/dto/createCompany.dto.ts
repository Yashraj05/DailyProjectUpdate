import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;
  @IsNotEmpty()
  @IsNumberString()
  regNo: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
