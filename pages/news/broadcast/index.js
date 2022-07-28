//index.js
//获取应用实例
const app = getApp()

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
    // previousMargin: '70px',   
    // nextMargin: '70px',  
    autoplay: false,
    interval: 5000,
    duration: 1000,
    scaleClass:false,
    controlModel: false

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // var animation = wx.createAnimation();
    // animation.s.step({
    //   duration: 0
    // })
    // self.setData({
    //   'animation': animation0.export()
    // })
  },
  getUserInfo: function(e) {
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
      fail: (res) => {
      },
      complete: (res) => {
      }
    })
  },
  goMsglist:function(e){
    wx.navigateTo({
      url: "./center/index"
    });
  },
  addScale:function(){
    console.log("触摸开始")
    this.setData({
      scaleClass:true
    });
  },
  moveScale:function(){
    console.log("触摸结束")
    this.setData({
      scaleClass: false
    });

  
  },
  addTap:function(){
    this.setData({
      scaleClass: true
    });
  },
  batchControl: function () {
    this.setData({
      controlModel: !this.data.controlModel,
    });
  },
 
})
