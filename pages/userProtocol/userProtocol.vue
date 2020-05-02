<template>
	<view class="container">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	import {
		getAgreementEntity
	} from "../../api/other.js";
	export default {
		onLoad(e) {
			if (e.type) {
				this.type = e.type;
			}
			this.bindData();
		},
		data() {
			return {
				content: "",
				type: "A"
			}
		},
		methods: {
			bindData() {

				getAgreementEntity({
					type: this.type
				}).then(res => {
					this.content = res.content;
				})
			}
		}
	}
</script>

<style>

</style>
