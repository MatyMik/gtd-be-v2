import { Module } from '@nestjs/common';
import { MyDayService } from './my-day.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NextAction } from '../next-actions/next-action.entity';
import { ToDo } from './entities/to-do-entry.entity';
import { MyDay } from './entities/my-day.entity';
import { Hour } from './entities/hour.entity';
import { MyDayController } from './my-day.controller';

@Module({
  providers: [MyDayService],
  imports: [MikroOrmModule.forFeature([ToDo, NextAction, Hour, MyDay])],
  controllers: [MyDayController],
})
export class MyDayModule {}
