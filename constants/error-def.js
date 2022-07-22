/**
 * tablepay-api
 * 테이블페이 API
 * 오류 코드
 */

////////////////////////////////////////////////////////////////////////////////
// 오류 정의

module.exports = {

    // 0xxx - 정상
    OK: { code: '0000', msg: 'OK' },

    // 100x - 계정/권한/인증 오류
    ERR_ACCOUNT_NOT_FOUND:
        { code: '1000', msg: '계정을 찾을 수 없습니다.' },
    ERR_ACCOUNT_ID_DUPLICATED:
        { code: '1001', msg: '계정이 이미 등록되어있습니다.' },
    ERR_ACCOUNT_ID_DELETED:
        { code: '1002', msg: '계정이 이미 지워졌습니다.' },
    ERR_ACCOUNT_UNAUTHORIZED:
        { code: '1003', msg: '이 계정에는 권한이 없습니다.' },
    ERR_ACCOUNT_PASSWORD_INCONSISTENCY:
        { code: '1004', msg: '암호가 일치하지 않습니다.' },
    ERR_ACCOUNT_ID_INVALID:
        { code: '1005', msg: 'ID가 잘못되었습니다. (영문/숫자 3~20자 허용)' },
    ERR_ACCOUNT_ACTIVE_INVALID:
        { code: '1006', msg: '계정 활성화여부가 잘못되었습니다. (N/Y 허용)' },

    // 101x - 로그인 매개변수 누락
    ERR_LOGIN_ID_NOT_FOUND:
        { code: '1011', msg: 'ID를 찾을 수 없습니다.' },
    ERR_LOGIN_PW_NOT_FOUND:
        { code: '1012', msg: '암호를 찾을 수 없습니다.' },

    // 102x - 로그인 매개변수 오류
    ERR_LOGIN_ID_INVALID:
        { code: '1021', msg: 'ID가 잘못되었습니다. (영문/숫자 3~20자 허용)' },
    ERR_LOGIN_PW_INVALID:
        { code: '1022', msg: '암호가 잘못되었습니다.' },

    // 103x - 암호변경 매개변수 누락
    ERR_PWCHG_ID_NOT_FOUND:
        { code: '1031', msg: 'ID를 찾을 수 없습니다.' },
    ERR_PWCHG_OLD_PW_NOT_FOUND:
        { code: '1032', msg: '이전 암호를 찾을 수 없습니다.' },
    ERR_PWCHG_NEW_PW_NOT_FOUND:
        { code: '1033', msg: '새 암호를 찾을 수 없습니다.' },

    // 104x - 암호변경 매개변수 오류
    ERR_PWCHG_ID_INVALID:
        { code: '1041', msg: 'ID가 잘못되었습니다. (영문/숫자 3~20자 허용)' },
    ERR_PWCHG_OLD_PW_INVALID:
        { code: '1042', msg: '이전 암호가 잘못되었습니다.' },
    ERR_PWCHG_NEW_PW_INVALID:
        { code: '1043', msg: '새 암호가 잘못되었습니다.' },
    ERR_PWCHG_PW_SAME:
        { code: '1044', msg: '기존 암호와 새 암호가 같습니다. 다른 값을 지정해주세요.' },

    // 21xx - 관리자정보 오류
    ERR_ADMIN_NOT_FOUND:
        { code: '2100', msg: '관리자를 찾을 수 없습니다.' },

    // 22xx - 고객정보 오류
    ERR_CUSTOMER_NOT_FOUND:
        { code: '2200', msg: '고객을 찾을 수 없습니다.' },

    // 3xxx - 결제정보 오류
    ERR_PAYMENT_NOT_FOUND:
        { code: '3000', msg: '결제정보를 찾을 수 없습니다.' },
    ERR_PAYMENT_APPR_FAIL:
        { code: '3001', msg: '결제 승인 오류!' },
    ERR_PAYMENT_CANC_FAIL:
        { code: '3002', msg: '결제 승인 취소 오류!' },

    // 4xxx - 주문정보 오류
    ERR_ORDER_NOT_FOUND:
        { code: '4000', msg: '주문정보를 찾을 수 없습니다.' },

    // 51xx - 상점정보 오류
    ERR_STORE_NOT_FOUND:
        { code: '5100', msg: '상점정보를 찾을 수 없습니다.' },

    // 52xx - 메뉴정보 오류
    ERR_MENU_NOT_FOUND:
        { code: '5200', msg: '메뉴정보를 찾을 수 없습니다.' },

    // 53xx - 분류정보 오류
    ERR_CATEGORY_NOT_FOUND:
        { code: '5300', msg: '분류정보를 찾을 수 없습니다.' },

    // 6xxx

    // 7xxx

    // 8xxx

    // 90xx - 클라이언트 요청 오류
    ERR_CLIENT_ABNORMAL_USE:
        { code: '9000', msg: '클라이언트에서 비정상적인 사용이 감지되었습니다.' },
    ERR_CLIENT_URI_INVALID:
        { code: '9001', msg: 'HTTP URI가 잘못되었습니다.' },
    ERR_CLIENT_METHOD_INVALID:
        { code: '9002', msg: 'HTTP 메소드가 잘못되었습니다.' },
    ERR_CLIENT_REQ_BODY_EMPTY:
        { code: '9003', msg: '요청 본문이 없습니다.' },
    ERR_CLIENT_REQ_QUERY_EMPTY:
        { code: '9004', msg: '요청 조건절이 없습니다.' },
    ERR_CLIENT_REQ_OFFSET_INVALID:
        { code: '9005', msg: '검색 시작위치가 잘못되었습니다. (0~ 허용)' },
    ERR_CLIENT_REQ_LIMIT_INVALID:
        { code: '9006', msg: '조회할 개수가 잘못되었습니다. (1~100 허용)' },
    ERR_CLIENT_DATE_RANGE_INVALID:
        { code: '9007', msg: '조회 날짜 범위가 잘못되었습니다. (시작일 <= 종료일 허용)' },

    // 96xx - 푸시 알림 오류
    ERR_PUSH_NOTIFICATION_NOTI_FAIL:
        { code: '9601', msg: '푸시 알림을 실패함.' },

    // 97xx - 데이터베이스 오류
    ERR_DB_CONN:
        { code: '9700', msg: '데이터베이스 접속중 오류 발생' },
    ERR_DB_CRUD_C:
        { code: '9701', msg: '자료 생성중 오류 발생' },
    ERR_DB_CRUD_R:
        { code: '9702', msg: '자료 조회중 오류 발생' },
    ERR_DB_CRUD_U:
        { code: '9703', msg: '자료 수정중 오류 발생' },
    ERR_DB_CRUD_D:
        { code: '9704', msg: '자료 삭제중 오류 발생' },

    // 98xx - 입출력 오류
    ERR_IO_FILE:
        { code: '9801', msg: '파일 입출력중 오류가 발생했습니다.' },
    ERR_IO_NETWORK:
        { code: '9802', msg: '네트워크 입출력중 오류가 발생했습니다.' },
    ERR_IO_DATABASE:
        { code: '9803', msg: '데이터베이스 입출력중 오류가 발생했습니다.' },

    // 99xx - 기타 내부 오류 (메모리, 문자열 분석, 자료형변환, ...)
    ERR_ETC_MEMORY:
        { code: '9900', msg: '메모리 관련 예외가 발생했습니다.' },
    ERR_ETC_CASTING:
        { code: '9901', msg: '형변환중 오류가 발생했습니다.' },
    ERR_ETC_LOCALE:
        { code: '9902', msg: '문자셋 관련 예외가 발생했습니다.' },
    ERR_ETC_PARSE:
        { code: '9903', msg: '문자열 분석중 오류가 발생했습니다.' },
    ERR_ETC_CRYPTO:
        { code: '9904', msg: '암/복호화중 오류가 발생했습니다.' },

    // 9999 - 정의되지 않은 오류
    ERR_UNKNOWN:
        { code: '9999', msg: '기타 정의되지 않은 오류가 발생했습니다.' },
}
