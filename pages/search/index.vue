<template>
	<view class="flex-column height-100vh">
		<uni-nav-bar leftIcon="back" title="公羊阅读" :statusBar="true" @clickLeft="goHomePage"></uni-nav-bar>
		<uni-search-bar placeholder="输入作者名或小说名进行搜索" @confirm="listNovels" @cancel="novelList = []"/>
		
		<view class="flex-1 flex-row flex-wrap align-content-start box-sizing-border padding-30 overflow-auto" 
			v-if="novelList.length">
			<view class="box-sizing-border" 
				style="width: 50%;padding: 20rpx 40rpx;"
				v-for="(novel, index) in novelList" :key="index">
				<a-novel-item
					:bookName="novel.bookName"
					:authorName="novel.authorName"
					@click="goIntroPage(novel)"
				></a-novel-item>
			</view>
		</view>
		
		<view v-if="!novelList.length && historyList.length" class="padding-30">
			<view style="margin-bottom: 20rpx;">搜索历史</view>
			<view class="flex-row flex-wrap">
				<uni-tag v-for="(hist,index) in historyList" 
					:key="index" 
					:text="hist"
					@click="listNovels({ value: hist })"
					style="margin-right: 40rpx; margin-bottom: 20rpx;"></uni-tag>
			</view>
		</view>
		
		<a-empty v-if="!novelList.length && !historyList.length" text="输入关键词搜索小说吧~"></a-empty>
	</view>
</template>

<script>
import request from '../../utils/request.js'
import { showAlertModal } from '../../utils/uniapi.js'
	
export default {
	data() {
		return {
			historyList: [],			// 搜索历史记录列表
			novelList: [],				// 小说列表
		}
	},
	onLoad() {
		this.historyList = uni.getStorageSync('historyList') || []
	},
	methods: {
		goHomePage() {
			uni.reLaunch({
				url: '../home/index'
			})
		},
		
		goIntroPage(novel) {
			uni.navigateTo({
				url: '../intro/index?bookUrl=' + novel.bookUrl
			})
		},
		
		async listNovels({ value }) {
			const novelList = await request({
				url: '/novels?keyword=' + value,
				method: 'GET',
			})
			this.novelList = novelList || []
			if (novelList.length === 0) {
				await showAlertModal('没有找到小说~')
			} else {
				// 追加历史记录
				const historyList = uni.getStorageSync('historyList') || []
				const hist = historyList.find(item => item === value)
				if (!hist) historyList.unshift(value)
				this.historyList = historyList.slice(0,10)
				uni.setStorageSync('historyList', historyList.slice(0,10))
			}
		},
	},
}
</script>

<style>
</style>
