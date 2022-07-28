// import { addr } from '../utils/addr'

// 同时发送ajax的次数
let ajaxTimes = 0
export const request = params => {
	let header = { ...params.header }
	ajaxTimes++
	wx.showLoading({
		title: '加载中',
		mask: true
	})

	// 定义公共url
	const baseUrl = 'http://192.168.0.230/app/v2'
	// const baseUrl = 'https://wx.litpsmart.com/app/v2'
	return new Promise((resolve, reject) => {
		wx.request({
			...params,
			header,
			url: baseUrl + params.url,
			success: result => {
				resolve(result.data)
			},
			fail: err => {
				reject(err)
			},
			complete: () => {
				ajaxTimes--
				if (ajaxTimes == 0) wx.hideLoading()
			}
		})
	})
}
