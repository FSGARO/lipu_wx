//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')
let getLessonTimeID = ''
let getReserveID = ''
Page({
	data: {
		date: '',
		week: '',
		dateTemp: '',
		lessonTimeList: [],
		classroomId: [],
		todayLesson: [],
		classroomaddress: '',
		reserveEntity: {}
	},
	myMake: function () {
		wx.navigateTo({
			url: `/pages/index/appointmentInfo/makeappoint/index?classroomId=${this.data.classroomId}&dates=${this.data.date}&classroomaddress=${this.data.classroomaddress}`
		})
	},
	onLoad: async function (ids) {
		this.listenMsg()
		let lessonTimeList = wx.getStorageSync('lessonTimeList') || ''
		const { classroomId, classroomaddress } = ids
		// 获取课时
		if (lessonTimeList.length <= 0) {
			this.getLessonTime()
		} else {
			this.setData({ lessonTimeList })
		}
		let currentDate = util.currentDate()
		// 获取当天预约信息
		// let { weekLessons } = await
		this.getReserve(classroomId, currentDate[0])
		this.setData({
			date: currentDate[0],
			week: currentDate[1],
			classroomId,
			classroomaddress
			// todayLesson: weekLessons
		})
	},
	listenMsg: function () {
		app.globalData.SocketTask.onMessage(res => {
			let _res = JSON.parse(res.data)
			if (_res.payload.code == 'success') {
				if (_res.msgid == getLessonTimeID) {
					let { data } = _res.payload
					util.storageHelper.set('lessonTimeList', data)
					this.setData({ lessonTimeList: data })
					app.globalData.requestId = getLessonTimeID
				} else if (_res.msgid == getReserveID) {
					let arr = _res.payload.data.weekLessons || []
					console.log(`build up ----- arr`, arr)
					console.log(`build up ----- arr`, typeof arr)
					let { lessonTimeList } = this.data || []
					console.log(`build up ----- lessonTimeList`, lessonTimeList)
					let date = this.data.dateTemp
					console.log(`build up ----- date`, date)
					let list = []
					if (arr) {
						list = arr.map((e, i) => {
							let a = {}
							a.text = e
							if (e) {
								a.isValue = true
							} else if (new Date() - new Date(date + ' ' + lessonTimeList[i].startTime) > 0) {
								a.isOverdue = true
							}
							return a
						})
						this.setData({ todayLesson: list })
					}
				}
			}
		})
	},
	//获取课时列表
	getLessonTime: async function () {
		app.globalData.requestId = app.globalData.requestId + 1
		getLessonTimeID = app.globalData.requestId
		const requests = {
			msgname: 'http_request',
			msgid: getLessonTimeID,
			payload: {
				method: 'GET',
				path: `/app/v2/reserve/getPlanTimeList`
			}
		}
		app.globalData.SocketTask.send({
			data: JSON.stringify(requests)
		})
	},
	// 获取预约
	getReserve: function (courseInfoId, date) {
		this.setData({ dateTemp: date })
		app.globalData.requestId = app.globalData.requestId + 1
		getReserveID = app.globalData.requestId
		const requests = {
			msgname: 'http_request',
			msgid: getReserveID,
			payload: {
				method: 'GET',
				path: `app/v2/reserve/getReserveInfoByDate/${courseInfoId}/${date}`
			}
		}
		console.log(`build up ----- requests`, requests)
		app.globalData.SocketTask.send({
			data: JSON.stringify(requests)
		})
	},
	bindDateChange: async function (e) {
		let selectDate = new Date(e.detail.value)
		this.setData({
			date: e.detail.value,
			week: util.isweek(selectDate.getDay())
		})
		console.log('选择日期', e.detail.value)
		// TODO 切换日期
		// let { weekLessons } = await
		this.getReserve(this.data.classroomId, e.detail.value)
		// this.setData({ todayLesson: weekLessons })
	},
	selectDate: function () {},
	// 添加预约
	addMake: function (event) {
		const { index } = event.currentTarget.dataset
		const reserveEntity = {
			courseInfoId: this.data.classroomId,
			planTimeId: this.data.lessonTimeList[index].id,
			startTime: this.data.date + ' ' + this.data.lessonTimeList[index].startTime,
			endTime: this.data.date + ' ' + this.data.lessonTimeList[index].endTime,
			classroomaddress: this.data.classroomaddress,
			type: 0
		}
		this.setData({ reserveEntity })
		wx.navigateTo({ url: '/pages/index/appointmentInfo/makeappoint/reservation/index' })
	}
})
