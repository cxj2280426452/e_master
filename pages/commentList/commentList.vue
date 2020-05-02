<template>
	<view class="container">

		<view class="comment">

			<view class="list" v-for="(items,index) in list" :key="index">
				<view class="comment-content">
					<view class="top">
						<view class="top-right">
							<image class="header" :src="items.headportrait"></image>
							<view class="name">
								<view class="name-1">{{items.nickname}}</view>
								<view class="name-2">
									<text>服务星级</text>
									<uni-rate disabled="true" size="12" :value="items.star" :max="items.star"></uni-rate>
								</view>
							</view>
						</view>
						<view class="top-left">{{items.cmtTime}}</view>
					</view>
					<view class="comment-text">{{items.content}}</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		uniRate
	} from '@/node_modules/@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue';
	import {
		getCommentEntityList
	} from "../../api/orderList.js";
	export default {
		onLoad() {
			this.bindData();
		},
		components: {
			uniRate
		},
		data() {
			return {
				starValue: 4,
				page: 1,
				pageCount: 1,
				optType: "",
				list: []
			}
		},
		methods: {
			bindData() {

				let param = {
					PageNumber: this.page,
					PageSize: this.$constants.pageSize
				}
				getCommentEntityList(param).then(res => {
					for (let b in res.list) {
						res.list[b].star = parseInt(res.list[b].star);
					}
					this.optType == "load" ? this.list = [...this.list, ...res.list] : this.list = res.list;
					this.pageCount = res.pageCount;
					this.optType = "";
				})

			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/commentList.scss";
</style>
