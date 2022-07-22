import { Module } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { AnnounceController } from './announce.controller';
import { AnnounceRepository } from './announce.repository';
import { DynamooseModule } from 'nestjs-dynamoose';
import { AnnouncesSchema } from './announce.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([{ name: 'announce', schema: AnnouncesSchema }]),
  ],
  controllers: [AnnounceController],
  providers: [AnnounceService, AnnounceRepository],
})
export class AnnounceModule {}
