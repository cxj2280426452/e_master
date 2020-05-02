<template>
	<view class="container">

		<textarea v-model="content" class="remarks" placeholder="请输入备注信息"></textarea>

		<view class="btn" @tap="submit">提交</view>

	</view>
</template>

<script>
	import {
		workerConfirmOrderlistEntity
	} from "../../api/orderList.js";
	export default {
		onLoad(e) {
			this.olId = e.olId;
		},
		data() {
			return {
				olId: 0,
				content: ""
			}
		},
		methods: {

			submit() {

				let that = this;
				this.$functions.confirm("是否确定提交？", () => {
					workerConfirmOrderlistEntity({
						olId: this.olId,
						remarks: this.content
					}).then(res => {
						that.$functions.success('提交成功', () => {
							uni.navigateBack({
								delta: 2
							})
						});
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/confirmOrder.scss";
</style>
