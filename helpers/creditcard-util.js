
////////////////////////////////////////////////////////////////////////////////
// 전역 변수 및 상수 선언

const APP_NAME = config.app.name;
const SCOPE = 'creditcard-util';


////////////////////////////////////////////////////////////////////////////////
// 모듈 선언

const debug = require('debug')(`${APP_NAME}:${SCOPE}`);
const regexp = reqlib('/constants/regexp');


////////////////////////////////////////////////////////////////////////////////
// 로직 구현

// 비식별화: 공통
exports.deIdentifyString = (str) => {

  if ( 'local' == process.env.NODE_ENV )
    console.count(`${SCOPE}:deIdentifyString`);

  const deIdentifyStr = (!!str && (0 < str.length)) ? str.replace(/\w/g, '#') : str;
  debug('De-Identify string: %s', deIdentifyStr);

  return deIdentifyStr;
};

// 비식별화: 신용카드번호
exports.deIdentifyCardNo = (cardNo) => {

  if ( 'local' == process.env.NODE_ENV )
    console.count(`${SCOPE}:deIdentifyCardNo`);

  if ( !cardNo || (14 > cardNo.length) ) {
    const deIdentifyStr = deIdentifyString(cardNo);
    debug('De-Identify Card No.: %s', deIdentifyStr);
    return deIdentifyStr;
  }

  let deIdentifyRegexp;
  let formatStr;

  switch ( cardNo.substr(0, 2) ) {
    // 다이너스 클럽 (14자리)
    case '30':
    case '36':
    case '38':
    case '39':
      deIdentifyRegexp = regexp.cardNo14;
      formatStr = '$1-$2####-$3';
      break;

    // 아멕스 (15자리)
    case '33':
    case '34':
    case '37':
      deIdentifyRegexp = regexp.cardNo15;
      formatStr = '$1-$2####-#$3';
      break;

    // 기타 (16자리)
    default:
      deIdentifyRegexp = regexp.cardNo16;
      formatStr = '$1-$2##-####-$3';
      break;
  }

  const deIdentifyCardNo = cardNo.replace(deIdentifyRegexp, formatStr);
  debug('De-Identify Card No.: %s', deIdentifyCardNo);

  return deIdentifyCardNo;
};
