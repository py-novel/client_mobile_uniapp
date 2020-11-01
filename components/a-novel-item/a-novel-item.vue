<template>
	<view class="position-relative"
		:class="{ 'animate-bounce-up': editable }">
		<image src="../../static/novel_cover.png" class="width-100" mode="widthFix" 
			@click="onClick"></image>
		<view class="position-absolute width-100 align-left font-size-14 color-fff box-sizing-border ellipsis-3" 
			style="padding: 0 20rpx 0 40rpx; top: 20%;">{{ bookName }}</view>
		<view class="position-absolute width-100 align-left font-size-10 color-fff box-sizing-border ellipsis-2" 
			style="padding: 0 20rpx 0 40rpx; bottom: 20%;">作者:{{ authorName }}</view>
		<image src="../../static/icon_close.png" 
			class="img-size-44 position-absolute"
			style="top: 0; right: 0;"
			v-if="editable === true"
			@click="onRemove"></image>
	</view>
</template>

<script>
	export default {
		name: 'ANovelItem',
		props: {
			bookName: {
				type: String,
				default: '',
			},
			authorName: {
				type: String,
				default: '',
			},
			editable: {
				type: Boolean,
				default: false,
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			},
			
			onRemove() {
				this.$emit('remove')
			},
		}
	}
</script>

<style>
</style>
