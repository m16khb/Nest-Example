import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 } from 'uuid';
import { CreateServiceApplicationDto } from '../dto/create-service-application.dto';
import {
  ServiceApplication,
  ServiceApplicationKey,
} from './service-application.interface';

@Injectable()
export class ServiceApplicationRepository {
  constructor(
    @InjectModel('service-application')
    private readonly serviceApplicationModel: Model<
      ServiceApplication,
      ServiceApplicationKey
    >,
  ) {}

  async create(createServiceApplicationDto: CreateServiceApplicationDto) {
    console.log(createServiceApplicationDto.idImage);
    return this.serviceApplicationModel.create({
      id: v4(),
      idImage: createServiceApplicationDto.idImage,
      CEOName: createServiceApplicationDto.CEOName,
    });
  }
}
