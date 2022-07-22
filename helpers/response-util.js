
////////////////////////////////////////////////////////////////////////////////
// 전역 변수 및 상수 선언

const APP_NAME = config.app.name;
const SCOPE = 'response-util';


////////////////////////////////////////////////////////////////////////////////
// 모듈 선언

const debug = require('debug')(`${APP_NAME}:${SCOPE}`);

const ErrmsgUtil = reqlib('/helpers/errmsg-util');


////////////////////////////////////////////////////////////////////////////////
// 로직 구현

// 서비스 결과코드 초기화 (app.js 에서 사용)
exports.make = async (status, code) => {

  if ( 'local' == process.env.NODE_ENV )
    console.count(`${SCOPE}:make`);

  let response = null;

  try {
    response = {
      status: status,
      response: { code: code, message: ErrmsgUtil.get(code) },
    };
  }
  catch ( err ) {
    response = {
      status: '500',
      response: { code: '9999', message: ErrmsgUtil.get('9999') },
    };
  }

  debug('RESULT: %o', response);
  return response;
};
