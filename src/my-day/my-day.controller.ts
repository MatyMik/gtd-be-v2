import { Body, Controller, Post } from '@nestjs/common';
import { MyDayService } from './my-day.service';
import { CreateMyDayDto } from './DTOs/create-my-day.dto';

@Controller('my-day')
export class MyDayController {
  constructor(private myDayService: MyDayService) {}

  @Post()
  async createMyDay(@Body() myDay: CreateMyDayDto) {
    await this.myDayService.createFullMyDay(myDay);
  }
}
