//index.js
//获取应用实例
const app = getApp()
import { request } from '../../../../request/index'
let getLessonsID = ''
let getLessonTimeListID = ''
Page({
	data: {
		classroomId: '',
		dates: '',
		mon: 1,
		weed: {
			weed1: '',
			weedone: '',
			weed2: '',
			weedtwo: '',
			weed3: '',
			weedthree: '',
			weed4: '',
			weedfour: '',
			weed5: '',
			weedfive: ''
		},
		act: '',
		lessonTimeList: [],
		// btArr: [
		// 	[
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '08:05', time3: '08:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '09:00', time3: '09:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:00', time3: '10:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:55', time3: '11:40', yysucces: true },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '14:40', time3: '15:25', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '15:35', time3: '16:20', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '16:30', time3: '17:15', yysucces: false }
		// 	],
		// 	[
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '08:05', time3: '08:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '09:00', time3: '09:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:00', time3: '10:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:55', time3: '11:40', yysucces: true },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '14:40', time3: '15:25', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '15:35', time3: '16:20', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '16:30', time3: '17:15', yysucces: false }
		// 	],
		// 	[
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '08:05', time3: '08:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '09:00', time3: '09:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:00', time3: '10:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:55', time3: '11:40', yysucces: true },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '14:40', time3: '15:25', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '15:35', time3: '16:20', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '16:30', time3: '17:15', yysucces: false }
		// 	],
		// 	[
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '08:05', time3: '08:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '09:00', time3: '09:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:00', time3: '10:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:55', time3: '11:40', yysucces: true },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '14:40', time3: '15:25', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '15:35', time3: '16:20', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '16:30', time3: '17:15', yysucces: false }
		// 	],
		// 	[
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '08:05', time3: '08:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '09:00', time3: '09:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:00', time3: '10:45', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '10:55', time3: '11:40', yysucces: true },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '14:40', time3: '15:25', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '15:35', time3: '16:20', yysucces: false },
		// 		{ text: '可预约', check: true, time1: '2019-10-12', time2: '16:30', time3: '17:15', yysucces: false }
		// 	]
		// ],
		todayLesson: [],
		reserveEntity: {},
		classroomaddress: ''
	},
	onLoad: async function (params) {
		//获取当前周的教室id和时间
		this.listenMsg()
		const { classroomId, dates, classroomaddress } = params
		this.setData({
			classroomId,
			dates,
			classroomaddress
		})
		// 获取课程时间
		this.getLessonTimeList()
		// 获取一周课程
		this.getLessons()
		//获取当前时间
		let nowdate = new Date()
		let day = nowdate.getDay()
		this.timePt(day, nowdate)
		this.setData({
			mon: nowdate.getMonth() + 1
		})
		// this.changeTime()

		// this.checkTime(day);
	},
	listenMsg: function () {
		app.globalData.SocketTask.onMessage(res => {
			let _res = JSON.parse(res.data)
			if (_res.payload.code == 'success') {
				if (_res.msgid == getLessonsID) {
					let lessonTimeList = this.data.lessonTimeList
					let data = _res.payload.data
					let time = ''
					data = data.map((e, i) => {
						// 无语
						switch (i) {
							case 0:
								time = this.data.weedone
								break
							case 1:
								time = this.data.weedtwo
								break
							case 2:
								time = this.data.weedthree
								break
							case 3:
								time = this.data.weedfour
								break
							case 4:
								time = this.data.weedfive
								break
						}
						e.weekLessons = e.weekLessons.map((x, y) => {
							let o = {}
							console.log(new Date() - new Date(time + ' ' + lessonTimeList[y].startTime) > 0)
							if (x) {
								o.isValue = true
							} else if (new Date() - new Date(time + ' ' + lessonTimeList[y].startTime) > 0) {
								o.isOverdue = true
							}
							o.text = x
							o.date = time
							return o
						})
						return e
					})
					this.setData({
						todayLesson: data
					})
					app.globalData.requestId = getLessonsID
				} else if (_res.msgid == getLessonTimeListID) {
					console.log(`build up ----- _res.payload.data`, _res.payload.data)
					this.set({ lessonTimeList: _res.payload.data})
					app.globalData.requestId = getLessonTimeListID
				}
			}
		})
	},
	getLessonTimeList: async function () {
		let lessonTimeList = wx.getStorageSync('lessonTimeList') || []
		if (lessonTimeList.length > 0) {
			this.setData({ lessonTimeList })
		} else {
			app.globalData.requestId = app.globalData.requestId + 1
			getLessonTimeListID = app.globalData.requestId
			const requests = {
				msgname: 'http_request',
				msgid: getLessonTimeListID,
				payload: {
					method: 'GET',
					path: `app/v2/reserve/getPlanTimeList`
				}
			}
			app.globalData.SocketTask.send({
				data: JSON.stringify(requests)
			})
		}
	},
	getLessons: async function () {
		app.globalData.requestId = app.globalData.requestId + 1
		getLessonsID = app.globalData.requestId
		const requests = {
			msgname: 'http_request',
			msgid: getLessonsID,
			payload: {
				method: 'GET',
				path: `app/v2/reserve/getReserveInfo/${this.data.classroomId}/${this.data.dates}`
			}
		}
		app.globalData.SocketTask.send({
			data: JSON.stringify(requests)
		})
	},
	//可预约
	// make: function (e) {
	// 	var timestart = e.currentTarget.dataset.timestart
	// 	var timeend = e.currentTarget.dataset.timeend
	// 	wx.navigateTo({
	// 		url: '/pages/index/appointmentInfo/makeappoint/reservation/index?timestart=' + timestart + '&timeend=' + timeend
	// 	})
	// },
	myMake: function (event) {
		console.log(`build up ----- event`, event)
		const { index, time } = event.currentTarget.dataset
		console.log(`build up ----- time`, time)
		const reserveEntity = {
			courseInfoId: this.data.classroomId,
			planTimeId: this.data.lessonTimeList[index].id,
			startTime: time + ' ' + this.data.lessonTimeList[index].startTime,
			endTime: time + ' ' + this.data.lessonTimeList[index].endTime,
			classroomaddress: this.data.classroomaddress,
			type: 0
		}
		this.setData({ reserveEntity })
		wx.navigateTo({ url: '/pages/index/appointmentInfo/makeappoint/reservation/index' })
	},
	//设置时间函数
	getDateStr: function (dayCount, aa) {
		if (null == dayCount) {
			dayCount = 0
		}
		var dd = new Date(aa)
		dd.setDate(dd.getDate() + dayCount) //设置日期
		var d = dd.getDate()
		return d
	},
	getDatestr: function (dayCount, aa) {
		if (null == dayCount) {
			dayCount = 0
		}
		var dd = new Date(aa)
		dd.setDate(dd.getDate() + dayCount) //设置日期
		var y = dd.getFullYear()
		var m = dd.getMonth() + 1 //获取当前月份的日期
		var d = dd.getDate()
		var all = y + '-' + (m + '').padStart(2, '0') + '-' + (d + '').padStart(2, '0')
		return all
	},
	//时间判断函数
	timePt: function (day, selectime) {
		if (day == 0) {
			this.setData({
				act: 0,
				weed1: this.getDateStr(1, selectime),
				weedone: this.getDatestr(1, selectime),
				weed2: this.getDateStr(2, selectime),
				weedtwo: this.getDatestr(2, selectime),
				weed3: this.getDateStr(3, selectime),
				weedthree: this.getDatestr(3, selectime),
				weed4: this.getDateStr(4, selectime),
				weedfour: this.getDatestr(4, selectime),
				weed5: this.getDateStr(5, selectime),
				weedfive: this.getDatestr(5, selectime)
			})
		}
		if (day == 1) {
			this.setData({
				act: 1,
				weed1: selectime.getDate(),
				weedone: this.getDatestr(0, selectime),
				weed2: this.getDateStr(1, selectime),
				weedtwo: this.getDatestr(1, selectime),
				weed3: this.getDateStr(2, selectime),
				weedthree: this.getDatestr(2, selectime),
				weed4: this.getDateStr(3, selectime),
				weedfour: this.getDatestr(3, selectime),
				weed5: this.getDateStr(4, selectime),
				weedfive: this.getDatestr(4, selectime)
			})
		}
		if (day == 2) {
			this.setData({
				act: 2,
				weed2: selectime.getDate(),
				weedtwo: this.getDatestr(0, selectime),
				weed1: this.getDateStr(-1, selectime),
				weedone: this.getDatestr(-1, selectime),
				weed3: this.getDateStr(1, selectime),
				weedthree: this.getDatestr(1, selectime),
				weed4: this.getDateStr(2, selectime),
				weedfour: this.getDatestr(2, selectime),
				weed5: this.getDateStr(3, selectime),
				weedfive: this.getDatestr(3, selectime)
			})
		}
		if (day == 3) {
			this.setData({
				act: 3,
				weed3: selectime.getDate(),
				weedthree: this.getDatestr(0, selectime),
				weed1: this.getDateStr(-2, selectime),
				weedone: this.getDatestr(-2, selectime),
				weed2: this.getDateStr(-1, selectime),
				weedtwo: this.getDatestr(-1, selectime),
				weed4: this.getDateStr(1, selectime),
				weedfour: this.getDatestr(1, selectime),
				weed5: this.getDateStr(2, selectime),
				weedfive: this.getDatestr(2, selectime)
			})
		}
		if (day == 4) {
			this.setData({
				act: 4,
				weed4: selectime.getDate(),
				weedfour: this.getDatestr(0, selectime),
				weed1: this.getDateStr(-3, selectime),
				weedone: this.getDatestr(-3, selectime),
				weed2: this.getDateStr(-2, selectime),
				weedtwo: this.getDatestr(-2, selectime),
				weed3: this.getDateStr(-1, selectime),
				weedthree: this.getDatestr(-1, selectime),
				weed5: this.getDateStr(1, selectime),
				weedfive: this.getDatestr(1, selectime)
			})
		}
		if (day == 5) {
			this.setData({
				act: 5,
				weed5: selectime.getDate(),
				weedfive: this.getDatestr(0, selectime),
				weed1: this.getDateStr(-4, selectime),
				weedone: this.getDatestr(-4, selectime),
				weed2: this.getDateStr(-3, selectime),
				weedtwo: this.getDatestr(-3, selectime),
				weed3: this.getDateStr(-2, selectime),
				weedthree: this.getDatestr(-2, selectime),
				weed4: this.getDateStr(-1, selectime),
				weedfour: this.getDatestr(-1, selectime)
			})
		}
		if (day == 6) {
			this.setData({
				act: 6,
				weed1: this.getDateStr(2, selectime),
				weedone: this.getDatestr(2, selectime),
				weed2: this.getDateStr(3, selectime),
				weedtwo: this.getDatestr(3, selectime),
				weed3: this.getDateStr(4, selectime),
				weedthree: this.getDatestr(4, selectime),
				weed4: this.getDateStr(5, selectime),
				weedfour: this.getDatestr(5, selectime),
				weed5: this.getDateStr(6, selectime),
				weedfive: this.getDatestr(6, selectime)
			})
		}
	},
	//状态函数
	// 3-22注释
	// changeTime: function () {
	// 	let newDate = new Date()
	// 	let newDates = newDate.getTime()
	// 	for (var j = 0; j < this.data.btArr[0].length; j++) {
	// 		var ymd = 'btArr[0][' + j + '].time1'
	// 		this.setData({
	// 			[ymd]: this.data.weedone
	// 		})
	// 		var xzTime = this.data.btArr[0][j].time1 + ',' + this.data.btArr[0][j].time2
	// 		var xzTimes = new Date(xzTime.replace(/-/g, '/')).getTime()
	// 		var yuyue = this.data.btArr[0][j].yysucces
	// 		if (newDates > xzTimes) {
	// 			var el = 'btArr[0][' + j + '].check'
	// 			var zt = 'btArr[0][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '已过期'
	// 			})
	// 		} else if (yuyue == true) {
	// 			var el = 'btArr[0][' + j + '].check'
	// 			var zt = 'btArr[0][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '预约成功'
	// 			})
	// 		} else {
	// 			var el = 'btArr[0][' + j + '].check'
	// 			var zt = 'btArr[0][' + j + '].text'
	// 			this.setData({
	// 				[el]: true,
	// 				[zt]: '可预约'
	// 			})
	// 		}
	// 	}
	// 	for (var j = 0; j < this.data.btArr[1].length; j++) {
	// 		var ymd = 'btArr[1][' + j + '].time1'
	// 		this.setData({
	// 			[ymd]: this.data.weedtwo
	// 		})
	// 		var xzTime = this.data.btArr[1][j].time1 + ' ' + this.data.btArr[1][j].time2
	// 		var xzTimes = new Date(xzTime.replace(/-/g, '/')).getTime()
	// 		var yuyue = this.data.btArr[1][j].yysucces
	// 		if (newDates > xzTimes) {
	// 			var el = 'btArr[1][' + j + '].check'
	// 			var zt = 'btArr[1][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '已过期'
	// 			})
	// 		} else if (yuyue == true) {
	// 			var el = 'btArr[1][' + j + '].check'
	// 			var zt = 'btArr[1][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '预约成功'
	// 			})
	// 		} else {
	// 			var el = 'btArr[1][' + j + '].check'
	// 			var zt = 'btArr[1][' + j + '].text'
	// 			this.setData({
	// 				[el]: true,
	// 				[zt]: '可预约'
	// 			})
	// 		}
	// 	}
	// 	for (var j = 0; j < this.data.btArr[2].length; j++) {
	// 		var ymd = 'btArr[2][' + j + '].time1'
	// 		this.setData({
	// 			[ymd]: this.data.weedthree
	// 		})
	// 		var xzTime = this.data.btArr[2][j].time1 + ' ' + this.data.btArr[2][j].time2
	// 		var xzTimes = new Date(xzTime.replace(/-/g, '/')).getTime()
	// 		var yuyue = this.data.btArr[2][j].yysucces
	// 		if (newDates > xzTimes) {
	// 			var el = 'btArr[2][' + j + '].check'
	// 			var zt = 'btArr[2][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '已过期'
	// 			})
	// 		} else if (yuyue == true) {
	// 			var el = 'btArr[2][' + j + '].check'
	// 			var zt = 'btArr[2][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '预约成功'
	// 			})
	// 		} else {
	// 			var el = 'btArr[2][' + j + '].check'
	// 			var zt = 'btArr[2][' + j + '].text'
	// 			this.setData({
	// 				[el]: true,
	// 				[zt]: '可预约'
	// 			})
	// 		}
	// 	}
	// 	for (var j = 0; j < this.data.btArr[3].length; j++) {
	// 		var ymd = 'btArr[3][' + j + '].time1'
	// 		this.setData({
	// 			[ymd]: this.data.weedfour
	// 		})
	// 		var xzTime = this.data.btArr[3][j].time1 + ' ' + this.data.btArr[3][j].time2
	// 		var xzTimes = new Date(xzTime.replace(/-/g, '/')).getTime()
	// 		var yuyue = this.data.btArr[3][j].yysucces
	// 		if (newDates > xzTimes) {
	// 			var el = 'btArr[3][' + j + '].check'
	// 			var zt = 'btArr[3][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '已过期'
	// 			})
	// 		} else if (yuyue == true) {
	// 			var el = 'btArr[3][' + j + '].check'
	// 			var zt = 'btArr[3][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '预约成功'
	// 			})
	// 		} else {
	// 			var el = 'btArr[3][' + j + '].check'
	// 			var zt = 'btArr[3][' + j + '].text'
	// 			this.setData({
	// 				[el]: true,
	// 				[zt]: '可预约'
	// 			})
	// 		}
	// 	}
	// 	for (var j = 0; j < this.data.btArr[4].length; j++) {
	// 		var ymd = 'btArr[4][' + j + '].time1'
	// 		this.setData({
	// 			[ymd]: this.data.weedfive
	// 		})
	// 		var xzTime = this.data.btArr[4][j].time1 + ' ' + this.data.btArr[4][j].time2
	// 		var xzTimes = new Date(xzTime.replace(/-/g, '/')).getTime()
	// 		var yuyue = this.data.btArr[4][j].yysucces
	// 		if (newDates > xzTimes) {
	// 			var el = 'btArr[4][' + j + '].check'
	// 			var zt = 'btArr[4][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '已过期'
	// 			})
	// 		} else if (yuyue == true) {
	// 			var el = 'btArr[4][' + j + '].check'
	// 			var zt = 'btArr[4][' + j + '].text'
	// 			this.setData({
	// 				[el]: false,
	// 				[zt]: '预约成功'
	// 			})
	// 		} else {
	// 			var el = 'btArr[4][' + j + '].check'
	// 			var zt = 'btArr[4][' + j + '].text'
	// 			this.setData({
	// 				[el]: true,
	// 				[zt]: '可预约'
	// 			})
	// 		}
	// 	}
	// },
	//切换时间
	changemon: async function (e) {
		let selectime = new Date(e.detail.value)
		console.log(`build up ----- selectime`, selectime)
		let day = selectime.getDay()
		this.timePt(day, selectime)
		this.setData({
			mon: selectime.getMonth() + 1,
			year: selectime.getFullYear(),
			dates: selectime.getFullYear() + '-' + (selectime.getMonth() + 1 + '').padStart(2, '0') + '-' + (day + '').padStart(2, '0')
		})

		this.getLessons()
		// this.changeTime()
	}
})
