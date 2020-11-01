<template>
	<view class="flex-column height-100vh">
		<uni-nav-bar title="公羊阅读" :statusBar="true"></uni-nav-bar>
		
		<view class="padding-30 flex-row justify-content-between">
			<view class="flex-row align-items-center">
				我的书架
				<template v-if="shelfList.length">
					<uni-icons v-if="editable === false"
						type="trash" 
						style="margin-left: 30rpx;"
						@click="changeEditable(true)"></uni-icons>
					<uni-icons v-else 
						type="undo" 
						style="margin-left: 30rpx;"
						@click="changeEditable(false)"></uni-icons>
				</template>
			</view>
			<uni-icons type="search" @click="goSearchPage"></uni-icons>
		</view>
		
		<view class="flex-1 flex-row flex-wrap align-content-start box-sizing-border padding-30 overflow-auto"
			v-if="shelfList.length" style="margin-top: -30rpx;">
			<view class="box-sizing-border" 
				style="width: 50%;padding: 30rpx 40rpx;"
				v-for="(novel, index) in shelfList" :key="index">
				<a-novel-item
					:bookName="novel.bookName"
					:authorName="novel.authorName"
					:editable="novel.editable"
					@click="goReadPage(novel)"
					@remove="removeShelf(novel)"
				></a-novel-item>
			</view>
		</view>
		
		<a-empty v-else text="书架里还没有书本~"></a-empty>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import { showConfirmModal } from '../../utils/uniapi.js'
	
	export default {
		data() {
			return {
				shelfList: [],					// 小说书架列表
				editable: false,				// 是否处于编辑状态
			}
		},
		onLoad() {
			const shelfList = uni.getStorageSync('shelfList') || []
			this.shelfList = shelfList
		},
		methods: {
			goReadPage(novel) {
				uni.navigateTo({
					url: '../read/index?chapterUrl=' + novel.recentChapterUrl
				})
			},
			
			goSearchPage() {
				uni.navigateTo({
					url: '../search/index'
				})
			},
			
			changeEditable(editable) {
				this.editable = editable
				this.shelfList = this.shelfList.map(item => {
					item.editable = editable
					return item
				})
			},
			
			async removeShelf(novel) {
				const confirm = await showConfirmModal(`确认删除[${novel.bookName}]吗？`)
				if (!confirm) return
				const shelfList = this.shelfList.filter(item => {
					return !(item.authorName === novel.authorName && item.bookName === novel.bookName)
				})
				this.shelfList = shelfList
				uni.setStorageSync('shelfList', shelfList)
			},
		},
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	
	.shelf_header {
		display: flex;
		
		.shelf_header-avatar {
			width: 60rpx;
		}
		.shelf_header-nickname {
			flex: 1;
		}
		.shelf_header-btn {
			width: 60rpx;
		}
	}
</style>
