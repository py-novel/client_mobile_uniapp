<template>
	<view class="container">
		<view class="shelf_header">
			<view class="shelf_header-avatar">
				<uni-icons type="contact"></uni-icons>
			</view>
			<view class="shelf_header-nickname">
				{{greeting}}{{nickname}}
			</view>
			<view v-if="shelfList.length" class="shelf_header-btn">
				编辑
			</view>
		</view>
		
		<view v-if="shelfList.length">
			<button type="default" @click="goReadPage">跳转到阅读页面</button>
		</view>

		<view v-else>
			空空
			<button type="default" @click="goReadPage">跳转到阅读页面</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shelfList: [],					// 小说书架列表
				settingEnable: false,			// 是否编辑
				greeting: '',					// 问候语
				nickname: '大橙子',				// 昵称
				avatarUrl: '',					// 头像
			}
		},
		onLoad() {
			this.handleGreet()
		},
		methods: {
			handleGreet() {
				const hour = new Date().getHours()
				let greeting = ''
		
				if (hour < 6) { greeting = '凌晨好！' }
				else if (hour < 9) { greeting = '早上好！' }
				else if (hour < 12) { greeting = '上午好！' }
				else if (hour < 14) { greeting = '中午好！' }
				else if (hour < 17) { greeting = '下午好！' }
				else if (hour < 19) { greeting = '傍晚好！' }
				else if (hour < 22) { greeting = '晚上好！' }
				else { greeting = '夜里好！' }
				
				this.greeting = greeting
			},
			
			goReadPage() {
				uni.navigateTo({
					url: "../read/index"
				})
			},
			
			async listShelfs() {
				
			},
			
			async modifyUserInfo() {
				
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
