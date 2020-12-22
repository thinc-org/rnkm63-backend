import { Test, TestingModule } from '@nestjs/testing';
import { BaanController } from './baan.controller';

describe('BaanController', () => {
  let controller: BaanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaanController],
    }).compile();

    controller = module.get<BaanController>(BaanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
