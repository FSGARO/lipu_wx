// pages/index/record/index.js
const app = getApp();
const util = require('../../../utils/util.js');
var dateTimePicker = require('../../../utils/dateTimePicker.js');
let ID = '';
let index = '';
let off = 0;
let cnt = 20;
let deleteRecord_requestId = '';
Page({

  /**
   * 页面的初始数据
   * 24   28
   * 29   35   5 
   */
  data: {
    record_list: [],
    isDelete: false,
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options===>", options)
    ID = options.detailId
    this.getRecord(off, cnt);
    this.listMsg()

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    console.log("dateTimeArray=====================================>", this.data.dateTimeArray)

    // obj =  obj.dateTimeArray
    const _obj = this.copyArr(obj.dateTimeArray)
    console.log(_obj)
    let N = 0
    for (let item of _obj) {

      for (let i = 0; i < item.length; i++) {
        let n = ''
        switch (N) {
          case 0:
            n = "年";
            break;
          case 1:
            n = "月";
            break;
          case 2:
            n = "日";
            break;
          case 3:
            n = "时";
            break;
          case 4:
            n = "分";
            break;
          case 5:
            n = "秒";
            break;
        }
        item[i] = item[i] + n

      }
      N++
    }
    console.log(_obj)

    console.log("dobj=====================================>", _obj)

    this.setData({
      dateTime: obj.dateTime,
      // dateTimeArray: obj.dateTimeArray,
      dateTimeArray: _obj,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

    console.log("dateTimeArray=====================================>", this.data.dateTimeArray)

  },
  getRecord: function (off, cnt) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "method": "GET",
        "path": util.addr.GetRecord,
        "args": {
          "id": ID,
          "off": off,
          "cnt": cnt
        }
      }
    }
    console.log("JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),

    })
  },
  // 删除数据
  deleteRecord: function (timestamp) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.requestId = app.globalData.requestId + 1;
    deleteRecord_requestId = app.globalData.requestId
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "method": "delete",
        "path": util.addr.GetRecord,
        "args": {
          "id": ID,
          timestamp
        }
      }
    }
    console.log("JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),

    })
  },
  // 数组的深拷贝
  copyArr: function (oldArr) {
    let newArr = [];
    newArr = JSON.parse(JSON.stringify(oldArr));
    return newArr;
  },
  listMsg: function () {
    app.globalData.SocketTask.onMessage(res => {
      var res = JSON.parse(res.data);
      console.log("res= listMsg===>", res)
      
      if(deleteRecord_requestId == res.msgid){
        if(res.payload.result.text == "ok"){
        console.log("记录删除失败")
          this.data.record_list = []
          console.log("this.data.record_list = []",this.data.record_list)
          this.getRecord(off, cnt)

        }else{
          wx.showToast({
            title: '删除失败',
            duration: 2000
          })
        }

      } else if ('record_info_list' in res.payload) {
        if (res.payload.record_info_list.total == 0) {
          wx.showToast({
            title: '暂无记录',
            duration: 2000
          })
        } else {
          if (res.payload.result.text == "ok" && res.payload.record_info_list.list.results != 'null') {
            let recordList = [];
            // this.data.record_list = res.payload.record_info_list.list;
            recordList = res.payload.record_info_list.list
            recordList.map(item => {
              item.isShow = false
              item.timestamp = util.formatDate(item.timestamp * 1000)
              item.timestamp = item.timestamp.split(" ");
              if (item.run_once) {
                item.runOnce = '手动执行'
              } else {
                item.runOnce = '定时触发'
              }

            })
            this.data.record_list = this.data.record_list.concat(recordList)
            this.setData({
              record_list: this.data.record_list,
              total: res.payload.record_info_list.total
            })
          }

        }

        console.log("record_list====>", this.data.record_list)

      }
    })
  },
  // 是否打开详情
  showXQ: function (e) {
    let current_index = e.currentTarget.dataset.index
    if (current_index === index) {
      console.log(current_index, index)
      this.data.record_list[current_index].isShow = !this.data.record_list[current_index].isShow
      console.log(this.data.record_list[current_index].isShow)
    } else {
      index = current_index
      for (let item of this.data.record_list) {
        item.isShow = false
      }
      this.data.record_list[current_index].isShow = !this.data.record_list[current_index].isShow
    }
    this.setData({
      record_list: this.data.record_list
    })
    console.log(" this.data.record_list", this.data.record_list)

  },
  cancel: function () {
    console.log("取消删除")
    this.setData({
      isDelete: false
    });
  },

  define: function () {
    console.log("确认删除删除")
    this.setData({
      isDelete: false
    });
    this.data.dateTime[2] =  Number(this.data.dateTime[2])+1;
    this.data.dateTime[1] =  Number(this.data.dateTime[1])+1;
    let timestamp = "20" + this.data.dateTime[0] + "-" +this.data.dateTime[1] + "-" +this.data.dateTime[2] + " " + this.data.dateTime[3] + ":" + this.data.dateTime[4] + ":" + this.data.dateTime[5]
    console.log("timestamp ", timestamp)
    timestamp = Date.parse(new Date(timestamp));
    timestamp = timestamp / 1000;
    console.log("timestamp ", timestamp)
    this.deleteRecord(timestamp)
  },
  allDelete: function () {
    this.deleteRecord()
  },

  changeDateTime(e) {
    console.log("changeDateTime(e)", e.detail.value)
    this.setData({
      dateTime: e.detail.value,
      isDelete: true
    });
  },
  lower: function (e) {
    if (this.data.record_list.length < this.data.total) {
      console.log("lower")
      off++
      this.getRecord(off, cnt);
    } else {
      wx.showToast({
        title: '已经到底了！',
        duration: 1000
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成 
   * 
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   * 可能因为长相自卑过 你变好看了呢 
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})