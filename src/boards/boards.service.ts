import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';
import { Response } from 'express';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async create(createBoardDto: CreateBoardDto) {
    return await this.boardsRepository.create(createBoardDto);
  }

  async findAll() {
    return await this.boardsRepository.findAll();
  }

  //조건에 해당하는 값들 반환
  async findOne(queryString: string) {
    return await this.boardsRepository.findOne(queryString);
  }

  async update(bid: string, updateBoardDto: UpdateBoardDto) {
    return await this.boardsRepository.update(bid, updateBoardDto);
  }

  async remove(bid: string) {
    return await this.boardsRepository.remove(bid);
  }
}
