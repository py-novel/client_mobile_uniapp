<template>
	<view class="container">
		<button type="default" @click="goShelfPage">返回首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		props: [],
		methods: {
			goShelfPage() {
				uni.reLaunch({
					url: '../shelf/index'
				})
			}
		},
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
