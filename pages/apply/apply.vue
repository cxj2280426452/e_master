<template>
	<view class="container">

		<view class="content">

			<view class="item">
				<view class="item-content">
					<view class="left">
						<text>店铺名称：</text>
						<text class="validate">*</text>
					</view>
					<input v-model="form.shopName" placeholder-class="input-placeholder" placeholder="请输入店铺名称" type="text" />
				</view>
			</view>

			<view class="item">
				<view class="item-content">
					<view class="left">
						<text>姓名：</text>
						<text class="validate">*</text>
					</view>
					<input v-model="form.fullName" placeholder-class="input-placeholder" placeholder="请输入姓名" type="text" />
				</view>
			</view>

			<view class="item">
				<view class="item-content">
					<view class="left">
						<text>电话：</text>
						<text class="validate">*</text>
					</view>
					<input v-model="form.mobile" placeholder-class="input-placeholder" placeholder="请输入电话" type="text" />
				</view>
			</view>

			<view class="item">
				<view class="item-content">
					<view class="left">
						<text>常用地址：</text>
						<text class="validate">*</text>
					</view>
					<input v-model="form.address" placeholder-class="input-placeholder" placeholder="请输入常用地址" type="text" />
				</view>
			</view>

			<view class="item">
				<view class="item-content">
					<view class="left">
						<text>身份证号：</text>
						<text class="validate">*</text>
					</view>
					<input v-model="form.idCard" placeholder-class="input-placeholder" placeholder="请输入身份证号" type="text" />
				</view>
			</view>

			<view class="item" style="height: 172upx;">
				<view class="item-content">
					<view class="left">
						<text>手持身份证照：</text>
						<text class="validate">*</text>
					</view>
					<scroll-view scroll-x="">
						<image v-for="(items,index) in form.identityPUrl" :key="index" :src="httpImgUrl+items.picture"></image>
					</scroll-view>
					<image @tap="uploads('identityPUrl')" class="uploads" src="../../static/img/other/tianjiatupian.png"></image>
				</view>
			</view>

			<view class="item" style="height: 172upx;">
				<view class="item-content">
					<view class="left">
						<text>个人照片：</text>
						<text class="validate">*</text>
					</view>
					<scroll-view scroll-x="">
						<image v-for="(items,index) in form.personalPUrl" :key="index" :src="httpImgUrl+items.picture"></image>
					</scroll-view>
					<image @tap="uploads('personalPUrl')" class="uploads" src="../../static/img/other/tianjiatupian.png"></image>
				</view>
			</view>

			<!-- <picker mode="selector" @change="bindPickerChange" :range="serviceType" range-key="soName">
				<view class=" item">
					<view class="item-content">
						<view class="left">
							<text>服务类型：</text>
							<text class="validate">*</text>
						</view>
						<input disabled="" placeholder-class="input-placeholder" :value="serviceTypeName" type="text" />
						<image class="left-icon" src="../../static/img/other/left.png"></image>
					</view>
				</view>
			</picker> -->

			<view class=" item" style="height: auto;padding-top: 20upx;padding-bottom: 20upx;">
				<view class="item-content" style="justify-content: flex-start;align-items: flex-start;">
					<view class="left">
						<text>服务类型：</text>
						<text class="validate">*</text>
					</view>
					<checkbox-group @change="checkboxChange">

						<view v-for="(items,index) in serviceType" :key="index">
							<label style="display: flex;align-items: center;">
								<view>
									<checkbox :value="items.soId" :checked="items.flag" color="#4380EF" style="transform:scale(0.7)" />
								</view>
								<view class="checkbox-text">
									{{items.soName}}
								</view>
							</label>
						</view>

					</checkbox-group>
				</view>
			</view>

		</view>

		<view class="submit-btn" @tap="validateAddress">提交申请</view>

	</view>
</template>

<script>
	import {
		getServiceOneEntity
	} from "../../api/serviceType.js";
	import {
		addWorkerEntity2
	} from "../../api/userInfo.js";
	import {
		validatePhone
	} from "../../utils/validate.js";
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		computed: {
			...mapState(["openId"])
		},
		onLoad() {

			this.bindData();
		},
		data() {
			return {
				httpImgUrl: this.$constants.httpImgUrl,
				form: {
					address: "",
					fullName: "",
					idCard: "",
					identityPUrl: [],
					mobile: "",
					serviceType: "",
					shopName: "",
					personalPUrl: []
				},
				serviceType: [],
				selectServiceTypeId: [],
				serviceTypeName: ""
			}
		},
		methods: {
			...mapMutations(["setToken", "setUid", "setOpenId"]),
			bindData() {

				getServiceOneEntity({}).then(res => {
					this.serviceType = res.map(items => {
						items.flag = false;
						return items;
					})
				})
			},
			uploads(fields) {

				this.$functions.selectImgs(1).then(res => {
					this.form[fields].push({
						picture: res[0]
					});
				})
			},
			bindPickerChange(e) {
				this.form.serviceType = this.serviceType[e.detail.value].soId;
				this.serviceTypeName = this.serviceType[e.detail.value].soName;
			},

			checkboxChange(e) {

				this.selectServiceTypeId = e.detail.value;
				console.log(this.selectServiceTypeId);
			},

			submit() {

				if (this.form.shopName == '') {
					this.$functions.error("请输入店铺名称");
					return false;
				}

				if (this.form.fullName == '') {
					this.$functions.error("请输入姓名");
					return false;
				}

				if (!validatePhone(this.form.mobile)) {
					this.$functions.error("手机号格式有误");
					return false;
				}

				if (this.form.idCard == '') {
					this.$functions.error("请填写身份证号");
					return false;
				}

				if (this.form.identityPUrl.length == 0) {
					this.$functions.error("请上传手持证件照");
					return false;
				}

				if (this.form.personalPUrl.length == 0) {
					this.$functions.error("请上传个人照片");
					return false;
				}
				
				this.form.serviceType=this.selectServiceTypeId.join(",");
				
				if (this.form.serviceType == '') {
					this.$functions.error("请选择服务类型");
					return false;
				}

				let param = this.$functions.serializeParam(this.form);
				param.personalPUrl = JSON.stringify(param.personalPUrl);
				param.identityPUrl = JSON.stringify(param.identityPUrl);
				param.openid = this.openId;
				
				let that = this;
				this.$functions.confirm("是否确定提交？", () => {
					addWorkerEntity2(param).then(res => {
						that.$functions.success("提交成功", () => {
							that.setUid(res.wid);
							that.setToken(res.wtoken);
							uni.redirectTo({
								url: "../state/state"
							})
						});
					})
				})


			},
			validateAddress() {

				this.$functions.changeLngLat(this.form.address).then(res => {

					this.form.province = res.province;
					this.form.city = res.city;
					this.form.latitude = res.lat;
					this.form.longitude = res.lng;
					this.submit();

				}).catch(res => {

				});
			}

		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/apply.scss";

	checkbox-group label {
		margin-top: 10upx;
		margin-bottom: 10upx;
	}

	.checkbox-text {
		font-size: 30rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #464646;

	}
</style>
