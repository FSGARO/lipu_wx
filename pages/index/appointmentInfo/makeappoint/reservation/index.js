//index.js
//获取应用实例
import WxValidate from '../../../../../utils/WxValidate.js'
const app = getApp()
let makeID = ''
Page({
	data: {
		reserveEntity: {},
		showView: true,
		form: {
			purpose: ''
		}
	},
	onLoad: function (options) {
		let page = getCurrentPages()
		let currentPage = page[page.length - 2]
		let { reserveEntity } = currentPage.data
		console.log(`build up ----- reserveEntity`, reserveEntity)
		this.setData({
			reserveEntity
		})
		this.listenMsg()
		// 初始化变量
		this.initValidate()
	},
	// onChangeShowState: function () {
	// 	this.setData({
	// 		showView: !that.data.showView
	// 	})
	// },

	//查看跳转
	chakan: function () {
		wx.redirectTo({
			url: `/pages/index/appointmentInfo/index?classroomId=${this.data.reserveEntity.courseInfoId}&classroomaddress=${this.data.reserveEntity.classroomaddress}`,
			success: result => {},
			fail: e => {
				console.log(`build up ----- e`, e)
			},
			complete: () => {}
		})
	},
	listenMsg: function () {
		app.globalData.SocketTask.onMessage(res => {
			let _res = JSON.parse(res.data)
			if (_res.payload.code == 'success' && _res.msgid == makeID) {
				this.showModal({
					msg: '提交成功'
				})
				this.setData({
					showView: !this.data.showView
				})
			} else {
				this.showModal({ msg: _res.payload.msg })
			}
			app.globalData.requestId = makeID
		})
	},
	//报错
	showModal(error) {
		wx.showModal({
			content: error.msg,
			showCancel: false
		})
	},
	//验证函数
	initValidate() {
		const rules = {
			purpose: {
				required: true,
				minlength: 1
			}
		}
		const messages = {
			purpose: {
				required: '请填写教室用途',
				minlength: '请输入正确的教室用途'
			}
		}
		// NOTE 验证并提示
		this.WxValidate = new WxValidate(rules, messages)
	},
	//调用验证函数
	formSubmit: async function (e) {
		console.log('form发生了submit事件，携带的数据为：', e.detail.value)
		const params = e.detail.value
		let nowtime = new Date()
		let xiantime = nowtime.getTime()
		let seltime = this.data.reserveEntity.startTime
		let dbtime = new Date(seltime)
		let duitime = dbtime.getTime()
		console.log(xiantime, duitime)
		//校验表单
		if (!this.WxValidate.checkForm(params)) {
			const error = this.WxValidate.errorList[0]
			this.showModal(error)
			return false
		} else if (xiantime > duitime) {
			this.showModal({
				msg: '已过期,不能预约'
			})
			return false
		}
		let reserveEntity = { ...this.data.reserveEntity, purpose: params.purpose }
		makeID = app.globalData.requestId + 1
		const requests = {
			msgname: 'http_request',
			msgid: makeID,
			payload: {
				method: 'POST',
				path: `app/v2/reserve/addReserveInfo`,
				data: reserveEntity
			}
		}
		console.log(`build up ----- requests`, requests)
		app.globalData.SocketTask.send({
			data: JSON.stringify(requests)
		})
	}
})
