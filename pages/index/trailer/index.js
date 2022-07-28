//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    radioCheck: false,
    videoimage: "block",
    coverBg: false,
    stopBg: true

  },
  //点击播放按钮，封面图片隐藏,播放视频
  bindplay: function (e) {
    this.setData({
      tab_image: "none"
    }),
      this.videoCtx.play()
  },
  startplay: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
    this.setData({
      coverBg: false,
      stopBg: false
    });
    this.videoCtx.play()
  },

  // onReady() {
  //   this.videoCtx = wx.createVideoContext('myVideo').requestFullScreen()
  //   // this.videoContext.requestFullScreen({ direction: 90 })
  // },
  onLoad: function () {
    wx.hideLoading()
  },
  onPlay: function () {
    console.log("onPlay")
  },
  //当暂停播放时触发
  onSuspend: function () {
    this.setData({
      coverBg: false,
      stopBg: true
    });
  },
  onStop: function () {
    this.videoCtx.pause()
    this.setData({
      stopBg: true
    });

  },
  onVideload: function (e) {
    console.log("onVideload")
    console.log(e)
  },
  onShow: function () {
    this.videoCtx = wx.createVideoContext('myVideo').requestFullScreen({ direction: 90 })
    // this.videoContext.requestFullScreen({ direction: 90 })
    this.setData({
      stopBg: false
    })
  },
  theadRadio: function () {
    this.setData({
      radioCheck: !this.data.radioCheck
    })
  },
  statechange: function (e) {
    console.log("播放状态变化事件");
    console.log(e)
    const code = e.detail.code;
    if (code == 2003) {
      wx.hideLoading()
    }
  },
  bindnetstatus: function (e) {
    console.log("网络状态通知");
    console.log(e)
  },
  onShareAppMessage: function (options) {
    var that = this;
    var shareObj = {
      title: "广州力扑  科技引领未来，让工作更高效，让教室更智能",
      path: '/pages/index/trailer/index',
      imageUrl: "../../../img/fengmian.jpg", //imgUrl是错误的写法
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          console.log("按钮转发成功")
        }
      },
      fail: function () {
        console.log("按钮转发失败")
        if (res.errMsg == 'shareAppMessage:fail cancel') {
        } else if (res.errMsg == 'shareAppMessage:fail') {
        }
      },
      complete: function () {

      }
    };
    if (options.from == 'button') {
      var eData = options.target.dataset;
      console.log(eData.name);     // shareBtn
      shareObj.path = '/pages/index/trailer/index';
    }
    return shareObj;
  },
  tel:function(){
    wx.makePhoneCall({
      phoneNumber: '4000-968-929' //电话号码
    })
  }


})