import request from "@/utils/request.js";

/**
 * 师傅申请入住
 * @param {Object} data
 */
export function addWorkerEntity2(data) {

	return request({
		url: "UserinfoController/addWorkerEntity2",
		method: "post",
		data: data
	})
}

/**
 * 师傅查询银行卡
 * @param {Object} data
 */
export function showWorkerBankCardEntity(data) {

	return request({
		url: "UserinfoController/ShowWorkerBankCardEntity",
		method: "post",
		data: data
	})
}

/**
 * 师傅设置银行卡信息
 * @param {Object} data
 */
export function setWorkerBankCardEntity(data) {

	return request({
		url: "UserinfoController/SetWorkerBankCardEntity",
		method: "post",
		data: data
	})
}


/**
 * 微信师傅登录
 * @param {Object} data
 */
export function addWorkerEntity(data) {

	return request({
		url: "UserinfoController/addWorkerEntity",
		method: "post",
		data: data
	})
}

/**
 * 获取师傅用户信息
 * @param {Object} data
 */
export function showWorkerEntity(data) {

	return request({
		url: "UserinfoController/ShowWorkerEntity",
		method: "post",
		data: data
	})
}

/**
 * 师傅端-获取流水记录列表
 * @param {Object} data
 */
export function getWorketTransactionEntity(data) {

	return request({
		url: "OrderlistController/GetWorketTransactionEntity",
		method: "post",
		data: data
	})
}


/**
 * 师傅端收益提现
 * @param {Object} data
 */
export function workerApplyWithdraw(data) {

	return request({
		url: "WXWithdrawController/WorkerApplyWithdraw",
		method: "post",
		data: data
	})
}


/**
 *师傅微信提现
 * @param {Object} data
 */
export function workerWithdraw(data) {

	return request({
		url: "WXWithdrawController/WorkerWithdraw",
		method: "post",
		data: data
	})
}
