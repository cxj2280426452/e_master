import request from "@/utils/request.js";

/**
 * 获取banner列表
 * @param {Object} data
 */
export function getBannerEntity(data) {

	return request({
		url: "OtherController/GetBannerEntity",
		method: "post",
		data: data
	})
}

/**
 * 获取协议
 * @param {Object} data
 */
export function getAgreementEntity(data) {

	return request({
		url: "OtherController/GetAgreementEntity",
		method: "post",
		data: data
	})
}
