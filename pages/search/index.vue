<template>
	<view class="container">
		<button type="default" @click="goIntroPage">跳转到详情页面</button>
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
			goIntroPage() {
				uni.navigateTo({
					url: '../intro/index'
				})
			},
			
			goClassifyPage() {
				uni.switchTab({
					url: '../classify/index'
				})
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
