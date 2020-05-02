<template>

	<view class="container">

		<view class="content">

			<view class="item">

				<view class="logo">
					<image :src="`${imgBaseUrl}shifu.png`"></image>
				</view>

				<view class="text" v-if="info.state==2">审核中</view>
				<view class="text" v-if="info.state==1">审核通过</view>
				<view class="text" v-if="info.state==0">审核不通过</view>

			</view>

		</view>

	</view>

</template>

<script>
	import {
		showWorkerEntity
	} from "../../api/userInfo.js"
	export default {
		onLoad() {

		},
		onShow() {
			this.bindData();
		},
		data() {
			return {
				imgBaseUrl: this.$constants.imgBaseUrl,
				info: {}
			}
		},
		methods: {
			bindData() {
				showWorkerEntity({
					wtoken: this.$functions.getToken()
				}).then(res => {
					this.info = res;
					//审核不通过提示
					if (this.info.state == 0) {
						this.$functions.confirm("入驻申请未通过，是否重新申请入驻？", () => {
							uni.redirectTo({
								url: "../apply/apply"
							})
						})
					} else if (this.info.state == 1) {
						uni.redirectTo({
							url: "../order/order"
						})
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/login.scss";

	.text {
		width: 100%;
		font-size: 50upx;
		font-weight: 600;
		color: #007AFF;
		text-align: center;
		margin-top: 100upx;
	}
</style>
