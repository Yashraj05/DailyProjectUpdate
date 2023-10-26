import { IsMongoId, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsOptional()
  projectName?: string;
  @IsOptional()
  @IsMongoId({ each: true })
  employeeIds?: string[];
  @IsOptional()
  description?: string;
  @IsOptional()
  @IsMongoId()
  companyId?: string;
}
