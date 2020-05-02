<template>
	<view class="container">

		<view class="contact">
			<view class="contents">
				<view class="name">{{info.fullName||""}}</view>
				<view class="address">
					<view @tap="callPhone" class="mobile" style="display: flex;align-items: center;margin-left: 0upx;">
						<image style="width: 30upx;height: 30upx;" src="../../static/img/other/phone.png"></image>
						<text style="margin-left: 10upx;">{{info.orderMobile||""}}</text>
					</view>
					<view class="area" @tap="daohang">
						<image :src="`${imgBaseUrl}dizhi.png`"></image>
						<view>{{info.province||""}}{{info.city||""}}{{info.orderAddress||""}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="service-title">服务信息</view>

		<view class="service-content">

			<view class="item">
				<view class="item-cons">
					<text class="left">服务类型：</text>
					<view class="center">{{info.serviceOne||""}}/{{info.serviceTwo||""}}/{{info.serviceThree||""}}</view>
				</view>
			</view>

			<view class="item">
				<view class="item-cons">
					<text class="left">服务时间：</text>
					<view class="center">{{info.serviceTime||""}}</view>
				</view>
			</view>

			<view class="item-img">

				<view class="item-cons">
					<text class="left">现场图片：</text>
					<scroll-view scroll-x="" class="img-list">
						<image @tap="previewImgs(index)" v-for="(items,index) in info.orderPUrl" :key="index" :src="httpImgUrl+items.picture"></image>
					</scroll-view>
				</view>

			</view>

			<view class="item-price">
				<view class="right">
					<view></view>
					<view>
						<text>总金额</text>
						<text>￥{{info.orderPrice||0}}</text>
					</view>
				</view>
			</view>

		</view>

		<view class="service-title">订单描述</view>

		<view class="describe">
			<textarea disabled="true">{{info.orderDescribe||""}}</textarea>
		</view>

		<view class="comment-title">
			<text>评价</text>
			<view class="right">

			</view>
		</view>

		<view class="comment" v-for="(items,index) in commentList" :key="index">
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
</template>

<script>
	import {
		showOrderlistEntity,
		showCommentEntity
	} from "../../api/orderList.js";
	import {
		uniRate
	} from '@/node_modules/@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue';
	export default {
		components: {
			uniRate
		},
		onLoad(e) {
			this.olId = e.olId;
			this.bindData();
			this.getCommentList();
		},
		data() {
			return {
				imgBaseUrl: this.$constants.imgBaseUrl,
				starValue: 4,
				olId: 0,
				info: {},
				httpImgUrl: this.$constants.httpImgUrl,
				commentList: []
			}
		},
		methods: {

			bindData() {

				showOrderlistEntity({
					olId: this.olId
				}).then(res => {
					this.info = res;
					if (this.info.orderPUrl != '') {
						this.info.orderPUrl = JSON.parse(this.info.orderPUrl);
					}
				})
			},
			getCommentList() {

				showCommentEntity({
					olId: this.olId
				}).then(res => {

					this.commentList = res.map(item => {
						item.star = parseInt(item.star);
						return item;
					});
				})
			},
			callPhone() {

				uni.makePhoneCall({

					// 手机号
					phoneNumber: this.info.orderMobile,

					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},

					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}

				});

			},
			daohang() {
				let that = this;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						const latitude = Number(that.info.latitude);
						const longitude = Number(that.info.longitude);
						console.log(latitude)
						console.log(longitude)
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function() {
								console.log('success');
							},
							fail(e) {
								console.log('error',e);
							}
						});
					}
				});

			},
			previewImgs(index) {
				
				let imgList=[];
				if(this.info.orderPUrl){
					this.info.orderPUrl.map(item=>{
						imgList.push(this.httpImgUrl+item.picture);
					})
				}
			
				uni.previewImage({
					urls: imgList,
					current:index
				});
			
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/orderInfo.scss";
</style>
