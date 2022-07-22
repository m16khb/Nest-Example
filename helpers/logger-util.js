////////////////////////////////////////////////////////////////////////////////
// 전역 변수 및 상수 선언

const APP_NAME = config.app.name;
const SCOPE = 'logger-util';
const LOG_DIR = 'logs';

////////////////////////////////////////////////////////////////////////////////
// 모듈 선언

const debug = require('debug')(`${APP_NAME}:${SCOPE}`);
const path = require('path');
const moment = require('moment-timezone');

const { createLogger, transports, format } = require('winston');
const { combine, label, colorize, splat, printf } = format;

const DailyRotateFile = require('winston-daily-rotate-file');

////////////////////////////////////////////////////////////////////////////////
// 로직 구현

// 로그 출력 형태
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// 로그 시간대
const appendTimestamp = format((info, opts) => {
  if (opts.tz) info.timestamp = moment().tz(opts.tz).format('HH:mm:ss.SSS');
  return info;
});

// 파일 transport (일반 로그)
const ROTATE_FILE_NORMAL = new DailyRotateFile({
  level: process.env.NODE_ENV.startsWith('prod') ? 'verbose' : 'debug',
  dirname: path.join(process.env.PWD, LOG_DIR),
  filename: '%DATE%.log',
  datePattern: 'YYYY/MM/DD',
  zippedArchive: true,
  maxSize: '100m',
});
ROTATE_FILE_NORMAL.on('rotate', (oldFileName, newFileName) => {
  debug('Normal Log Rotate %s -> %s', oldFileName, newFileName);
});

// 파일 transport (오류 로그)
const ROTATE_FILE_ERROR = new DailyRotateFile({
  level: 'error',
  dirname: path.join(process.env.PWD, LOG_DIR),
  filename: '%DATE%.err',
  datePattern: 'YYYY/MM/DD',
  zippedArchive: true,
  maxSize: '100m',
});
ROTATE_FILE_ERROR.on('rotate', (oldFileName, newFileName) => {
  debug('Error Log Rotate %s -> %s', oldFileName, newFileName);
});

const logger = createLogger({
  transports: [ROTATE_FILE_NORMAL, ROTATE_FILE_ERROR],
  // 포맷
  format: combine(
    label({ label: process.pid }),
    colorize(),
    splat(),
    appendTimestamp({ tz: 'Asia/Seoul' }),
    logFormat,
  ),
  // 기본 메타정보
  defaultMeta: { service: APP_NAME },
  // 예외 핸들러
  exceptionHandlers: [
    new transports.File({
      filename: path.join(LOG_DIR, 'exceptions.log'),
      level: 'error',
    }),
  ],
});

//if (!process.env.NODE_ENV.startsWith('prod')) {
logger.add(
  new transports.Console({
    level: 'local' === process.env.NODE_ENV ? 'silly' : 'debug',
    format: logFormat,
  }),
);
//}

module.exports = logger;
