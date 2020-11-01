<template>
	<view class="height-100vh flex-column">
		<uni-nav-bar leftIcon="back" :title="chapterTitle" :statusBar="true" @clickLeft="goHomePage"></uni-nav-bar>
		<text class="flex-1 overflow-auto padding-30">{{ chapterContent }}</text>
		<view class="flex-row" style="height: 100rpx;line-height: 100rpx;">
			<view class="flex-1 align-center" @click="findChapter(prevChapterUrl)">上一章</view>
			<view class="flex-1 align-center" @click="findChapter(nextChapterUrl)">下一章</view>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request.js'
	
export default {
	data() {
		return {
			chapterTitle: '',
			chapterContent: '',
			prevChapterUrl: null,
			nextChapterUrl: null,
		}
	},
	onLoad(options) {
		const chapterUrl = options.chapterUrl || ''
		if (!chapterUrl) {
			uni.reLaunch({
				url: '../home/index'
			})
		}
		this.chapterUrl = chapterUrl
		this.findChapter(chapterUrl)
	},
	methods: {
		goHomePage() {
			uni.reLaunch({
				url: '../home/index'
			})
		},
		
		async findChapter(chapterUrl) {
			if (!chapterUrl) return
			const result = await request({
				url: '/chapter?url=' + chapterUrl,
				method: 'GET',
			})
			this.chapterTitle = result.chapterTitle
			this.chapterContent = result.chapterContent
			this.prevChapterUrl = result.prevChapterUrl
			this.nextChapterUrl = result.nextChapterUrl
		},
	},
}
</script>

<style>
</style>
