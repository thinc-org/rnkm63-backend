import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Baan } from './baan.entity';

@Injectable()
export class BaanService {
  private cacheBaanData: Baan[];
  private cacheTimeStamp = 0;
  private baanRequestCount: number[] = [];

  constructor(
    @InjectRepository(Baan)
    private baanRepository: Repository<Baan>,
  ) {}

  async findBaan(baanID: number): Promise<Baan> {
    return await this.baanRepository.findOne(baanID);
  }

  //Begin Test Section
  async generateBaanDatabase() {
    await this.baanRepository.clear();

    const baanData = [
      { id: 1, capacity: 315, memberCount: 313 },
      { id: 2, capacity: 460, memberCount: 459 },
      { id: 3, capacity: 525, memberCount: 520 },
      { id: 4, capacity: 385, memberCount: 384 },
      { id: 5, capacity: 207, memberCount: 198 },
      { id: 6, capacity: 186, memberCount: 180 },
      { id: 7, capacity: 200, memberCount: 185 },
      { id: 8, capacity: 200, memberCount: 197 },
      { id: 9, capacity: 250, memberCount: 250 },
      { id: 10, capacity: 260, memberCount: 257 },
      { id: 11, capacity: 260, memberCount: 259 },
      { id: 12, capacity: 180, memberCount: 160 },
      { id: 13, capacity: 200, memberCount: 196 },
      { id: 14, capacity: 165, memberCount: 153 },
      { id: 15, capacity: 190, memberCount: 188 },
      { id: 16, capacity: 185, memberCount: 185 },
      { id: 17, capacity: 189, memberCount: 177 },
      { id: 18, capacity: 120, memberCount: 120 },
      { id: 19, capacity: 132, memberCount: 123 },
      { id: 20, capacity: 164, memberCount: 150 },
      { id: 21, capacity: 156, memberCount: 145 },
      { id: 22, capacity: 90, memberCount: 82 },
      { id: 24, capacity: 95, memberCount: 95 },
      { id: 27, capacity: 85, memberCount: 82 },
      { id: 29, capacity: 90, memberCount: 88 },
      { id: 30, capacity: 136, memberCount: 133 },
      { id: 31, capacity: 125, memberCount: 125 },
      { id: 32, capacity: 80, memberCount: 80 },
      { id: 33, capacity: 105, memberCount: 99 },
      { id: 34, capacity: 100, memberCount: 82 },
      { id: 35, capacity: 100, memberCount: 83 },
      { id: 36, capacity: 150, memberCount: 127 },
    ];

    if ((await this.baanRepository.find()).length === 0) {
      for (let e of baanData) {
        let baan = new Baan();

        baan.id = e.id;
        baan.capacity = e.capacity;
        baan.memberCount = e.memberCount;
        await this.baanRepository.save(baan);
        console.log(e.id);
      }
    }
    const r = await this.baanRepository.find();
    return r;
  }
  //End Test Section
}
