/**
 * 手机号验证
 * @param {*} str 
 */
export function validatePhone(str) {

	const reg = /^1[3456789]\d{9}$/;
	return reg.test(str);
}


/**
 * 正数验证（最多保留两位小数）
 * @param {*} str 
 */
export function validateFloat(str) {

	const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
	return reg.test(str);
}
