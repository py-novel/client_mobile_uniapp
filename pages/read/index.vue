<template>
	<view class="height-100vh flex-column">
		<uni-nav-bar leftIcon="back" :title="chapterTitle" :statusBar="true" @clickLeft="goHomePage"></uni-nav-bar>
		
		<scroll-view class="box-sizing-border padding-30" 
			style="height: calc(100vh - 180rpx);"
			scroll-y="true" :scroll-top="scrollTop"
			@scroll="scroll">	
			<text class="font-size-16 color-333">{{ chapterContent }}</text>
		</scroll-view>
		
		<view class="flex-row font-size-12 color-666" 
			style="height: 100rpx;line-height: 100rpx;border-top: 1px solid #e5e5e5;">
			<view class="flex-1 align-center" @click="findChapter(prevChapterUrl)">上一章</view>
			<view class="flex-1 align-center" @click="showChapterDrawer">目录</view>
			<view class="flex-1 align-center" @click="findChapter(nextChapterUrl)">下一章</view>
		</view>
		
		<uni-drawer ref="chapterDrawer" :width="300">
			<a-chapter-list
				:bookName="bookName"
				:bookUrl="bookUrl"
				:chapterUrl="chapterUrl"
				@click="clickChapter"
			></a-chapter-list>
		</uni-drawer>
	</view>
</template>

<script>
import request from '../../utils/request.js'
	
export default {
	data() {
		return {
			bookUrl: '',
			chapterUrl: '',
			authorName: '',
			bookName: '',
			chapterTitle: '',
			chapterContent: '',
			prevChapterUrl: null,
			nextChapterUrl: null,
			scrollTop: 1,		// 设置竖向滚动条位置
		}
	},
	onLoad(options) {
		const chapterUrl = options.chapterUrl || ''
		const authorName = options.authorName || ''
		const bookName = options.bookName || ''
		if (!chapterUrl || !authorName || !bookName) {
			uni.reLaunch({
				url: '../home/index'
			})
		}
		this.bookUrl = chapterUrl.substring(0, chapterUrl.lastIndexOf('/'))
		this.chapterUrl = chapterUrl
		this.authorName = authorName
		this.bookName = bookName
		this.findChapter(chapterUrl)
	},
	methods: {
		goHomePage() {
			uni.reLaunch({
				url: '../home/index'
			})
		},
		
		/* 监听滚动位置 */
		scroll(e){
			this.scrollTop = e.detail.scrollTop
		},
		
		/* 显示章节抽屉 */
		showChapterDrawer() {
			this.$refs.chapterDrawer.open()
		},
		
		/* 选择章节，然后关闭抽屉 */
		async clickChapter(chapter) {
			await this.findChapter(chapter.chapterUrl)
			this.$refs.chapterDrawer.close()
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
			this.scrollTop = 1
			
			// 更新缓存中最新章节
			const authorName = this.authorName
			const bookName = this.bookName
			let shelfList = uni.getStorageSync('shelfList') || []
			shelfList = shelfList.map(item => {
				if (item.authorName === authorName && item.bookName === bookName) {
					item.recentChapterUrl = chapterUrl
				}
				return item
			})
			uni.setStorageSync('shelfList', shelfList)
		},
	},
}
</script>

<style>
</style>
