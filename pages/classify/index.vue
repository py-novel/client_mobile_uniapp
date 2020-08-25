<template>
	<view class="container">
		<button type="default" @click="goIntroPage">跳转到详情页面</button>
		<button type="default" @click="goSearchPage">跳转到搜索页面</button>
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
			
			goSearchPage() {
				uni.navigateTo({
					url: '../search/index'
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
