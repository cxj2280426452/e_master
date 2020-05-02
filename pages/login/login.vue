<template>
	<view class="container">

		<view class="content">

			<view class="item">

				<view class="logo">
					<image :src="`${imgBaseUrl}shifu.png`"></image>
				</view>

				<view @tap="login" class="btn">授权登录</view>

			</view>

		</view>

	</view>
</template>

<script>
	import {
		addWorkerEntity
	} from "../../api/userInfo.js";
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		computed: {
			...mapState(["openId"])
		},
		onLoad(e) {

			//通过二维码进入此页面
			if (e.q) {
				let q = decodeURIComponent(e.q);
				this.qrUid = this.getQueryString(q, 'uid');
			}
		},
		data() {
			return {
				imgBaseUrl: this.$constants.imgBaseUrl,
				qrUid: "",
				code: ""
			}
		},
		methods: {
			...mapMutations(["setToken", "setUid", "setOpenId"]),
			getQueryString(url, name) {
				var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
				var r = url.substr(1).match(reg)
				if (r != null) {
					return r[2]
				}
				return null;
			},

			login() {

				const that = this;

				uni.getProvider({
					service: 'oauth',
					success: function(res) {

						if (~res.provider.indexOf('weixin')) {

							uni.login({
								provider: 'weixin',
								success: function(loginRes) {

									that.code = loginRes.code;
									that.submit();

								},
								fail() {
									that.$functions.error("登录失败");
								}
							})
						}

					},
					fail() {
						that.$functions.error("登录失败");
					}
				})
			},

			submit() {

				if (this.code == '') {
					this.$functions.error("登录失败");
					return false;
				}

				let param = {
					code: this.code,
					invitationq: this.qrUid
				}

				addWorkerEntity(param).then(res => {

					if (typeof res === "object") {
				
						//写入token和uid
						this.setToken(res.wtoken);
						this.setUid(res.wid);
						this.setOpenId(res.openid);

						if (res.state == 1) {
							uni.redirectTo({
								url: "../order/order"
							})
						} else {
							uni.redirectTo({
								url: "../state/state"
							})
						}

					} else {
						this.setToken("");
						this.setUid("");
						this.setOpenId(res);
						uni.redirectTo({
							url: "../apply/apply"
						})
					}

				})
			}

		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/login.scss";
</style>
