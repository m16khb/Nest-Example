import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceApplicationDto } from './create-service-application.dto';

export class UpdateServiceApplicationDto extends PartialType(CreateServiceApplicationDto) {}
