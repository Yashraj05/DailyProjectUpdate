import { IsNotEmpty } from 'class-validator';

export class DailyUpdateDto {
  @IsNotEmpty()
  data: string;
}
