<template>
	<view class="container">

		<view class="head">
			<view class="record">
				<view></view>
				<navigator url="../record/record">
					<view class="record-list">流水记录</view>
				</navigator>
			</view>
			<view>
				<view class="title">余额</view>
				<view class="price">{{info.balance||0}}</view>
			</view>
		</view>

		<navigator url="../bank/bank">
			<view class="bank-card">
				<navigator url="../bank/bank">
					<view class="bank-content">
						<text>我的银行卡</text>
						<image :src="`${imgBaseUrl}left.png`"></image>
					</view>
				</navigator>
			</view>
		</navigator>

		<view class="withdraw">
			<view class="title">提现余额</view>
			<view class="price">
				<view class="content">
					<text class="price-icon">￥</text>
					<input placeholder="请输入金额" placeholder-style="color:#B9B9B9;" v-model="amount" />
				</view>
			</view>
			<view class="remd">可用金额：{{info.balance||0}}（最小提现金额100.00）</view>
		</view>

		<view class="submit-btn" @tap="wechatWith">微信提现</view>
		<view class="submit-btn" @tap="bankWith">银行卡提现</view>

	</view>
</template>

<script>
	import {
		validateFloat
	} from "../../utils/validate.js";
	import {
		showWorkerEntity,
		showWorkerBankCardEntity,
		workerApplyWithdraw,
		workerWithdraw
	} from "../../api/userInfo.js";
	export default {
		onLoad() {
			this.getUserInfo();
			this.getBank();
		},
		onShow() {
			this.getBank();
		},
		data() {
			return {
				imgBaseUrl: this.$constants.imgBaseUrl,
				info: {},
				bank: "",
				amount: ""
			}
		},
		methods: {
			getUserInfo() {
				showWorkerEntity({
					wtoken: this.$functions.getToken()
				}).then(res => {
					this.info = res;
				})
			},
			getBank() {

				showWorkerBankCardEntity({
					wtoken: this.$functions.getToken()
				}).then(res => {
					if (res.length == undefined) {
						this.bank = res;
					}
					console.log("bank", this.bank);
				})

			},
			resetPrice() {
				let price = parseFloat(this.info.balance) - parseFloat(this.amount);
				this.info.balance = price.toFixed(2);
				this.amount = "";
			},
			bankWith() {

				if (this.bank == "") {
					this.$functions.confirm("您还未绑定银行卡，是否去绑定银行卡？", () => {
						uni.navigateTo({
							url: "../bank/bank"
						})
					})

					return false;
				}

				if (!validateFloat(this.amount)) {
					this.$functions.error("提现金额必须是数字");
					return false;
				}

				if (parseFloat(this.amount) > parseFloat(this.info.price)) {
					this.$functions.error("提现金额必须小于可提现金额");
					return false;
				}

				let param = {
					money: this.amount,
					wtoken: this.$functions.getToken()
				};

				workerApplyWithdraw(param).then(res => {
					//重新计算可提现金额
					this.resetPrice();
					this.$functions.success("提现申请提交成功");
				})

			},
			wechatWith() {

				if (!validateFloat(this.amount)) {
					this.$functions.error("提现金额必须是数字");
					return false;
				}

				if (parseFloat(this.amount) > parseFloat(this.info.price)) {
					this.$functions.error("提现金额必须小于可提现金额");
					return false;
				}

				let param = {
					money: this.amount,
					wtoken: this.$functions.getToken()
				};

				workerWithdraw(param).then(res => {
					//重新计算可提现金额
					this.resetPrice();
					this.$functions.success("提现申请提交成功");
				})

			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/wallet.scss";
</style>
