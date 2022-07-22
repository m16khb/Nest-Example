import { Test, TestingModule } from '@nestjs/testing';
import { ServiceApplicationController } from './service-application.controller';
import { ServiceApplicationService } from '../service/service-application.service';

describe('ServiceApplicationController', () => {
  let controller: ServiceApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceApplicationController],
      providers: [ServiceApplicationService],
    }).compile();

    controller = module.get<ServiceApplicationController>(
      ServiceApplicationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
