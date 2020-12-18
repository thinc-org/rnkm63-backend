import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Baan } from './baan.entity';

@Injectable()
export class BaanService {
  constructor(
    @InjectRepository(Baan)
    private baanRepository: Repository<Baan>,
  ) {}

  getAllBaan(): Promise<Baan[]> {
    return this.baanRepository.find();
  }

  async findBaan(baanID: number): Promise<Baan> {
    return await this.baanRepository.findOne(baanID);
  }
}
