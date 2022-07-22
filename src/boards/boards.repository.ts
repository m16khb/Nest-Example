import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 } from 'uuid';
import { Boards, BoardsKey } from './boards.interface';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsRepository {
  constructor(
    @InjectModel('boards')
    private readonly boardsModel: Model<Boards, BoardsKey>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    // transaction쓰면 원하는대로 동작 안함
    // return await this.boardsModel.transaction.create({
    //   bid: v4(),
    //   title: createBoardDto.title,
    //   content: createBoardDto.content,
    // });
    return await this.boardsModel.create({
      bid: v4(),
      title: createBoardDto.title,
      content: createBoardDto.content,
    });
  }

  async findAll() {
    //throw new Error('error');
    return await this.boardsModel.scan().exec();
  }

  //조건에 해당하는 값들 반환
  async findOne(queryString: string) {
    return await this.boardsModel
      .scan('title')
      .contains(queryString)
      .or()
      .where('content')
      .contains(queryString)
      .exec();
  }

  async update(bid: string, updateBoardDto: UpdateBoardDto) {
    return await this.boardsModel.update({ bid: bid }, updateBoardDto);
  }

  async remove(bid: string) {
    return await this.boardsModel.delete({ bid: bid });
  }
}
