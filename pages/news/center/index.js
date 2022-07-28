//index.js
//获取应用实例
const app = getApp()

const util = require('../../../utils/util.js')
let centerRequestId = ''

Page({
  data: {
    array: ['消息列表', '已发送消息'],
    index: 0,
    msgInfo:[]
    },
  onLoad: function () {
   this.getMessageCount()
   this.listMsg()
  },
  onShow:function (){
    // util.storageHelper.get("msgLIst").then( res => {
    //   console.log(" msg ", res)

    //   res.map( item => {
    //     item.timestamp = util.formatDate(item.timestamp*1000)
    //   })
    //   this.setData({
    //     msgInfo : res
    //   })
    //   console.log(" msg2222 ", res)

    //   console.log([] == null)
    // })
    
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  goPulish:function(){
    wx.navigateTo({
      url: '../editinfo/index'
    })
  },
  goEmpty:function(){
    wx.showModal({
      title: '提示',
      content: '确定要清空信息？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 监听信息
  listMsg: function () {
    app.globalData.SocketTask.onMessage( res => {
      console.log("获取未读消息成功 res==》",res)
     res = JSON.parse(res.data)
     console.log("获取未读消息成功 res==》",res)
    if(centerRequestId == res.msgid){
      if(res.payload.notice.list!== null){
        res.payload.notice.list.map( item => {
          item.timestamp = util.formatDate(item.timestamp*1000)
        })
      }
    this.setData({
      msgInfo : res.payload.notice.list
    })

    }

    })
  },
    // 获取最新的未读消息个数  我已经得到满足了 乙肝疫苗 
    getMessageCount:function(){
      var that = this;
      app.globalData.requestId = app.globalData.requestId + 1;
      centerRequestId =  app.globalData.requestId;
      var request = {
        "msgname": "http_request",
        "msgid": app.globalData.requestId,
        "payload": {
          "path": util.addr.getMessage,
          "method":"get",
          "count":true
        }
      }
      console.log("JSON.stringify(request)==>",JSON.stringify(request))
      app.globalData.SocketTask.send({
        data: JSON.stringify(request),
        success:function (res){
          console.log(res)
        }
      })
  
    },
 
})
