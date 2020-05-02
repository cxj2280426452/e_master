<template>
	<view class="container">

		<banner :list="bannerList"></banner>

		<view class="tags">
			<view class="item">
				<image :src="`${imgBaseUrl}xuanzhong.png`"></image>
				<text>师傅100%认证</text>
			</view>
			<view class="item">
				<image :src="`${imgBaseUrl}xuanzhong.png`"></image>
				<text>3分钟闪接单</text>
			</view>
			<view class="item">
				<image :src="`${imgBaseUrl}xuanzhong.png`"></image>
				<text>免上门费</text>
			</view>
		</view>

		<view class="contact">
			<view class="contents">
				<view class="name">{{info.fullName||""}}</view>
				<view class="address">
					<view class="mobile">{{info.orderMobile||""}}</view>
					<view class="area">
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

			<view class="discount">
				<text class="title">抵扣券</text>
				<view class="info">
					<text v-if="info.myCouponEntity" class="selected">{{info.myCouponEntity.couponMoney}}元</text>
					<text v-else>未使用抵扣卷</text>
					<image :src="`${imgBaseUrl}left.png`"></image>
				</view>
			</view>

		</view>

		<view class="service-title">订单描述</view>

		<view class="describe">
			<textarea disabled="true">{{info.orderDescribe||""}}</textarea>
		</view>

		<view class="price">
			<view class="contents">
				<text class="left">金额</text>
				<view class="right">
					<text>￥</text>
					<input disabled="" type="number" :value="info.orderPrice||0" />
				</view>
			</view>
		</view>

		<view class="price">
			<view class="contents">
				<text class="left">最后支付金额</text>
				<view class="right">
					<text>￥</text>
					<input disabled="" type="number" :value="info.finalPrice||0" />
				</view>
			</view>
		</view>

		<!-- <view class="price">
			<view class="contents">
				<text class="left">物品名称</text>
				<view class="goods-name">
					瓷砖
				</view>
			</view>
		</view>

		<view class="price">
			<view class="contents">
				<text class="left">物品金额</text>
				<view class="goods-price">
					￥89.00
				</view>
			</view>
		</view> -->

		<view class="service-title">备注</view>

		<view class="describe">
			<textarea disabled="true">{{info.remarks||""}}</textarea>
		</view>

		<view class="list">
			<view class="item">
				<view>
					<image :src="`${imgBaseUrl}xiadan.png`"></image>
				</view>
				<view class="text">下单</view>
			</view>
			<image class="links" :src="`${imgBaseUrl}yuan.png`"></image>
			<view class="item">
				<view>
					<image :src="`${imgBaseUrl}jiedan.png`"></image>
				</view>
				<view class="text">接单</view>
			</view>
			<image class="links" :src="`${imgBaseUrl}yuan.png`"></image>
			<view class="item">
				<view>
					<image :src="`${imgBaseUrl}shangmen.png`"></image>
				</view>
				<view class="text">上门</view>
			</view>
			<image class="links" :src="`${imgBaseUrl}yuan.png`"></image>
			<view class="item">
				<view>
					<image :src="`${imgBaseUrl}wangong.png`"></image>
				</view>
				<view class="text">完工</view>
			</view>
			<image class="links" :src="`${imgBaseUrl}yuan.png`"></image>
			<view class="item">
				<view>
					<image :src="`${imgBaseUrl}yanshou.png`"></image>
				</view>
				<view class="text">验收</view>
			</view>
			<image class="links" :src="`${imgBaseUrl}yuan.png`"></image>
			<view class="item">
				<view>
					<image :src="`${imgBaseUrl}fukuan.png`"></image>
				</view>
				<view class="text">付款</view>
			</view>
		</view>

		<view class="xieyi">
			<image @tap="setReadState" v-if="!readState" :src="`${imgBaseUrl}yiyueduweiyuanzhong.png`"></image>
			<image @tap="setReadState" v-else :src="`${imgBaseUrl}xuanzhong.png`"></image>
			<text @tap="setReadState" class="spacing">已阅读并同意</text>
			<text @tap="userProtocol">《一号师傅用户协议》</text>
		</view>

		<navigator :url="`../confirmOrderForm/confirmOrderForm?olId=${olId}`">
			<view class="btn">确认订单完成</view>
		</navigator>

	</view>
</template>

<script>
	import banner from "@/components/banner.vue";
	import {
		getBannerEntity
	} from "../../api/other.js";
	import {
		showOrderlistEntity
	} from "../../api/orderList.js";
	export default {
		onLoad(e) {
			this.olId = e.olId;
			this.getBanner();
			this.getInfo();
		},
		components: {
			banner
		},
		data() {
			return {
				imgBaseUrl: this.$constants.imgBaseUrl,
				readState: false,
				bannerList: [],
				info: {},
				olId: 0,
				httpImgUrl:this.$constants.httpImgUrl
			}
		},
		methods: {

			setReadState() {

				this.readState = !this.readState;
			},
			getBanner() {

				getBannerEntity({
					sort: this.$constants.bannerType.createOrder
				}).then(res => {
					this.bannerList = res;
				})
			},
			getInfo() {

				showOrderlistEntity({
					olId: this.olId
				}).then(res => {
					this.info = res;
					if (this.info.orderPUrl != '') {
						this.info.orderPUrl = JSON.parse(this.info.orderPUrl);
					}
				})
			},
			userProtocol() {
				uni.navigateTo({
					url: "../userProtocol/userProtocol"
				})
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
	@import "../../static/scss/confirmOrder.scss";
</style>
