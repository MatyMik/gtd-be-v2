import { Test, TestingModule } from '@nestjs/testing';
import { NextActionsService } from './next-actions.service';

describe('NextActionsService', () => {
  let service: NextActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NextActionsService],
    }).compile();

    service = module.get<NextActionsService>(NextActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
