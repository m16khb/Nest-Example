import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { CreateAnnounceDto } from './dto/create-announce.dto';
import { UpdateAnnounceDto } from './dto/update-announce.dto';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}

  @Post()
  async create(@Body() createAnnounceDto: CreateAnnounceDto) {
    return await this.announceService.create(createAnnounceDto);
  }

  @Get()
  async findAll() {
    return await this.announceService.findAll();
  }

  @Get(':title')
  async findOne(@Param('title') title: string) {
    return await this.announceService.findOne(title);
  }

  @Patch(':id')
  async update(
    @Param('id') aid: string,
    @Body() updateAnnounceDto: UpdateAnnounceDto,
  ) {
    return await this.announceService.update(aid, updateAnnounceDto);
  }

  @Delete(':id')
  async remove(@Param('id') aid: string) {
    return await this.announceService.remove(aid);
  }
}
