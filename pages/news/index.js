//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const tools = require("'../../../../utils/tools.js")
let centerRequestId = ''
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: "",
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    total: 0

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("时间戳", new Date(1603416316))
    if (app.globalData.userInfo) {
      console.log("app.globalData.userInfo===>", app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("this.data.canIUse===》", this.data.canIUse)
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
    };
    this.getMessageCount();
    this.listMsg();
  },
  // 监听信息
  listMsg: function () {
    app.globalData.SocketTask.onMessage(res => {
      console.log("获取未读消息成功 res==》", res)
      res = JSON.parse(res.data)
      console.log("获取未读消息成功 res==》", res)
      if (centerRequestId == res.msgid) {
        this.setData({
          total: res.payload.notice.total,
          userInfo:res.payload.notice.list
        })
      }

    })
  },
  // 存在的意义
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickScan: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path;
        that.setData({
          show: this.show
        })
      },
      fail: (res) => {},
      complete: (res) => {}
    })
  },
  goMsglist: function (e) {
    wx.navigateTo({
      url: "./center/index"
    });
  },
  service: function (e) {
    wx.navigateTo({
      url: "./service/index"
    });
  },
  goBroadcast: function () {
    console.log("广播")
    wx.navigateTo({
      url: "./broadcast/index"
    });
  },
  //设备消息
  device: function (e) {
    wx.navigateTo({
      url: './device/index',
    });
  },
  // 获取最新的未读消息个数
  getMessageCount: function () {
    var that = this;
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getMessage,
        "method": "get",
        "count": true
      }
    }
    console.log("JSON.stringify(request)==>", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        console.log(res)
      }
    })

  },


})