/**
 * 封装 uniapp 原生 api
 * 更易用
 */

/**
 * 提示框，1.5秒后自动消失
 * @param {String} title 提示框内文字
 * @param {Function} cb 1.5秒后执行函数，非必传 
 */
export function showToast(title, cb) {
	if (!title) return
	uni.showToast({
		title: title,
		icon: 'none',
	})
	if (typeof cb === 'function') {
		setTimeout(cb, 1500)
	}
}

/**
 * 确认框，有确定和取消两个按钮
 * @param {String} content 确认框内容
 * @return {Boolean} confirm 点击确定返回true，点击取消返回false
 */
export async function showConfirmModal(content) {
	if (!content) return
	const result = await uni.showModal({
		content: content,
		confirmText: "确定",
		confirmColor: "#333",
		cancelText: "取消",
		cancelColor: "#666666",
	})
	return result[1].confirm
}

/**
 * 弹出确认框，只有确定一个按钮
 * @param {Object} content 确认框内容
 * @return {Boolean} confirm 点击确定返回true
 */
export async function showAlertModal(content) {
	if (!content) return
	const result = await uni.showModal({
		content: content,
		showCancel: false,
		confirmText: '确定',
		confirmColor: '#333',
	})
	return result[1].confirm
}

/**
 * uni.request() 返回 Promise 对象默认是一个数组 [null, data]，
 * 且数组第一个数据为 null，第二个数据才是我们需要的数据 data，每次处理数据结构非常麻烦
 * uniRequest() 是对 uni.request() 一层封装，返回数据直接就是 data
 * @param {Object} opt uni.request() 方法接收的参数
 */
export async function uniRequest(opt) {
	return new Promise((resolve, reject) => {
		uni.request({
			...opt,
			timeout: 10000,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			},
		})
	})
}