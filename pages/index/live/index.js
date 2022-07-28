//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')
Page({
  data: {
    radioCheck:false,
    stream:'',
    liveInfo:'',
    videoContext:'',
    LivePlayer:'',
    isFullScreen:false
  },
  onLoad: function (options) {
    console.log("options===>",options)
    let stream = options.stream
    var that=this;
    that.setData({
      stream: options.stream
    });
    that.getlive(stream)
    app.globalData.SocketTask.onMessage(function (res) {
      console.log("live直播页面收到信息");
      var res = JSON.parse(res.data);
      console.log(res)
      if (res.msgid == app.globalData.requestId && res.msgname == "result") {
        that.setData({
          liveInfo: res
        });
      }
      console.log("this.liveInfo===>",that.data.liveInfo)
    });

  },
  goClassrom:function(){
    wx.navigateTo({
      url: '/pages/index/classroom/index'
    });
  },
  theadRadio: function (){
    this.setData({
      radioCheck: !this.data.radioCheck
    })
  },
  statechange:function(e){
    console.log("播放状态变化事件");
    console.log(e);
    wx.showLoading({
      title: '加载中',
    })
    const code = e.detail.code;
    if (code == 2003){
      wx.hideLoading()
    }
  },
  bindnetstatus:function(e){
    console.log("网络状态通知");
    console.log(e)
  },
  getlive: function (stream){
    var that = this;
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getLiveurl,
        "method": "get",
        "args": {
          "stream": stream,
          // "internet": 1
        }
      }
    }
    // rtmp://47.107.158.188:10085/live/RWNSfWWAgoDNzTCXBGXwkL9p4Eo2BegR
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        wx.showLoading({
          title: '加载中',
        })
      }
    })
  },
  setFullscreen:function(e){
    console.log("设置全屏",e)
   
    this.LivePlayer = wx.createVideoContext('liveplayer');
  }
})
