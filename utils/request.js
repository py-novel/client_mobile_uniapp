import { apiPrefix } from './config'
import { showToast, uniRequest } from './uniapi.js'

export default async function request(opt) {
	opt.url = apiPrefix + opt.url
	uni.showLoading({ title: '拼命加载中' })
	try {
		const result = await uniRequest(opt)
		uni.hideLoading()
		
		if (result.data.code === '0000') {
			return result.data.data
		} else {
			showToast(result.data.message)
			return Promise.reject(new Error(result.data.message || 'Error'))
		}
	} catch (e) {
		uni.hideLoading()
	}
}

