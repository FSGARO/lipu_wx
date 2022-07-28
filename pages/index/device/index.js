const util = require('../../../utils/util.js')
const app = getApp()
let attr = 1
let total = 0
let off = 0
let cnt = 10
let movedistance = 0
let index = ''
let deleteID_requestId = ''
let Control_requestId = ''

//index.js
var requestId = ''
let batchIdarr = []

Page({
	data: {
		shang: true,
		currentIndex: 0,
		radioCheck: false,
		radioBatch: false,
		// radioBatchid: [], // 已选设备
		// batchIdarr: [],
		controlModel: false,
		deviceList: [],
		scrollTop: 0,
		// 批量控制
		batchCheck: [
			{
				check: false,
				name: '总开关',
				method: 'power',
				icon: 'icon-weibiaoti--1'
			},
			{
				check: false,
				name: '灯光',
				method: 'light',
				icon: 'icon-typecar117'
			},
			{
				check: false,
				name: '投影机',
				method: 'projector',
				icon: 'icon-touyingyi1'
			},
			{
				check: false,
				name: '幕布',
				method: 'curtain',
				icon: 'icon-diannao-tianchong'
			}
		],
		headtop: ''
	},
	onLoad: function () {
		this.sendDevice(off, cnt)
		this.listinMsg()
		console.log('off, cnt', off, cnt)
	},
	onReady: function () {
		var that = this
		var query = wx.createSelectorQuery()
		query
			.select('#deviceTop')
			.boundingClientRect(function (rect) {
				that.setData({
					headtop: rect.height * 2 + 17
				})
			})
			.exec()
	},
	onShow: function () {},
	bindDownLoad: function () {
		var that = this
		if (that.data.deviceList.length < total) {
			off++
			that.sendDevice(off, cnt)
			console.log(`build up ----- off, cnt`, off, cnt)
		} else {
			wx.showToast({
				title: '已经到底了！',
				duration: 2000
			})
		}
	},
	// 发送websocket请求
	sendDevice: function (off, cnt) {
		app.globalData.requestId = app.globalData.requestId + 1
		requestId = app.globalData.requestId
		var request = {
			msgname: 'http_request',
			msgid: app.globalData.requestId,
			payload: {
				path: util.addr.getdevice,
				method: 'GET',
				args: {
					off: off,
					cnt: cnt
				}
			}
		}
		app.globalData.SocketTask.send({
			data: JSON.stringify(request)
		})
	},
	scroll: function (event) {
		this.setData({
			scrollTop: event.detail.scrollTop
		})
	},
	// 获取设备列表
	listinMsg: function () {
		let that = this
		app.globalData.SocketTask.onMessage(function (res) {
			var res = JSON.parse(res.data)
			console.log('res-----------------------------------', res)
			// console.log("获取信息 res====>",res)
			if (deleteID_requestId == res.msgid && res.payload.result.text == 'ok') {
				console.log('this.data.deviceList==+++++++++++=>', that.data.deviceList)
				that.data.deviceList.splice(index, 1)
				that.setData({
					deviceList: that.data.deviceList
				})
				that.slideAnimation(0, 300)
			} else if ('device_info_list' in res.payload) {
				console.log('getDevice==>', res)
				// 2022-2-23 修复
				// off++;
				total = res.payload.device_info_list.total
				let _deviceList = that.data.deviceList
				console.log('===============================================', _deviceList, res.payload.device_info_list.device_property_list)
				for (let item of res.payload.device_info_list.device_property_list) {
					item.check = false
					_deviceList.push(item)
				}

				that.allSort(_deviceList)
				//  let sort_deviceList = _deviceList.sort()
				//  let reverse_deviceList =_deviceList.reverse()
				// console.log(" sort_deviceList", sort_deviceList)
				console.log(' ---------------------------deviceList------------', _deviceList)
				// console.log(" reverse_deviceList", reverse_deviceList)
				that.setData({
					deviceList: _deviceList
				})
				console.log('this.data.deviceList==>', that.data.deviceList)
				wx.hideLoading()
			} else if (app.globalData.requestId == res.msgid) {
				// if(res.payload.result.text == 'ok'){
				//   wx.hideLoading()
				// }else{
				//   wx.showToast({
				//     title: '请求失败',
				//     duration: 1000
				//   })
				// }
			}
		})
	},
	allSort: function (arr) {
		arr.sort(function (a, b) {
			console.log('a b', a, b)
			return a.place.localeCompare(b.place, 'zh-CN')
		})
	},

	_allSort: function (arr) {
		arr.sort(function (a, b) {
			console.log('a b', a, b)
			return b.place.localeCompare(a.place, 'zh-CN')
		})
	},
	tasksort: function () {
		this.setData({
			shang: !this.data.shang
		})
		if (this.data.shang) {
			this.allSort(this.data.deviceList)
			this.setData({
				deviceList: this.data.deviceList
			})
		} else {
			this._allSort(this.data.deviceList)
			this.setData({
				deviceList: this.data.deviceList
			})
		}
	},

	// 去设备详情页
	goClassrom: function (e) {
		console.log('goClassrom e===>', e)
		var deviceId = e.currentTarget.dataset.deviceid
		var online = e.currentTarget.dataset.online
		var schoolName = e.currentTarget.dataset.school
		var groupName = ''
		if (e.currentTarget.dataset.ext_info.groupName) {
			groupName = e.currentTarget.dataset.ext_info.groupName
		}
		if (!online) {
			wx.showToast({
				title: '当前设备不在线',
				duration: 1500
			})
		} else {
			wx.navigateTo({
				url: `/pages/index/demo/demo?deviceId=${deviceId}&schoolName=${schoolName}&groupName=${groupName}`
			})
		}
	},

	// 序号全选
	theadRadio: function () {
		console.log('this.data.deviceList.length', this.data.deviceList.length)
		const radioCheck = this.data.radioCheck
		this.setData({
			radioCheck: !radioCheck
		})
		for (var i = 0; i < this.data.deviceList.length; i++) {
			// wo yihou hainengjiarenma shizheyangma  nizaiyayixiata jiuhaole
			if (this.data.deviceList[i].online) {
				const key = 'deviceList[' + i + '].check'
				console.log('key:')
				console.log(key)
				this.setData({
					[key]: !radioCheck
				})
			}
		}
		this.isRadiolength()
	},

	// 全选
	isRadiolength: function () {
		console.log('全选')
		let radioBatch = false
		var checkArr = []
		console.log(' radioBatch===>', this.data.radioBatch)
		console.log(' batchIdarr===>', batchIdarr)
		// console.log(" radioBatchid===>",this.data.radioBatchid)
		for (var i = 0; i < this.data.deviceList.length; i++) {
			if (this.data.deviceList[i].check) {
				radioBatch = true
				// checkArr.push(this.data.deviceList[i].id)
			}
			// if (batchIdarr.length <= 0) {
			//   radioBatch = false;
			// }
		}
		this.setData({
			radioBatch: radioBatch
			// radioBatchid: checkArr //已选设备的 id
		})
		// console.log(" radioBatchid===>",this.data.radioBatchid)
	},

	// 单选
	changeTheadradio: function (e) {
		let radioBatch = false
		console.log('e===>', e)
		let type = parseInt(e.currentTarget.dataset.type)
		let check = 'deviceList[' + type + '].check'
		let _id = e.currentTarget.dataset.id
		// if()
		// device_true.push()
		this.setData({
			[check]: !this.data.deviceList[type].check
		})
		// this.isRadiolength();
		for (var i = 0; i < this.data.deviceList.length; i++) {
			if (this.data.deviceList[i].check) {
				radioBatch = true
				// checkArr.push(this.data.deviceList[i].id)
			}
		}
		this.setData({
			radioBatch: radioBatch
			// radioBatchid: checkArr //已选设备的 id
		})
	},
	// 批量控制里面的开关
	changeBatch: function (e) {
		var method = e.currentTarget.dataset.method
		let attr = this.data.batchCheck[e.currentTarget.dataset.index].check ? 0 : 1
		// console.log(" radioBatchid ===>", this.data.radioBatchid)
		console.log('changeBatch e ====>', e)
		console.log('attr===>', attr)
		// this.controlDev(this.data.radioBatchid, method, attr);
		// for (let i = 0; i < this.data.radioBatchid.length; i++) {
		//   this.controlDev(this.data.radioBatchid.length[i], method, attr);
		// }
		const check = `batchCheck[${e.currentTarget.dataset.index}].check`
		console.log(' check===>', check)
		this.setData({
			[check]: !this.data.batchCheck[e.currentTarget.dataset.index].check
		})
	},

	// 控制开关的请求
	controlDev: function (id, method, attr) {
		wx.showLoading({
			title: '请求中'
		})
		var that = this
		app.globalData.requestId = app.globalData.requestId + 1
		Control_requestId = app.globalData.requestId
		var request = {
			msgname: 'http_request',
			msgid: app.globalData.requestId,
			payload: {
				path: util.addr.deviceControl,
				method: 'post',
				args: {
					id: 0,
					method,
					attr
				},
				data: {
					id: id
				}
			}
		}
		console.log('JSON.stringify(request)', JSON.stringify(request))
		app.globalData.SocketTask.send({
			data: JSON.stringify(request),
			success: function () {
				console.log('请求发送成功')
			}
		})
	},

	batchControl: function () {
		console.log('batchControl 批量控制 ')
		batchIdarr = []
		var that = this
		console.log('that.data.deviceList', that.data.deviceList)
		for (var i = 0; i < that.data.deviceList.length; i++) {
			if (that.data.deviceList[i].check) {
				let obj = {}
				obj.id = that.data.deviceList[i].id
				obj.place = that.data.deviceList[i].place
				batchIdarr.push(obj)
			}
		}
		// that.setData({
		//   controlModel: !that.data.controlModel,

		// });
		console.log('batchIdarr', batchIdarr)
		let _batchIdarr = JSON.stringify(batchIdarr)

		wx.navigateTo({
			// url: '/pages/index/demos/demo',
			url: `/pages/index/demos/demo?batchIdarr=${_batchIdarr}`
		})
	},

	goAdddevice: function () {
		wx.navigateTo({
			url: '/pages/auth/index'
		})
	},

	//  左移
	touchstartX(e) {
		this.setData({
			currentIndex: e.currentTarget.dataset.index
		})
		// 获取触摸X坐标
		this.recordX = e.touches[0].clientX
	},
	// 点击操作
	resetX() {
		this.slideAnimation(0, 300)
	},
	// 手指触摸后移动
	touchmoveX(e) {
		let currentX = e.touches[0].clientX
		movedistance = currentX - this.recordX // 获取移动距离
		this.slideAnimation(movedistance, 300)
	},
	// 手指触摸动作结束
	touchendX() {
		let recordX
		if (movedistance <= -50) {
			// 移动达到距离就动画显示全部操作项
			recordX = -160
		} else if (movedistance >= -50) {
			// 移动未达到距离即还原
			recordX = 0
		}
		this.slideAnimation(recordX, 300)
	},
	// 滑动动画
	slideAnimation(recordX, time) {
		let animation = wx.createAnimation({
			duration: time,
			timingFunction: 'ease'
		})
		animation.translate(recordX + 'rpx', 0).step()
		this.setData({
			animation: animation.export()
		})
	},

	// 删除当前任务
	deleteItem: function (e) {
		let that = this
		console.log('删除当前任务===>', e)
		let ID = e.currentTarget.dataset.deviceid
		index = e.currentTarget.dataset.index

		wx.showModal({
			title: '提示',
			content: '是否删除该条任务？',
			success(res) {
				if (res.confirm) {
					console.log('确定删除')
					that.taskID('DELETE', ID)
					deleteID_requestId = app.globalData.requestId
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},

	//  删除当前任务
	taskID: function (method, ID) {
		console.log(' deleteID:function(ID)')
		app.globalData.requestId = app.globalData.requestId + 1

		var request = {
			msgname: 'http_request',
			msgid: app.globalData.requestId,
			payload: {
				method: method,
				path: util.addr.getdevice,
				args: {
					id: ID
				}
			}
		}
		console.log('JSON.stringify(request)', JSON.stringify(request))
		app.globalData.SocketTask.send({
			data: JSON.stringify(request)
		})
	}
})
