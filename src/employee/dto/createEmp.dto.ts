import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;
}
