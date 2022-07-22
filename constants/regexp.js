/**
 * tablepay-api
 * 테이블페이 API
 * 정규표현식
 */

////////////////////////////////////////////////////////////////////////////////
// 정규표현식 정의

module.exports = {
  orientation: /^[LP]$/,
  brandCode: /^BD\d{4}$/,
  categoryCode: /^CA\d{2}$/,
  menuCode: /^MN\d{4}$/,
  optSelType: /^[MS]$/,
  temperature: /^[HI]$/,
  appNo: /^\d{8,10}$/,
  taxType: /^[123]$/,
  setType: /^[NST]$/,
  orderStat: /^[ACFP]$/,
  payStat: /^[AC]$/,
  storeStat: /^[COPS]$/,
  installment: /^0[02-9]|[1-9]\d$/,
  y2md: /^(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
  y2mdt: /^(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])([0-5]\d)([0-5]\d)$/,
  y4md: /^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
  y4mdt: /^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])([0-5]\d)([0-5]\d)$/,
  cardNo14: /^(3[0689]\d{2})\s?[-]?\s?(\d{2})(?:[\d#*]{4})\s?[-]?\s?(\d{4})$/,
  cardNo15: /^(3[347]\d{2})\s?[-]?\s?(\d{2})(?:[\d#*]{4})\s?[-]?\s?[\d#*](\d{4})$/,
  cardNo16: /^((?:(?:3[125])|(?:(?=\d)(?=[^3]).\d))\d{2})\s?[-]?\s?(\d{2})[\d#*]{2}\s?[-]?\s?[\d#*]{4}\s?[-]?\s?(\d{4})$/,
}