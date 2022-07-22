import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ReqLoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    logger.info(
      logFormat.request,
      req.method,
      req.originalUrl,
      req.ip,
      req.get('User-Agent'),
    );
    next();
  }
}
