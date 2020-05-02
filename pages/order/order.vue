<template>
	<view class="container">
		
		<view class="menu">

			<view class="content">

				<view class="item" @tap="switchNav(index)" v-for="(items,index) in title" :key="index">
					<view class="text" :class="currentTab==index?'text-active':''">{{items.name}}</view>
					<view v-if="currentTab==index" class="bottom"></view>
				</view>

			</view>

		</view>

		<view class="order">
			
			<swiper @change="switchTab" :current="currentTab" :style="{height:swiperHeight}">

				<swiper-item>

					<view @tap="orderInfo(items)" class="list" v-for="(items,index) in list[0].list" :key="index">
						<view class="item">
							<view class="item-1">
								<image :src="httpImgUrl+items.picture" mode=""></image>
								<view class="right">
									<view class="name">
										<text>{{items.serviceOne}}</text>
										<text>待接单</text>
									</view>
									<view class="time">服务时间：{{items.serviceTime}}</view>
									<view class="time">地址：{{items.province}}{{items.city}}{{items.orderAddress}}</view>
									<view class="time">距离：{{items.distance}}km</view>
								</view>
							</view>
							<view class="bottom">
								<view></view>
								<view class="bottom-right">
									<!-- <view class="close-btn" @tap.stop="cancel(items,index,'F')">取消</view> -->
									<view class="jiedan-btn" @tap.stop="updateState(items,index,'B')">接单</view>
								</view>
							</view>
						</view>
					</view>

				</swiper-item>


				<swiper-item>

					<view class="list" @tap="orderInfo(items)" style="height: 200upx;" v-for="(items,index) in list[1].list" :key="index">
						<view class="item">
							<view class="item-1">
								<image :src="httpImgUrl+items.picture" mode=""></image>
								<view class="right">
									<view class="name">
										<text>{{items.serviceOne}}</text>
										<text>已接单</text>
									</view>
									<view class="time">服务时间：{{items.serviceTime}}</view>
									<view class="time">地址：{{items.province}}{{items.city}}{{items.orderAddress}}</view>
									<view class="time">距离：{{items.distance}}km</view>
								</view>
							</view>
						</view>
					</view>

				</swiper-item>


				<swiper-item>

					<view class="list" @tap="orderInfo(items)" style="height: 200upx;" v-for="(items,index) in list[2].list" :key="index">
						<view class="item">
							<view class="item-1">
								<image :src="httpImgUrl+items.picture" mode=""></image>
								<view class="right">
									<view class="name">
										<text>{{items.serviceOne}}</text>
										<text>已支付</text>
									</view>
									<view class="time">服务时间：{{items.serviceTime}}</view>
									<view class="time">师傅：{{items.wid}}</view>
									<view class="address">
										<view class="area">地址：{{items.province}}{{items.city}}{{items.orderAddress}}</view>
										<view class="price">￥{{items.orderPrice}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</swiper-item>


				<swiper-item>

					<view class="list" @tap="orderInfo(items)" style="height: 200upx;" v-for="(items,index) in list[3].list" :key="index">
						<view class="item">
							<view class="item-1">
								<image :src="httpImgUrl+items.picture" mode=""></image>
								<view class="right">
									<view class="name">
										<text>{{items.serviceOne}}</text>
										<text>已完成</text>
									</view>
									<view class="time">服务时间：{{items.serviceTime}}</view>
									<view class="time">师傅：{{items.wid}}</view>
									<view class="address">
										<view class="area">地址：{{items.province}}{{items.city}}{{items.orderAddress}}</view>
										<view class="price">￥{{items.orderPrice}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</swiper-item>


				<swiper-item>

					<view class="list" @tap="orderInfo(items)" style="height: 200upx;" v-for="(items,index) in list[4].list" :key="index">
						<view class="item">
							<view class="item-1">
								<image :src="httpImgUrl+items.picture" mode=""></image>
								<view class="right">
									<view class="name">
										<text>{{items.serviceOne}}</text>
										<text>已取消</text>
									</view>
									<view class="time">服务时间：{{items.serviceTime}}</view>
									<view class="time">师傅：{{items.wid}}</view>
									<view class="address">
										<view class="area">地址：{{items.province}}{{items.city}}{{items.orderAddress}}</view>
										<view class="price">￥{{items.orderPrice}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</swiper-item>

			</swiper>

		</view>

		<navigator url="../wallet/wallet">
			<view class="btn">我的余额</view>
		</navigator>

	</view>
</template>

<script>
	import {
		getWorkerOrderlistEntityList,
		workerCancelOrderlistEntity
	} from "../../api/orderList.js";
	import {
		showWorkerEntity
	} from "../../api/userInfo.js"
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState(["token", "openId"])
		},
		onLoad() {

			if (this.openId && !this.token) {
				uni.redirectTo({
					url: "../apply/apply"
				})
				return false;
			}

			showWorkerEntity({
				wtoken: this.$functions.getToken()
			}).then(res => {
				if (res.state != 1) {
					uni.redirectTo({
						url: "../state/state"
					})
					return false;
				}else{
					this.bindData();
				}
			})
		},
		onShow() {
			/* if (this.token) {
				this.optType = "refresh";
				this.list[this.currentTab].page = 1;
				this.bindData();
			} */

		},
		onPullDownRefresh() {
			this.optType = "refresh";
			this.list[this.currentTab].page = 1;
			this.bindData();
		},
		onReachBottom() {
			this.optType = "load";
			if (this.list[this.currentTab].pageCount <= this.list[this.currentTab].page) {
				return false;
			}
			this.list[this.currentTab].page++;
			this.bindData();
		},
		data() {
			return {
				optType: "",
				currentTab: 0,
				swiperHeight: '100vh',
				httpImgUrl: this.$constants.httpImgUrl,
				title: [{
						name: "待接单",
						type: "A"
					},
					{
						name: "已接单",
						type: "B"
					},
					{
						name: "已支付",
						type: "C"
					},
					{
						name: "已完成",
						type: "D"
					},
					{
						name: "已取消",
						type: "F"
					}
				],
				list: [{
						list: [],
						page: 1,
						pageCount: 1
					},
					{
						list: [],
						page: 1,
						pageCount: 1
					},
					{
						list: [],
						page: 1,
						pageCount: 1
					},
					{
						list: [],
						page: 1,
						pageCount: 1
					},
					{
						list: [],
						page: 1,
						pageCount: 1
					}
				]

			}
		},
		methods: {

			bindData() {

				let param = {
					orderState: this.title[this.currentTab].type,
					PageNumber: this.list[this.currentTab].page,
					PageSize: this.$constants.pageSize,
					wtoken: this.token
				}

				getWorkerOrderlistEntityList(param).then(res => {
					
					res.list=res.list.map(item=>{
						if(Number(item.distance)!=0){
							item.distance=Number(item.distance).toFixed(2);
							
						}
						return item;
					})
					
					this.optType == "load" ? this.list[this.currentTab].list = [...this.list[this.currentTab].list, ...res.list] :
						this.list[this.currentTab].list = res.list;
					this.list[this.currentTab].pageCount = res.pageCount;
					this.setSwiperHeight();
					this.optType = "";
					this.$forceUpdate();

				})

			},

			switchTab(e) {
				this.switchNav(e.detail.current);
			},

			switchNav(idx) {

				if (idx == this.currentTab) {

					return false;

				}
				this.currentTab = idx;

				if (this.list[this.currentTab].list.length == 0) {
					this.bindData();
				} else {
					this.setSwiperHeight();
				}

			},

			setSwiperHeight() {

				let length = this.list[this.currentTab].list.length;
				let itemHeight = 220;
				if (this.currentTab == 0) {
					itemHeight = 310;
				}
				this.swiperHeight = `${uni.upx2px(length * itemHeight)}px`;

			},
			orderInfo(item) {

				let url = "../orderInfo/orderInfo";
				if (this.title[this.currentTab].type == "C") {
					url = "../confirmOrder/confirmOrder";
				}

				uni.navigateTo({
					url: `${url}?olId=${item.olId}`
				})

			},
			updateState(item, index, state) {

				let that = this;
				this.$functions.confirm("是否确定操作？", () => {
					workerCancelOrderlistEntity({
						olId: item.olId,
						state: state,
						wtoken: this.token
					}).then(res => {
						that.$functions.success("操作成功", () => {
							that.list[that.currentTab].list.splice(index, 1);
						});
					})
				})
			},

			cancel(item, index, state) {

				let that = this;
				this.$functions.confirm("是否确定操作？", () => {
					workerCancelOrderlistEntity({
						olId: item.olId,
						state: state,
						wtoken: this.token
					}).then(res => {
						that.$functions.success("操作成功", () => {
							that.list[that.currentTab].list.splice(index, 1);
						});
					})
				})
			}

		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/order.scss";
</style>
