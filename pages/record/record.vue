<template>
	<view class="container">

		<view class="content">

			<view class="item" v-for="(items,index) in list" :key="index">
				<view class="item-content">
					<view class="one">
						<text>{{items.tanTitle}}</text>
						<text v-if="items.tanType=='G'||items.tanType=='F'">-{{items.tanMoney}}</text>
						<text v-if="items.tanType=='E'" class="xiaofei">+{{items.tanMoney}}</text>
					</view>
					<view class="two">
						<text>{{items.tanTime}}</text>
						<text v-if="items.tanState=='A'" :class="items.tanType=='E'?'xiaofei':''">待处理</text>
						<text v-if="items.tanState=='B'" :class="items.tanType=='E'?'xiaofei':''">交易成功</text>
						<text v-if="items.tanState=='C'" :class="items.tanType=='E'?'xiaofei':''">交易失败</text>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		getWorketTransactionEntity
	} from "../../api/userInfo.js";
	export default {
		onLoad() {
			this.bindData();
		},
		data() {
			return {
				list: [],
				page: 1,
				pageCount: 1,
				optType: ""
			}
		},
		onPullDownRefresh() {
			this.optType = "refresh";
			this.page = 1;
			this.bindData();
		},
		onReachBottom() {
			this.optType = "load";
			if (this.pageCount <= this.page) {
				return false;
			}
			this.page++;
			this.bindData();
		},
		methods: {
			bindData() {

				let param = {
					PageNumber: this.page,
					PageSize: this.$constants.pageSize,
					wtoken: this.$functions.getToken()
				}

				getWorketTransactionEntity(param).then(res => {
					this.optType == "load" ? this.list = [...this.list, ...res.list] : this.list = res.list;
					this.pageCount = res.pageCount;
				})

			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/record.scss";
</style>
