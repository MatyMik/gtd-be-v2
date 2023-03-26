import { Test, TestingModule } from '@nestjs/testing';
import { MyDayController } from './my-day.controller';

describe('MyDayController', () => {
  let controller: MyDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyDayController],
    }).compile();

    controller = module.get<MyDayController>(MyDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
