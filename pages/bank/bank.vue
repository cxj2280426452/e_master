<template>
	<view class="container">

		<view class="list">
			<view class="item">
				<text>持卡人</text>
				<input type="text" v-model="info.fullName" placeholder="输入姓名" />
			</view>
			<view class="item">
				<text>卡号</text>
				<input type="text" v-model="info.cardNumber" placeholder="输入卡号" />
			</view>
		</view>

		<view class="list">
			<view class="item">
				<text>身份证号</text>
				<input type="text" v-model="info.idCard" placeholder="输入身份证号" />
			</view>
			<view class="item">
				<text>手机号</text>
				<input type="text" v-model="info.mobile" placeholder="输入手机号" />
			</view>
		</view>

		<view class="submit-btn" @tap="submit">提交</view>

	</view>
</template>

<script>
	import {
		showWorkerBankCardEntity,
		setWorkerBankCardEntity
	} from "../../api/userInfo.js";
	import {
		validatePhone
	} from "../../utils/validate.js";
	export default {
		onLoad() {
			this.bindData();
		},
		data() {
			return {
				info: {
					cardNumber: "",
					fullName: "",
					idCard: "",
					mobile: ""
				}
			}
		},
		methods: {

			bindData() {

				showWorkerBankCardEntity({
					wtoken: this.$functions.getToken()
				}).then(res => {
					if (res.length == undefined) {
						this.info = res;
					}

				})

			},
			submit() {

				if (this.info.fullName == '') {
					this.$functions.error("请填写姓名");
					return false;
				}

				if (this.info.cardNumber == '') {
					this.$functions.error("请填写卡号");
					return false;
				}

				if (this.info.idCard == '') {
					this.$functions.error("请填写身份证号");
					return false;
				}

				if (!validatePhone(this.info.mobile)) {
					this.$functions.error("手机号格式有误");
					return false;
				}
				this.info.wtoken = this.$functions.getToken();

				setWorkerBankCardEntity(this.info).then(res => {
					this.$functions.success("绑定成功", () => {
						uni.navigateBack({

						})
					})
				})

			}

		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/bank.scss";
</style>
