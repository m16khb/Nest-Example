
////////////////////////////////////////////////////////////////////////////////
// 전역 변수 및 상수 선언

const APP_NAME = config.app.name;
const SCOPE = 'errmsg-util';


////////////////////////////////////////////////////////////////////////////////
// 모듈 선언

const debug = require('debug')(`${APP_NAME}:${SCOPE}`);
const HashMap = require('hashmap');

const errDef = reqlib('/constants/error-def');


////////////////////////////////////////////////////////////////////////////////
// 로직 구현

// 서비스 결과코드 초기화 (app.js 에서 사용)
exports.init = () => {

  if ( 'local' == process.env.NODE_ENV )
    console.count(`${SCOPE}:init`);

  const map = new HashMap();

  let code, msg;
  for ( const key of Object.keys(errDef) ) {
    code = errDef[key].code;
    msg = errDef[key].msg;
    debug('%s: %s', code, msg);
    map.set(code, msg);
  }

  globalThis.errmap = map;

  // 디버깅용 코드
  // for ( const pair of errmap )
  //   debug(`${pair.key} : ${pair.value}`);
};

// 서비스 결과 코드로 내용을 얻음
exports.get = (code) => {

  if ( 'local' == process.env.NODE_ENV )
    console.count(`${SCOPE}:get`);

  debug('CODE: %s', code);

  if ( !globalThis.errmap || (1 > errmap.size) )
    throw new Error('서비스 결과코드가 초기화되지 않았습니다!');

  const message = errmap.get(code);
  debug('Message: %s', message);

  return message;
};
