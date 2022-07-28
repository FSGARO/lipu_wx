//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		motto: 'Hello World',
		userInfo: wx.getStorageSync('userInfo') || {},
		avatarUrl: ''
	},
	onLoad: function (query) {
		console.log('querywwwwwwwwwwwwwwwwwww===>', query)
		wx.getUserInfo({
			success: res => {
				console.log('获取个人信息')
				console.log(res)
			}
		})
	},
	onChooseAvatar(e) {
		// const { avatarUrl } = e.detail
		// this.setData({
		// 	avatarUrl
		// })
		wx.getUserProfile({
			desc: '获取用户头像和昵称',
			success: result => {
				let { userInfo } = result
				this.setData({
					userInfo
				})
				wx.setStorageSync('userInfo', userInfo)
			},
			fail: e => {
				console.log(`获取信息失败`, e)
			}
		})
	}
})
