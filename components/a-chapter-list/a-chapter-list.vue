<template>
	<view class="height-100vh flex-column">
		<uni-status-bar></uni-status-bar>
		<view class="padding-30">
			<view class="font-size-18 color-333" style="margin-bottom: 20rpx;">
				{{ bookName }}(共{{ total }}章)
			</view>
			<view class="flex-row justify-content-between font-size-14 color-666">
				<view class="flex-1 align-left">目录</view>
				<view class="flex-1 align-center" @click="isShowIndex = !isShowIndex">切换翻页</view>
				<view class="flex-1 align-right" v-if="isShowIndex === false" 
					@click="chapterList = chapterList.reverse()">排序</view>
			</view>
		</view>
		
		<view class="flex-1 scrollWrap">
			<scroll-view :style="{ height: scrollViewHeight }"
				v-if="chapterList.length && isShowIndex === false"
				scroll-y="true"
				:scroll-into-view="chapterId">
				<view v-for="(chapter,index) in chapterList" 
					:key="index"
					:id="chapter.id"
					class="padding-30 border-bottom font-size-14 color-666"
					@click="clickChapter(chapter)">
					{{ chapter.chapterName }}
				</view>
			</scroll-view>
		</view>
		
		<!-- <uni-list class="flex-1 overflow-auto" 
			v-if="chapterList.length && isShowIndex === false">
			<uni-list-item v-for="(chapter,index) in chapterList" 
				:key="index" 
				:title="chapter.chapterName"
				:showArrow="false"
				@click="clickChapter(chapter)"
			></uni-list-item>
		</uni-list> -->
		
		<uni-grid class="flex-1 overflow-auto" :column="3"
			v-if="indexList.length && isShowIndex === true">
			<uni-grid-item v-for="(item,index) in indexList" 
				:key="index" :square="false">
				<view class="height-100 flex-row justify-content-center align-items-center"
					@click="clickIndex(item)">
					{{ item.desc }}
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
import request from '../../utils/request.js'
	
export default {
	props: {
		bookUrl: {
			type: String,
			default: '',
		},
		bookName: {
			type: String,
			default: '',
		},
		clickable: {
			type: Boolean,
			default: true,
		},
		chapterUrl: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			total: 0,					// 总共多少章
			pageNo: 1,					// 第几页
			pageSize: 100,				// 一页多少章
			chapterList: [],			// 章节列表
			indexList: [],				// 大分页
			isShowIndex: false,			// 是否显示大分页
			scrollViewHeight: 0,		// 小分页高度
			chapterId: '',				// 小分页章节id 
		}
	},
	mounted() {
		this.listChapters()
		this.getScrollViewHeight()
	},
	methods: {
		/* 点击大分页，分页查询 */
		async clickIndex(index) {
			this.pageNo = index.id
			await this.listChapters()
			this.isShowIndex = false
		},
		
		/* 获取小分页 scroll-view 高度 */
		getScrollViewHeight(){
			const query = uni.createSelectorQuery()
			query.select('.scrollWrap').boundingClientRect(rect => {
				this.scrollViewHeight = rect.height + 'px'
			}).exec()
		},
		
		clickChapter(chapter) {
			if (!this.clickable) return
			this.$emit('click', chapter)
		},
		
		async listChapters() {
			let params = 'url=' + this.bookUrl
			params += '&pageNo=' + this.pageNo
			params += '&pageSize=' + this.pageSize
			const result = await request({
				url: '/chapters?' + params,
				method: 'GET'
			})
			const chapterList = result.data
			const total = result.total			// 1679
			const pageNo = result.pageNo		// 1
			const pageSize = result.pageSize	// 100
			
			// 处理大分页
			const indexList = []
			if (total < pageSize) {
				indexList.push({
					id: 1,
					start: 0,
					end: Number(total) - 1,
					desc: `1 - ${total}`
				})
			} else {
				const integer = Math.floor(total / pageSize)        	// 整数部分
				const remainder = total % pageSize              		// 小数部分
				
				for (let i = 0; i <= integer; i++) {
					const obj = Object.create(null)
					obj.id = String(i + 1)
					obj.start = i * pageSize
					
					if (integer === 0) {   // 只有一页，0 - 88
						obj.end = remainder - 1
					} else if (i === integer) {  // 最后一页
						obj.end = i * pageSize + remainder - 1
					} else {
						obj.end = (i + 1) * pageSize - 1
					}
					
					obj.desc = `${obj.start + 1} - ${obj.end + 1}`
					indexList.push(obj)
				}
			}
			
			// 找当前章节的 id
			const chapterUrl = this.chapterUrl
			const chapter = chapterList.find(item => item.chapterUrl == chapterUrl)
			if (chapter) this.chapterId = chapter.id
			console.log('chapterId', this.chapterId)
			
			this.total = total
			this.chapterList = chapterList
			this.indexList = indexList
			console.log('result', result)
		},
	}
}
</script>

<style>
</style>
