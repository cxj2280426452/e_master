import constant from "@/config/constants.js"
import functions from "@/utils/functions.js";
//请求状态码
const httpCode = {
	success: '200', //请求成功
	notLogin: '501' //未登录
}

const service = (params) => {

	return new Promise((relove, reject) => {

		if (params.data.notShowLoading) {
			delete params.data.notShowLoading;
			console.log('删除notShowLoading')
		} else {
			functions.showWaiting();
			console.log('显示loading');
		}

		params.data.token = functions.getToken();
		if (!params.data.uid) {
			params.data.uid = functions.getUid();
		}

		console.log(`[${params.url}]请求参数:`, params.data);
		uni.request({
			url: constant.baseUrl + params.url,
			data: params.data,
			method: params.method,
			dataType: "json",
			header: {
				"content-type": "application/x-www-form-urlencoded"
			}
		}).then(res => {

			functions.closeWaiting();

			//停止下拉刷新
			uni.stopPullDownRefresh();

			let [err, success] = res;
			console.log(`[${params.url}]返回参数:`, success);
			if (!err) {

				if (success.statusCode == 200) {

					let data = success.data;

					switch (data.code) {

						case httpCode.success:
							if (data.hasOwnProperty("PageCount")) {
								let list = data.data ? data.data : [];
								let pageCount = data.PageCount;
								relove({
									list: list,
									pageCount: pageCount
								});
							} else {
								relove(data.data ? data.data : []);
							}
							break;
						case httpCode.notLogin:
							functions.logout();
							break;
						default:
							functions.error(data.msg);
					}

				} else {

					//请求失败
					functions.error("服务器请求失败");
				}

			} else {

				//请求失败
				functions.error("服务器请求失败");
			}



		});


	})



}
export default service;
