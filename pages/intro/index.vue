<template>
	<view class="flex-column height-100vh">
		<uni-nav-bar leftIcon="back" title="公羊阅读" :statusBar="true" @clickLeft="goSearchPage"></uni-nav-bar>
	
		<template v-if="loading === false">
			<view class="flex-1 bg-color-efeff4">
				<view class="bg-color-fff padding-30 flex-row" style="margin-bottom: 20rpx;">
					<image :src="bookCoverUrl" class="radius-10" style="width: 30%;" mode="heightFix"></image>
					<view class="flex-1 padding-30 flex-column justify-content-between">
						<view class="font-size-22 color-333">{{ bookName }}</view>
						<view class="align-right font-size-14 color-666">作者:{{ authorName }}</view>
					</view>
				</view>
				
				<view class="bg-color-fff padding-30 font-size-14 color-333 flex-row justify-content-between">
					<view class="">更新时间：{{ lastUpdateTime }}</view>
					<view class="">分类：{{ classifyName }}</view>
				</view>
				
				<view class="bg-color-fff padding-30" style="margin-top: 20rpx;">
					<view class="font-size-14 color-666">{{ bookIntro }}</view>
				</view>
			</view>
				
			<view class="flex-row align-items-center font-size-14" 
				style="height: 100rpx; line-height: 100rpx; box-shadow: 0 -1px 1px #e5e5e5;">
				<view class="flex-1 align-center color-666 height-100"
					@click="showChapterModal">查看目录</view>
				<view class="bg-color-e5e5e5" style="width: 1px; height: 100%;"></view>
				<view class="flex-1 align-center bg-color-e5e5e5 color-999 height-100"
					v-if="joined === true">已在书架</view>
				<view class="flex-1 align-center bg-color-6190e8 color-fff height-100"
					v-else @click="joinShelf">加入书架</view>
			</view>
			
			<uni-drawer ref="chapterDrawer" :width="300">
				<a-chapter-list
					:bookName="bookName"
					:bookUrl="bookUrl"
					:clickable="false"
				></a-chapter-list>
			</uni-drawer>
		</template>
	</view>
</template>

<script>
import request from '../../utils/request.js'
import { showConfirmModal } from '../../utils/uniapi.js'
	
export default {
	data() {
		return {
			bookUrl: '',
			joined: true,			// 书籍是否已添加到书架中，true已在书架，false不在书架
			loading: false,			// 是否在请求数据
			authorName: '',			// 作者名
			bookCoverUrl: 'https://novel.dkvirus.top/images/cover.png',		// 小说封面地址
			bookIntro: '',			// 小说简介
			bookName: '',			// 小说名
			classifyName: '',		// 分类名称
			firstChapterUrl: '',	// 第一章节url地址
			lastUpdateTime: '',		// 最后更新时间
		}
	},
	onLoad(options) {
		const bookUrl = options.bookUrl || ''
		if (!bookUrl) {
			uni.reLaunch({
				url: '../search/index'
			})
		}
		this.bookUrl = bookUrl
		this.findNovel()
	},
	methods: {
		goSearchPage() {
			uni.reLaunch({
				url: '../search/index'
			})
		},
		
		/* 将小说加入书架 */
		async joinShelf() {
			const authorName = this.authorName
			const bookName = this.bookName
			const recentChapterUrl = this.firstChapterUrl
			if (!authorName || !bookName || !recentChapterUrl) return
			
			const shelfList = uni.getStorageSync('shelfList') || []
			shelfList.push({ authorName, bookName, recentChapterUrl })
			uni.setStorageSync('shelfList', shelfList)
			const confirm = await showConfirmModal('添加成功，是否要跳转到我的书架！')
			if (confirm) uni.reLaunch({ url: '../home/index' })
			else this.joined = true
		},
		
		/* 查看目录 */
		showChapterModal() {
			this.$refs.chapterDrawer.open()
		},
		
		async findNovel() {
			const bookUrl = this.bookUrl
			this.loading = true
			const result = await request({
				url: '/novel?url=' + bookUrl,
				method: 'GET',
			})
			this.authorName = result.authorName
			this.bookCoverUrl = result.bookCoverUrl
			this.bookIntro = result.bookIntro
			this.bookName = result.bookName
			this.classifyName = result.classifyName
			this.firstChapterUrl = result.firstChapterUrl
			this.lastUpdateTime = result.lastUpdateTime
			
			// 判断是否已在书架
			const shelfList = uni.getStorageSync('shelfList') || []
			const shelf = shelfList.find(item =>
				item.authorName === result.authorName && item.bookName === result.bookName)
			if (!shelf) this.joined = false
			this.loading = false
		},
	},
}
</script>

<style>
</style>
