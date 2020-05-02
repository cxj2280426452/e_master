import request from "@/utils/request.js";

/**
 * 获取一级服务分类
 * @param {Object} data
 */
export function getServiceOneEntity(data) {

	return request({
		url: "ServieTypeController/GetServiceOneEntity",
		method: "post",
		data: data
	})
}
