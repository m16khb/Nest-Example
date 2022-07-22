import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

const SCOPE = 'app';

const HTTP_STATUS = require('../constants/http_status');
const ERR_DEF = require('../constants/error-def');

globalThis.httpStatus = HTTP_STATUS;
globalThis.errDef = ERR_DEF;
globalThis.logFormat = {
  // 오류내용, err객체내용
  error: '%s --- %s',

  // 메소드, 요청URL, 클라이언트IP, 사용자에이전트
  request: 'REQUEST: %s %s --- [%s] - [%s]',

  // HTTP상태코드, 결과코드, 결과내용
  response: 'RESPONSE: [HTTP%s]-[%s] %s',
};

globalThis.db = { conn: null, config: null };
globalThis.DB_TYPE = config.database.db_type;
switch (DB_TYPE) {
  case 'mongodb':
    db.config = config.database.mongodb;
    break;
  case 'documentdb':
    db.config = config.database.documentdb;
    break;
}

// 전역 모듈
globalThis.ParamUtil = require('../helpers/param-util');
globalThis.logger = require('../helpers/logger-util');
globalThis.reqlib = require('app-root-path').require;

// 모듈 선언
const debug = require('debug')(`${config.app.name}:${SCOPE}`);
const createError = require('http-errors');
const express = require('express');
const httpLogger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const uuidGen = require('node-uuid');
const jwt = require('express-jwt');
const fs = require('fs');

// 전역 유틸리티 클래스 초기화

// 동작 환경 출력
logger.verbose('Env - %s', process.env.NODE_ENV);

// 서비스 결과 유틸 초기화
const ErrmsgUtil = reqlib('/helpers/errmsg-util');
ErrmsgUtil.init();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //debug('Env - %s', process.env.NODE_ENV);

  // app.disable('x-powered-by') // helmet 이 대신 수행
  app.use(helmet());

  // CORS
  app.use(cors());

  httpLogger.token('id', (req: { id: string }) => req.id);

  app.use(
    (req: { id: string }, _res: { statusCode: number }, next: NextFunction) => {
      const uuid = uuidGen.v4();
      debug('UUID: %s', uuid);
      req.id = uuid;
      next();
    },
  );

  app.use(
    httpLogger(
      ':date[iso] [REQ][:id] --- :method :url (HTTP/:http-version) - [:remote-addr :remote-user][:referrer] - :user-agent',
      {
        immediate: (_req: Request, _res: { statusCode: number }) => {
          return true;
        },
      },
    ),
  );

  if (!process.env.NODE_ENV.startsWith('prod')) {
    app.use(
      httpLogger('dev', {
        skip: (_req: Request, res: { statusCode: number }) => {
          return res.statusCode < 400;
        },
      }),
    );
  }

  app.use(
    httpLogger(
      ':date[iso] [RES][:id] --- :method :url :status - [Len: :res[content-length]] - :response-time ms',
    ),
  );

  app.use(compression());

  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: false }));

  app.use((req: { ip: string }, _res: Response, next: NextFunction) => {
    debug('Client IP: %s', req.ip);
    next();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
