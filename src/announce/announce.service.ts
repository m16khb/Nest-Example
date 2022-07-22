import { Injectable } from '@nestjs/common';
import { AnnounceRepository } from './announce.repository';
import { CreateAnnounceDto } from './dto/create-announce.dto';
import { UpdateAnnounceDto } from './dto/update-announce.dto';

@Injectable()
export class AnnounceService {
  constructor(private readonly announceRepository: AnnounceRepository) {}
  async create(createAnnounceDto: CreateAnnounceDto) {
    return await this.announceRepository.create(createAnnounceDto);
  }

  async findAll() {
    return await this.announceRepository.findAll();
  }

  async findOne(title: string) {
    return await this.announceRepository.findOne(title);
  }

  async update(title: string, updateAnnounceDto: UpdateAnnounceDto) {
    return await this.announceRepository.update(title, updateAnnounceDto);
  }

  async remove(aid: string) {
    return await this.announceRepository.remove(aid);
  }
}
