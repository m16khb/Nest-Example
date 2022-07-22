import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 } from 'uuid';
import { Announce, AnnouncesKey } from './announce.interface';
import { CreateAnnounceDto } from './dto/create-announce.dto';
import { UpdateAnnounceDto } from './dto/update-announce.dto';

@Injectable()
export class AnnounceRepository {
  constructor(
    @InjectModel('announce')
    private readonly announcesModel: Model<Announce, AnnouncesKey>,
  ) {}

  async create(createAnnounceDto: CreateAnnounceDto) {
    // transaction쓰면 원하는대로 동작 안함
    // return await this.boardsModel.transaction.create({
    //   bid: v4(),
    //   title: createBoardDto.title,
    //   content: createBoardDto.content,
    // });
    return await this.announcesModel.create({
      aid: v4(),
      title: createAnnounceDto.title,
      content: createAnnounceDto.content,
    });
  }

  async findAll() {
    //throw new Error('error');
    return await this.announcesModel.scan().exec();
  }

  //조건에 해당하는 값들 반환
  async findOne(queryString: string) {
    return await this.announcesModel
      .scan('title')
      .contains(queryString)
      .or()
      .where('content')
      .contains(queryString)
      .exec();
  }

  async update(aid: string, updateAnnounceDto: UpdateAnnounceDto) {
    return await this.announcesModel.update({ aid: aid }, updateAnnounceDto);
  }

  async remove(aid: string) {
    return await this.announcesModel.delete({ aid: aid });
  }
}
