////////////////////////////////////////////////////////////////////////////////
// 전역 변수 및 상수 선언

const APP_NAME = config.app.name;
const SCOPE = 'param-util';

////////////////////////////////////////////////////////////////////////////////
// 모듈 선언

const debug = require('debug')(`${APP_NAME}:${SCOPE}`);

////////////////////////////////////////////////////////////////////////////////
// 로직 구현

// 요청할 때 쓰인 값들을 추적하여 출력 (개발환경일 때만 동작함)
exports.trace = (req) => {
  if ('local' == process.env.NODE_ENV) console.count(`${SCOPE}:trace`);

  // 운영환경인 경우 진행하지 않고 빠져나옴
  if (req.app.get('env').startsWith('prod')) return;

  // Path
  if (req.params) {
    for (key of Object.keys(req.params)) {
      debug('Path - %s: %s', key, req.params[key]);
    }
  }

  // Header
  if (req.headers) {
    for (key of Object.keys(req.headers))
      debug('Header - %s: %s', key, req.headers[key]);
  }

  // Query
  if (req.query) {
    for (key of Object.keys(req.query))
      debug('Query - %s: %s', key, req.query[key]);
  }

  // Body
  if (req.body) {
    for (key of Object.keys(req.body))
      debug('Body - %s: %s', key, req.body[key]);
  }
};
