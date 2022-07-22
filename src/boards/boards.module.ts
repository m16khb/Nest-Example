import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './boards.repository';
import { DynamooseModule } from 'nestjs-dynamoose';
import { BoardsSchema } from './boards.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([{ name: 'boards', schema: BoardsSchema }]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository],
})
export class BoardsModule {}
