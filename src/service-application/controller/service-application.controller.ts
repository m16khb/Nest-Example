import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ServiceApplicationService } from '../service/service-application.service';
import { CreateServiceApplicationDto } from '../dto/create-service-application.dto';
import { UpdateServiceApplicationDto } from '../dto/update-service-application.dto';
// import { FormDataRequest } from 'nestjs-form-data';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('service-application')
export class ServiceApplicationController {
  constructor(
    private readonly serviceApplicationService: ServiceApplicationService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('idImage'))
  create(
    @Body() createServiceApplicationDto: CreateServiceApplicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.serviceApplicationService.create(createServiceApplicationDto);
  }

  @Get()
  findAll() {
    return this.serviceApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceApplicationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceApplicationDto: UpdateServiceApplicationDto,
  ) {
    return this.serviceApplicationService.update(
      +id,
      updateServiceApplicationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceApplicationService.remove(+id);
  }
}
