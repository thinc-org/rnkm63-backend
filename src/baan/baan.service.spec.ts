import { Test, TestingModule } from '@nestjs/testing';
import { BaanService } from './baan.service';

describe('BaanService', () => {
  let service: BaanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaanService],
    }).compile();

    service = module.get<BaanService>(BaanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
