<template>
	<view class="a-empty" :class="customClass">
		<image class="a-empty_img" :src="src"></image>
		<view class="a-empty_text">{{ text }}</view>
	</view>
</template>

<script>
/**
 * 空白页面
 * @description 常用于列表页没有数据时，展示空白页面
 * @property {String} text 提示文字
 * @property {String} src 图片路径 
 * @property {String} customClass 自定义类名
 * @example <a-empty></a-empty>
 */
export default {
	name: 'AEmpty',
	props: {
		text: {
			type: String,
			default: '没有数据',
		},
		src: {
			type: String,
			default: '../../static/empty.png',
		},
		customClass: {
			type: String,
			default: '',
		},
	},
}
</script>

<style scoped>
.a-empty {
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 30%;
}
.a-empty_img {
	width: 488rpx;
	height: 340rpx;
}
.a-empty_text {
	font-size: 12px;
	color: #999999;
	margin-top: 30rpx;
}
</style>
