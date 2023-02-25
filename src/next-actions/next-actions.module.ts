import { Module } from '@nestjs/common';
import { NextActionsController } from './next-actions.controller';

@Module({
  controllers: [NextActionsController]
})
export class NextActionsModule {}
