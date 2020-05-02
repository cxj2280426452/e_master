let loadingService = true; //等待层状态
import store from "../store.js";
import constants from "@/config/constants.js";
import QQMapWX from './qqmap-wx-jssdk.min.js';
const api = {

	/**
	 * 成功提示
	 */
	success: (msg, callfun) => {

		uni.showToast({
			title: msg,
			icon: "success"
		})

		if (typeof callfun === "function") {
			setTimeout(() => {
				callfun();
			}, 1500)
		}

	},

	/**
	 * 失败提示
	 */
	error: (msg, callfun) => {

		uni.showToast({
			title: msg,
			icon: "none",
			duration: 2500
		})

		if (typeof callfun === "function") {
			setTimeout(() => {
				callfun();
			}, 2500)
		}

	},

	/**
	 * 等待层
	 */
	showWaiting: () => {

		loadingService = true;

		setTimeout(() => {

			if (loadingService) {
				uni.showLoading({
					title: '加载中',
					mask: true
				});

			}

		}, 200)

	},

	/**
	 * 关闭等待层
	 */
	closeWaiting: () => {

		loadingService = false;
		uni.hideLoading();
	},

	/**
	 * 确认对话框
	 * @param {Object} contents
	 * @param {Object} callback
	 */
	confirm: (contents, callback) => {

		uni.showModal({
			title: '提示',
			content: contents,
			success: function(res) {
				if (res.confirm) {
					callback();
				}
			}
		});

	},

	/**
	 *获取登录用户token 
	 */
	getToken: () => {

		return store.state.token || "";
	},

	/**
	 *获取登录用户token 
	 */
	getOpenId: () => {

		return store.state.openId || "";
	},

	/**
	 *获取登录用户uid
	 */
	getUid: () => {

		return store.state.uid || "";
	},

	/**
	 *写入用户token 
	 */
	setToken: (token) => {

		store.commit("setToken", token);
	},

	/**
	 * 写入用户uid
	 */
	setUid: (uid) => {

		store.commit("setUid", uid);
	},

	/**
	 * 写入用户openId
	 */
	setOpenId: (openId) => {

		store.commit("setOpenId", openId);
	},

	/**
	 * 登陆处理
	 */
	logout: () => {

		uni.reLaunch({
			url: "/pages/login/login"
		})
	},

	/**
	 * 获取当前日期
	 */
	currentDate: () => {

		const date = new Date();

		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${year}-${month}-${day}`;

	},

	/**
	 * 获取当前时间
	 */
	currentTime: () => {

		const date = new Date();
		const hh = date.getHours();
		const mm = date.getMinutes();

		return `${hh}:${mm}`;

	},


	/**
	 * 选择相册
	 */
	selectImgs: (limit) => {

		return new Promise((relove, reject) => {

			uni.chooseImage({
				count: limit,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					let files = res.tempFilePaths;
					api.httpUploads(files, 0, new Array(), relove, reject);
				}
			});

		})

	},


	/**
	 * 上传文件
	 */
	httpUploads: (files, count, imgArr, relove, reject) => {

		api.showWaiting();
		uni.uploadFile({
				url: `${constants.baseUrl}UploadController/PictureUpload`,
				filePath: files[count],
				name: 'myfiles'
			})
			.then(result => {
				count++;

				if (result[1].statusCode == 200) {
					let data = JSON.parse(result[1].data);
					let str = data.url.replace("[", "");
					imgArr.push(str.replace("]", ""));
				}

				if (count == files.length) {
					api.closeWaiting();
					console.log('上传完毕');
					relove(imgArr);
				} else {
					api.httpUploads(files, count, imgArr);
				}
			})
			.catch(result => {
				api.closeWaiting();
				api.error("上传失败");
				reject(result);
				console.log('上传失败', result);
			});
	},


	/**
	 * 序列化提交的参数
	 */
	serializeParam: (data) => {

		return JSON.parse(JSON.stringify(data));
	},

	/**
	 * 地址转换经纬度
	 * @param {Object} address
	 */
	changeLngLat: (address) => {

		return new Promise((relove, reject) => {

			api.showWaiting();

			//初始化map
			const qqMap = new QQMapWX({
				key: constants.mapKey
			});

			qqMap.geocoder({
				address: address,
				success: res => {

					api.closeWaiting();

					if (res.status == 0) {

						relove({
							city: res.result.address_components.city,
							province: res.result.address_components.province,
							lng: res.result.location.lng,
							lat: res.result.location.lat
						});

					} else {
						reject("地址错误");
						api.error("地址错误");
					}
				},
				fail: res => {

					api.closeWaiting();
					reject("地址错误");
					api.error("地址错误");
				}
			});

		})

	}


}
export default api;
