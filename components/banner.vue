<template>
	<view class="container">

		<swiper class="swiper" :indicator-dots="true" :autoplay="true">
			<swiper-item v-for="(items,index) in list" :key="index">
				<image :src="httpImgUrl+items.imgurl"></image>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		name: "banner",
		data() {
			return {
				httpImgUrl: this.$constants.httpImgUrl
			};
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 750upx;
		height: 357upx;

		swiper-item {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
