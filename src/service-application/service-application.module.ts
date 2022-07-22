import { Module } from '@nestjs/common';
import { ServiceApplicationService } from './service/service-application.service';
import { ServiceApplicationController } from './controller/service-application.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ServiceApplicationRepository } from './model/service-application.repository';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ServiceApplicaionSchema } from './model/service-application.schema';
@Module({
  imports: [
    DynamooseModule.forFeature([
      { name: 'service-application', schema: ServiceApplicaionSchema },
    ]),
    NestjsFormDataModule,
  ],
  controllers: [ServiceApplicationController],
  providers: [ServiceApplicationService, ServiceApplicationRepository],
})
export class ServiceApplicationModule {}
