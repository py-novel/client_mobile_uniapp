/**
 * 日期处理工具方法
 * @param {String} dateStr 日期字符串，也可以不写，表示当天
 */
export function formatDate(dateStr) {
	let d
	if (!dateStr) {
		d = new Date()
	} else {
		d = new Date(dateStr)
	}
    
    const year = String(d.getFullYear())
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hour = String(d.getHours()).padStart(2, '0')
    const minute = String(d.getMinutes()).padStart(2, '0')
    const second = String(d.getSeconds()).padStart(2, '0')
    const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const week = weeks[d.getDay()]
    const ymd = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const hms = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
    const ymdhms = `${ymd} ${hms}`
    return { year, month, day, week, hour, minute, second, ymd, hms, ymdhms }
}

/**
 * 数组交集
 */
export function intersection (arr1, arr2) {
    return arr1.filter(function (val) { return arr2.indexOf(val) > -1 })
}

/**
 * 获取 url 参数
 * 
 * url = "https://lingfutest.hc8888.top/ltingweb/?code=03144hGa1Cx9Mz0FStIa1s4smv444hGO&state=STATE"
 * getUrlParams(url)   =>   {code: "03144hGa1Cx9Mz0FStIa1s4smv444hGO", state: "STATE"}
 * 
 * url = "https://lingfutest.hc8888.top/ltingweb/"
 * getUrlParams(url)   =>    {}
 */
export function getUrlParams(url) {
	const hrefArr = url.split('?')
	if (hrefArr.length === 1) return {}
	const paramArr = hrefArr[1].split('&')
	const param = {}
	paramArr.forEach(item => {
		const itemArr = item.split('=')
		param[itemArr[0]] = itemArr[1]
	}) 
	return param
}
