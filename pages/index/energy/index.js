//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')
let id = 0

Page({
  data: {
  selectList:[],
  times:[1,3,6,12],
    energyList: [],
    siteShow:false,
    timeShow:false,
    listShow:true,
    site:"全部...",
    time:1,
  },
  onLoad: function () {
   
    this.energyLists(0, 1)
  },
  //耗能列表
  energyLists: function (areaid, month) {
    let that = this
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getEnergylist,
        "method": "get",
        "args": {
          "areaid": areaid,
          "month": month,
        }
      }
    }
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        wx.showLoading({
          title: '加载中',
        })
      }
    })
    app.globalData.SocketTask.onMessage(function (res) {
      console.log("能耗表总====》",res)
      console.log("this.id===>",id)
      
      that.data.energyList=[];
      that.data.selectList=[];
      if ("billing" in JSON.parse(res.data).payload && id == 0) {
        console.log("全部设备耗能列表",JSON.parse(res.data))
        for (let item of JSON.parse(res.data).payload.billing) {
          if (item.list.list == null) { continue }
          if(item.list.list){
          for (let items of item.list.list) {
            items.energy_device = Math.floor(items.energy_device/1000*100)/100
            // items.energy_device = items.energy_device.toFixed(2)
            items.energy_total = Math.floor(items.energy_total/1000*100)/100000
            // items.energy_total = items.energy_total.toFixed(2)
            let day = new Date((items.timestamp) * 1000)
            let month = day.getMonth() + 1
            let year = day.getFullYear()
             that.data.energyList.push({ location: item.location, id:item.id, month: year + '年' + month + '月', device: items.energy_device, total: items.energy_total })
          }
        }
          that.data.selectList.push({ location: item.location, id:item.id})
        }
        that.setData({
          energyList: that.data.energyList,
          selectList: that.data.selectList
        })
        console.log("energyList===>",that.data.energyList)
        console.log("selectList====>",that.data.selectList)
        wx.hideLoading()
   
      }
    })
  },
  energyListsid: function (id, month) {
    let that = this
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getEnergylist,
        "method": "get",
        "args": {
          "id":id,
          "month": month,
          'mode':"monthly"
          
        }
      }
    }
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        wx.showLoading({
          title: '加载中',
        })
      }
    })
    app.globalData.SocketTask.onMessage(function (res) {
      console.log("能耗表====》",res)
      var res = JSON.parse(res.data);
      console.log("res===>",res)
      that.data.energyList=[];
    
      if ("billing" in res.payload && id !=0) {   
         console.log("具体设备的耗能")
          for (let items of res.payload.billing.list) {
            
            let day = new Date((items.timestamp) * 1000)
            let month = day.getMonth() + 1
            let year = day.getFullYear()

             that.data.energyList.push({ location: that.data.site, month: year + '年' + month + '月', device: items.energy_device, total: items.energy_total })
          }
          console.log(" that.data.energyList===>", that.data.energyList)
         
        

        that.setData({
          energyList: that.data.energyList,
         
        })
        console.log("energyList===>",that.data.energyList)
        console.log("selectList====>",that.data.selectList)
        wx.hideLoading()
   
      }
    })
  },
  siteChange:function (){
    this.setData({
      siteShow : !this.data.siteShow
    })
    console.log("点击成功==》",this.data.siteShow)

  },
  timeChange:function (){
    this.setData({
      timeShow : !this.data.timeShow
    })
    console.log("时间点击成功==》",this.data.timeShow)

  },
  chang:function(e){
console.log("e===>",e)
let type =   e.currentTarget.dataset.type;
let item =  e.currentTarget.dataset.item
console.log("type==>",type ,item)
if(type == "site"){
  this.setData({
    site : item,
    siteShow : !this.data.siteShow

   })
  id =  e.currentTarget.dataset.id

}else{
  this.setData({
    time : item,
    timeShow : !this.data.timeShow

   })
}
console.log("this.id===>",id)
console.log("this.data.time===>",this.data.time)
if(id == 0){
  this.energyLists(0,this.data.time)
}else{
  this.energyListsid(id,this.data.time)

}




  },
  allchang:function(){
    id = 0
    this.energyLists(0,this.data.time)
    this.setData({
      site:"全部..."
    })
  },




})
