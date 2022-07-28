//index.js
//获取应用实例
const app = getApp()
import addr from '../../../utils/addr'
import { request } from '../../../request/index'
let classRoomListID = ''
Page({
	data: {
		classList: [],
		pageNo: 0,
		scrollTop: 0,
		pages: 0
	},
	onLoad: function () {
		this.listenMsg()
		this.getClassroomList()
	},
	listenMsg: function () {
		app.globalData.SocketTask.onMessage(res => {
			let _res = JSON.parse(res.data)
			if (_res.payload.code == 'success' && _res.msgid == classRoomListID) {
				console.log(`build up ----- _res.payload.data`, _res)
				let { records, pages } = _res.payload.data
				this.setData({ classList: [...this.data.classList, ...records], pages })
				app.globalData.requestId = classRoomListID
			}
		})
	},
	getClassroomList: async function () {
		classRoomListID = app.globalData.requestId + 1
		const requests = {
			msgname: 'http_request',
			msgid: classRoomListID,
			payload: {
				method: 'GET',
				path: `/app/v2/reserve/getClassroomList`,
				args: { pageNo: this.data.pageNo, pageSize: 10 }
			}
		}
		app.globalData.SocketTask.send({
			data: JSON.stringify(requests)
		})
	},
	goAppointmentInfo: function (event) {
		let classroomId = event.currentTarget.dataset.classroomid
		let classroomaddress = event.currentTarget.dataset.classroomaddress
		wx.navigateTo({
			url: `/pages/index/appointmentInfo/index?classroomId=${classroomId}&classroomaddress=${classroomaddress}`
		})
	},
	handleScroll: function (event) {
		// console.log(`build up ----- event`, event)
	},
	lower(e) {
		let { pages, pageNo } = this.data
		if (pages > pageNo) {
			this.setData({ pageNo: this.data.pageNo + 1 })
			this.getClassroomList()
		} else {
			wx.showToast({
				title: '已经全部加载完毕',
				icon: 'success',
				duration: 1500
			})
		}
	}
})
