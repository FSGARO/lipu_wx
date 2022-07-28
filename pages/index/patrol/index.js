//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js');


let off = 0; // 页码
let cnt = 3 // 条数
let total = 0 //总数
let index_url = ''

Page({
  data: {
    task: '',
    tasklist: [],
    index: 0,
    LivePlayer: '',
    videoContext: '',
    url: 'rtmp://47.107.158.188:10085/hls/zhanting1',
    allScreen: false,
    scrollTop: -1,
    imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607336349740&di=408d3669e5cf50b65ca2e151046c1b06&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170526%2F26fe16ebbbbe441ebe6a12b5323091b0_th.jpg'
  },
  onShow: function () {},
  onLoad: function () {
    off = 0;
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwww off",off, this.data.tasklist)
    this.getTasklist(off,cnt);
    this.listinMsg();
  },
  // 监听返回的信息
  listinMsg: function () {
    let that = this;
    app.globalData.SocketTask.onMessage(function (res) {
      var res = JSON.parse(res.data);
      console.log("任务页面收到信息===》", res);
      if ("rtmp_info_list" in res.payload) {
        total = res.payload.rtmp_info_list.total
        var _list = that.data.tasklist
        let _tasklist = res.payload.rtmp_info_list.rtmp_property_list
        for (let item of _tasklist) {
          item.isFullScreen = false;
          item.rtmp_url = '';
          item.isBofang = false;
          _list.push(item);
        }
        that.setData({
          tasklist: _list
        });
        off++;
        console.log("this.tasklist===>", that.data.tasklist)
        wx.hideLoading()
      }else if("rtmp_url" in res.payload){
        if(res.payload.result.text == 'ok'){
          that.data.tasklist[index_url].rtmp_url = res.payload.rtmp_url.url
          that.data.tasklist[index_url].isBofang = true
          that.setData({
            tasklist:that.data.tasklist
          })
          wx.hideLoading()
        }else{
          wx.showToast({
            title: '加载失败',
            duration:1000
          })
        }

      }
    });
  },
  goLivedetails: function (e) {
    let stream = e.currentTarget.dataset.stream;
    let publishing = e.currentTarget.dataset.publishing;
    wx.navigateTo({
      url: '/pages/index/live/index?stream=' + stream
    });
  },
  statechange: function (e) {
    console.log("播放状态变化事件");
    console.log(e);
    wx.showLoading({
      title: '加载中',
    })
    const code = e.detail.code;
    if (code == 2003) {
      wx.hideLoading()
    }
  },
  getUrl:function(stream){
    var that = this;
    app.globalData.requestId = app.globalData.requestId + 1;

    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getLiveurl,
        "method": "get",
        "args": {
          "stream":stream,
          "internet": 1
        }
      }
    }
    console.log(" JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })
  },
  getTasklist: function (off, cnt) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    app.globalData.requestId = app.globalData.requestId + 1;

    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getLive,
        "method": "get",
        "args": {
          "off":off,
          "cnt":cnt
        }
      }
    }
    console.log(" JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })

  },
  handleTap: function () {

  },

  setFullscreen: function (e) {
    var query = wx.createSelectorQuery();
    query.select(".all").boundingClientRect((rect) => {
      console.log("rect===>", rect) //width等
    }).exec();

    this.data.allScreen = false
    console.log("设置全屏==>", e)
    let index = e.currentTarget.dataset.index
    let _isFullScreen = e.currentTarget.dataset.isfullscree
    console.log("isFullScreen==>", _isFullScreen)
    this.data.tasklist.filter(item => {
      item.isFullScreen = false
    })
    this.data.tasklist[index].isFullScreen = !_isFullScreen
    this.data.allScreen = !_isFullScreen
    this.setData({
      tasklist: this.data.tasklist,
      index: index * 100,
      allScreen: this.data.allScreen,
      scrollTop: this.data.scrollTop+0.01,
    })
console.log(" this.data.scrollTop",this.data.scrollTop)
    console.log(" this.data.tasklist===>", this.data.tasklist)
    console.log("index===>", index)
    console.log("this.data. allScreen===>",)
    this.LivePlayer = wx.createVideoContext('liveplayer');
    this.LivePlayer.requestFullScreen()
  },
  statechange: function (e) {
    console.log("播放状态变化事件");
    console.log(e);
    wx.showLoading({
      title: '加载中',
    })
    const code = e.detail.code;
    if (code == 2003) {
      wx.hideLoading()
    }
  },
bindscroll:function(e){
  // console.log("e===>",e)
  if( e.detail.scrollTop != 0){
    this.data.scrollTop = e.detail.scrollTop
  }
},
bindDownLoad: function () {  
  var that = this;  
  if(that.data.tasklist.length < total){
    that.getTasklist(off,cnt) 
  }else{
    wx.showToast({
      title: "已经到底了！",
      duration:2000,
      
    })
  }
},  
bofang:function(e){
  wx.showLoading({
    title: '加载中',
  })
  console.log("bofang===>",e)
  for( let item of this.data.tasklist){
    item.rtmp_url = '';
    item.isBofang = false
  }
   index_url = e.currentTarget.dataset.index;
  let stream = e.currentTarget.dataset.stream;
  this.getUrl(stream)
  
  console.log(" tasklist==>",this.data.tasklist)
}
  // 是否允许滚动
})