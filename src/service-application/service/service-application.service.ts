import { Injectable } from '@nestjs/common';
import { CreateServiceApplicationDto } from '../dto/create-service-application.dto';
import { UpdateServiceApplicationDto } from '../dto/update-service-application.dto';
import { ServiceApplicationRepository } from '../model/service-application.repository';

@Injectable()
export class ServiceApplicationService {
  constructor(
    private readonly serviceApplicationRepository: ServiceApplicationRepository,
  ) {}
  create(createServiceApplicationDto: CreateServiceApplicationDto) {
    return this.serviceApplicationRepository.create(
      createServiceApplicationDto,
    );
  }

  findAll() {
    return `This action returns all serviceApplication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceApplication`;
  }

  update(id: number, updateServiceApplicationDto: UpdateServiceApplicationDto) {
    return `This action updates a #${id} serviceApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceApplication`;
  }
}
