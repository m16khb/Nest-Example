import { Injectable, NestMiddleware } from '@nestjs/common';
import { request } from 'urllib';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: Function) {
    const loggerService = new LoggerService(req.url.slice(1).split('/')[0]);
    const tempUrl = req.method + ' ' + req.url.split('?')[0];
    const _headers = JSON.stringify(req.headers ? req.headers : {});
    const _query = JSON.stringify(req.query ? req.query : {});
    const _body = JSON.stringify(req.body ? req.body : {});
    const _url = JSON.stringify(tempUrl ? tempUrl : {});

    // const instance_id = await request(
    //   'http://169.254.169.254/latest/meta-data/instance-id',
    // );

    // loggerService.log(
    //   `[${instance_id.data}]${_url} ${_headers} ${_query} ${_body}`.replace(
    //     /\\/,
    //     '',
    //   ),
    // );

    loggerService.log(
      `${_url} ${_headers} ${_query} ${_body}`.replace(/\\/, ''),
    );

    next();
  }
}
