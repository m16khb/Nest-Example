
////////////////////////////////////////////////////////////////////////////////
// 전역 변수 및 상수 선언

const APP_NAME = config.app.name;
const SCOPE = 'serialization-util';


////////////////////////////////////////////////////////////////////////////////
// 모듈 선언

const debug = require('debug')(`${APP_NAME}:${SCOPE}`);


////////////////////////////////////////////////////////////////////////////////
// 로직 구현

// 직렬화
exports.serialize = (arr) => {

  if ( 'local' == process.env.NODE_ENV )
    console.count(`${SCOPE}:serialize`);

  let type, len;
  let sizeBuf, bodyBuf;
  const bufArray = [];

  // ASCII NULL
  bodyBuf = Buffer.alloc(1);
  bodyBuf.writeUInt8(0x00);
  bufArray.push(bodyBuf);

  // ASCII STX
  bodyBuf = Buffer.alloc(1);
  bodyBuf.writeUInt8(0x02);
  bufArray.push(bodyBuf);

  // 본문
  for ( const value of arr ) {
    debug(`${value}(${typeof value})`);

    switch ( typeof value ) {
      case 'number': type = 'N'; break;
      case 'string': type = 'S'; break;
      default      : throw new Error('Unknown type');
    }

    bodyBuf = Buffer.from(type, 'ascii');
    bufArray.push(bodyBuf);

    switch ( type ) {
      case 'N':
        len = Math.ceil((Math.log(value) / Math.log(2)) / 8);
        debug(`Size: ${len} bytes`);
        sizeBuf = Buffer.alloc(1);
        sizeBuf.writeInt8(len);
        bufArray.push(sizeBuf);
        bodyBuf = Buffer.alloc(len);
        bodyBuf.writeIntBE(value, 0, len);
        bufArray.push(bodyBuf);
        break;
      case 'S':
        bodyBuf = Buffer.from(value, 'utf-8');
        len = bodyBuf.length;
        debug(`Size: ${len} bytes`);
        sizeBuf = Buffer.alloc(1);
        sizeBuf.writeInt8(len);
        bufArray.push(sizeBuf);
        bufArray.push(bodyBuf);
        break;
      default:
        throw new Error('Unknown type');
    }
  }

  // ASCII NULL
  bodyBuf = Buffer.alloc(1);
  bodyBuf.writeUInt8(0x00);
  bufArray.push(bodyBuf);

  // ASCII ETX
  bodyBuf = Buffer.alloc(1);
  bodyBuf.writeUInt8(0x03);
  bufArray.push(bodyBuf);

  // 버퍼 병합
  const bufSum = Buffer.concat(bufArray);
  debug('Buffer: %o', bufSum);

  // Base64 인코딩
  const base64 = bufSum.toString('base64').replace(/\=/g, '');
  debug('Base64: %s', base64);

  return base64;
};

// 역직렬화
exports.deserialize = (encodeStr) => {

  if ( 'local' == process.env.NODE_ENV )
    console.count(`${SCOPE}:deserialize`);

  // Base64 디코딩
  const buffer = Buffer.from(encodeStr, 'base64');
  debug('Buffer: %o', buffer);

  let ctl, type, len, val;
  let size = buffer.length;
  let idx = 0;
  let isPrepare = false;
  const bufArray = [];

  while ( idx < size ) {
    // 시작위치(STX)를 찾음
    if ( isPrepare ) {
      ctl = buffer.readUInt8(idx);

      // ETX
      if ( (0x00 === ctl) && (0x03 === buffer.readUInt8(idx + 1)) ) {
        debug(`index: ${idx}, ctl: ${ctl}`);
        debug(`index: ${idx + 1}, ctl: ${buffer.readUInt8(idx + 1)}`);
        break;
      } else {
        // Type
        type = buffer.slice(idx, idx + 1). toString('ascii');
        debug(`index: ${idx}, type: ${type}`);

        // Length
        len = buffer.readInt8(++idx);
        debug(`index: ${idx}, len: ${len} bytes`);

        // Value
        switch ( type ) {
          case 'N':
            val = buffer.readIntBE(++idx, len);
            bufArray.push(val);
            debug(`index: ${idx}, val: ${val}`);
            idx += len;
            break;
          case 'S':
            val = buffer.slice(++idx, idx + len).toString('utf-8');
            bufArray.push(val);
            debug(`index: ${idx}, val: ${val}`);
            idx += len;
            break;
          default:
            throw new Error('Unknown type');
        }
      }
    }
    // 시작위치(STX)를 못찾음
    else {
      ctl = buffer.readUInt8(idx);

      if ( 0x00 === ctl ) {
        debug(`index: ${idx}, ctl: ${ctl}`);

        ctl = buffer.readUInt8(++idx);
        debug(`index: ${idx}, ctl: ${ctl}`);

        // STX 처리 시작
        if ( 0x02 === ctl ) {
          isPrepare = true;
          ++idx;
        }
        // ETX 종료
        else if ( 0x03 === ctl ) {
          break;
        }
      }
    }
  }

  return bufArray;
};
