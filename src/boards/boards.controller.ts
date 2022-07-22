import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { request } from 'urllib';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req) {
    const result = await this.boardsService.findAll();
    res.status(200);
    res.json(result);
    res.send();
  }

  @Get(':queryString')
  async findOne(@Param('queryString') queryString: string) {
    return await this.boardsService.findOne(queryString);
  }

  @Patch(':bid')
  async update(
    @Param('bid') bid: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return await this.boardsService.update(bid, updateBoardDto);
  }

  @Delete(':bid')
  async remove(@Param('bid') bid: string) {
    return await this.boardsService.remove(bid);
  }
}
