// pages/index/addWulian/index.js
const app = getApp()
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // array: ['美国', '中国', '巴西', '日本'],
    // index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 获取指令列表
  // getCmd:function (){
  //   app.globalData.requestId = app.globalData.requestId + 1;
  //   this.requestId = app.globalData.requestId
  //   var request = {
  //     "msgname": "http_request",
  //     "msgid": app.globalData.requestId,
  //     "payload": {
  //       "path": util.addr.getCmd,
  //       "method":"get",
  //       "args": {
  //         "off":0,
  //         "cnt":32
  //       }
  //     }
  //   }
  //   app.globalData.SocketTask.send({
  //     data: JSON.stringify(request),
  //     success: function (res) {
  //       wx.showLoading({
  //         title: '加载中',
  //       })
  //     }
  //   })
   
  // },
  onAddtask:function(e){
    // console.log("父级onAddtask===>",e)
    
  },

  // 监听onMessage消息
  // listenMsg:function (){
  //   app.globalData.SocketTask.onMessage( res => {
  //     var res = JSON.parse(res.data)
  //     console.log("获取指令列表==》",res)
  //     if('cmd_info_list' in res.payload){
  //       total = res.payload.cmd_info_list.total
  //     }
  //   })
  // },
  // pickerValue:function(e){
  //   console.log("pickerValue==>",e)
  // },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


