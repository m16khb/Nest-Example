import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { DynamooseModule } from 'nestjs-dynamoose';
// import { ReqLoggerMiddleware } from './req.logger.middleware';
import { AnnounceModule } from './announce/announce.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ServiceApplicationModule } from './service-application/service-application.module';
globalThis.config = require('../config/common');
globalThis.config.database = require('../config/database-local');

@Module({
  imports: [
    DynamooseModule.forRoot({ aws: config.database.aws }),
    BoardsModule,
    AnnounceModule,
    ServiceApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    //consumer.apply(ReqLoggerMiddleware).forRoutes('/boards');
    consumer.apply(LoggerMiddleware).forRoutes('/boards');
  }
}
