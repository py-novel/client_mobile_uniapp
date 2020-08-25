<template>
	<view class="container">
		<button type="default" @click="goShelfPage">跳转到书架页面</button>
		<button type="default" @click="goReadPage">跳转到阅读页面</button>
		<button type="default" @click="goClassifyPage">跳转到分类页面</button>
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
			},
			
			goReadPage() {
				uni.navigateTo({
					url: '../read/index'
				})
			},
			
			goClassifyPage() {
				uni.navigateBack()
			},
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
