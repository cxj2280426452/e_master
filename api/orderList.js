import request from "@/utils/request.js";

/**
 * 获取精选评论列表
 * @param {Object} data
 */
export function getCommentEntityList(data) {

	return request({
		url: "OrderlistController/GetCommentEntityList",
		method: "post",
		data: data
	})
}

/**
 * 查询订单
 * @param {Object} data
 */
export function showOrderlistEntity(data) {

	return request({
		url: "OrderlistController/ShowOrderlistEntity",
		method: "post",
		data: data
	})
}


/**
 * 师傅确认订单完成
 * @param {Object} data
 */
export function workerConfirmOrderlistEntity(data) {

	return request({
		url: "OrderlistController/WorkerConfirmOrderlistEntity",
		method: "post",
		data: data
	})
}

/**
 * 师傅获取订单列表
 * @param {Object} data
 */
export function getWorkerOrderlistEntityList(data) {

	return request({
		url: "OrderlistController/GetWorkerOrderlistEntityList",
		method: "post",
		data: data
	})
}

/**
 * 师傅接单
 * @param {Object} data
 */
export function workerCancelOrderlistEntity(data) {

	return request({
		url: "OrderlistController/WorkerCancelOrderlistEntity",
		method: "post",
		data: data
	})
}


/**
 * 获取订单评论
 * @param {Object} data
 */
export function showCommentEntity(data) {

	return request({
		url: "OrderlistController/ShowCommentEntity",
		method: "post",
		data: data
	})
}
