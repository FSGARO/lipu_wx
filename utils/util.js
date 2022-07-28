import addr from './addr.js'
import tools from './tools.js'

const test = () => {
	console.log('test')
}

const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 当前时间
const currentDate = () => {
	var date = new Date()
	return [
		date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1 + '').padStart(2, '0') + '-' + (date.getDate() + '').padStart(2, '0'),
		isweek(date.getDay())
	]
}

function isweek(val) {
	if (val == 0) {
		return '日'
	} else if (val == 1) {
		return '一'
	} else if (val == 1) {
		return '一'
	} else if (val == 2) {
		return '二'
	} else if (val == 3) {
		return '三'
	} else if (val == 4) {
		return '四'
	} else if (val == 5) {
		return '五'
	} else if (val == 6) {
		return '六'
	}
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
const checkPhone = phone => {
	var re = /^(1[358][0-9]{9})$/
	if (re.test(phone)) {
		return true
	} else {
		return false
	}
}
var storageHelper = {
	get: function (key) {
		return new Promise(function (resolve, reject) {
			wx.getStorage({
				key: key,
				success: function (res) {
					resolve(res.data)
				},
				fail: function () {
					resolve('')
				}
			})
		})
	},
	set: function (key, val) {
		wx.setStorage({
			key: key,
			data: val
		})
	}
}

function Requests(url, data, method, success, fail) {
	console.log('data===', data)
	console.log('url===', url)
	console.log('统一请求函数')
	var cookies = wx.getStorageSync('cookies')
	// url = getApp().globalData.serviceUrl + url; 126*3   300
	var header = {
		Cookie: 'JSESSIONID=' + cookies,
		'Content-Type': 'application/x-www-form-urlencoded'
	}

	return new Promise((resolv, reject) => {
		wx.request({
			url: url,
			data: data,
			method: method,
			header: header,
			success: function (res) {
				console.log(url)
				console.log('data==>', data)
				console.log('接口返回', res)
				if (res.statusCode == 200) {
					if (res.data.code == '200') {
						resolv(res.data.data)
					} else if (res.data.code == 401) {
						console.log(' else if (res.data.code == 401 11111111111')
					} else if (res.data.code == '500') {
						wx.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500
						})
						setTimeout(function () {
							wx.hideToast()
						}, 2000)
					} else if (res.statusCode == '200') {
						resolv(res.data)
					} else if (res.data.status == false) {
						resolv(res.data)
					} else {
						wx.showModal({
							title: '提示',
							content: res.data.message
						})
					}
				} else if (res.statusCode == 401) {
					reject(401)
				} else {
					wx.showToast({
						title: '网络错误或服务器繁忙',
						icon: 'none',
						duration: 1500
					})
					setTimeout(function () {
						wx.hideToast()
					}, 2000)
				}
				return
			},
			fail: function (err) {
				console.log(err)
				reject('请求失败===》', err)
			}
		})
	})
}

function hideLoad() {
	wx.hideLoading()
	wx.showToast({
		title: '请求成功',
		icon: 'success',
		duration: 1000
	})
}

const getcurrentRouter = getcurrentRouter => {
	let pages = getCurrentPages()
	let currPage = null
	if (pages.length) {
		currPage = pages[pages.length - 1]
	}
	return currPage
}

const domInfo = dom => {
	console.log('哪一个dom')
	console.log(dom)
	var query = wx.createSelectorQuery()
	var that = this
	var dasdsadas = ''

	query
		.select(dom)
		.boundingClientRect(function (rect) {
			dasdsadas = rect
			return rect
		})
		.exec()

	console.log('获取页面dom')
	console.log(dasdsadas)
}

function formatDate(date) {
	var date = new Date(date)
	var YY = date.getFullYear() + '-'
	var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
	var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	return YY + MM + DD + ' ' + hh + mm + ss
}

module.exports = {
	formatDate,
	formatTime,
	Requests,
	addr,
	storageHelper,
	test,
	tools,
	hideLoad,
	getcurrentRouter,
	domInfo,
	currentDate,
	isweek
}
