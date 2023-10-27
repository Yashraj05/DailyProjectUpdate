import { Body, Controller, Param, Patch } from '@nestjs/common';
import { DailyupdateService } from './dailyupdate.service';
import { DailyUpdateDto } from './dto/createUpdate.dto';

@Controller('dailyupdate')
export class DailyupdateController {
  constructor(private dailyUpdateService: DailyupdateService) {}
  @Patch(':id')
  async dailyUpdate(
    @Body() dailyUpdateDto: DailyUpdateDto,
    @Param('id') id: string,
  ) {
    return this.dailyUpdateService.update(id, dailyUpdateDto);
  }
}
