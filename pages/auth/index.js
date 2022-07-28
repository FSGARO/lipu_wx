//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
	data: {
		userInfo: {}
	},
	onLoad: function (options) {
		var dataparam = {
			token: app.globalData.identity.token
		}
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},

	// getDevicelist:function(){

	//   var data = {
	//     token: app.globalData.identity.token
	//   };
	//   util.Requests(util.addr.getDevicelist, data, "GET").then((data) => {
	//       util.storageHelper.set('devicelist', data.response);
	//       app.globalData.devicelist = data.response;
	//   }).catch((fail_message) => {
	//     console.log(fail_message);
	//   });
	// },

	bindDevice: function (url, data) {
		console.log(' bindDevice data===>', data)
		var that = this
		util.Requests(url, data, 'GET')
			.then(res => {
				console.log('添加学校22222222222222', res)
				if (res.status) {
					wx.navigateTo({
						url: '/pages/my/chooseschool/index'
					})
					wx.showToast({
						title: '学校添加成功！',
						icon: 'none',
						duration: 1500
					})
				} else if (!res.status) {
					if (res.response.errmsg == 'repeated binding') {
						wx.showToast({
							title: '已绑定这台设备！',
							icon: 'none',
							duration: 1000
						})
						// wx.navigateTo({
						//   url: '/pages/my/chooseschool/index'
						// });
						setTimeout(function () {
							wx.navigateTo({
								url: '/pages/my/chooseschool/index'
							})
						}, 1000)
					} else if (res.response.errmsg == 'timeout') {
						wx.showToast({
							title: '二维码超时',
							icon: 'none',
							duration: 1000
						})
						//   setTimeout(function() {
						//     wx.navigateTo({
						//       url: 'pages/my/chooseschool/index',
						//     })
						//  }, 1000);
					} else if (res.response.errmsg == 'database error') {
						wx.showToast({
							title: '数据库读取错误',
							icon: 'none',
							duration: 1000
						})
						setTimeout(function () {
							wx.navigateTo({
								url: 'pages/my/chooseschool/index'
							})
						}, 1000)
					}
				}
			})
			.catch(fail_message => {
				console.log(fail_message)
				wx.showToast({
					title: 'token无效 请重新进入小程序',
					icon: 'none',
					duration: 3000
				})
				setTimeout(function () {
					wx.switchTab({
						url: '/pages/index/index'
					})
				}, 2000)
			})
	},

	clickScan: function () {
		var that = this

		// 启动扫一扫
		//  that.globalData.haveOnline
		wx.scanCode({
			success: res => {
				console.log(' wx.scanCode.res====>', res)
				if ((res.errMsg = 'scanCode:ok')) {
					if (app.globalData.identity.token == '') {
						app.getToken().then(res => {
							var dataparam = {
								token: res
							}
							//  dataparam = JSON.stringify(dataparam)
							console.log('dataparam11111==>', dataparam)
							that.bindDevice(res.result, dataparam)
						})
					} else {
						console.log('扫一扫添加学校')
						var dataparam = {
							token: app.globalData.identity.token
						}
						// console.log("dataparam222222222==>",dataparam)
						that.bindDevice(res.result, dataparam)
					}
				}
			},
			fail: res => {},
			complete: res => {}
		})
	}
})
