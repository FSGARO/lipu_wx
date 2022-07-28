//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
let deviceid = '';
let count = 0;
let movedistance = 0;
Page({
  data: {
    currentIndex: 0,
    schoolList: [],

  },
  onLoad: function (option) {
    console.log(" app.globalData.currentId", app.globalData.currentId)
    let that = this
    console.log("xxxxxxxxxxxxxxxxxxx")
    if ("q" in option) {
      console.log("通过微信扫一扫进入的===》", option)
      var q = decodeURIComponent(option.q)
      console.log("q====>", q);
      app.getToken().then((res) => {
        var dataparam = {
          token: res
        };
        that.bindDevice(q, dataparam)
      })


    } else {
      this.getDeviceid();
    }



  },
  onShow: function () {
    if (app.globalData.identity.token != '') {
      this.GetSchool()
    }
  },


  // 判断Storage中是否存在有效的deviceid
  getDeviceid: function () {
    util.storageHelper.get('deviceid').then(res => {
      deviceid = '';
      console.log("res===>  getDeviceid", res)
      deviceid = res;
      if (deviceid == '') {
        console.log("deviceid == ''", deviceid)
        this.getSchool()
      } else if (count == 0) {
        count++
        app.globalData.currentId = deviceid
        console.log("deviceid===>", deviceid)
        app.getToken().then(ress => {
    console.log(" app.globalData.currentId", app.globalData.currentId)

          app.getDevicelist(ress).then((res) => {
            console.log("getSchool  res==>", res)
            let _schoolLIst = app.globalData.devicelist;

            this.setData({
              schoolList: _schoolLIst
            });
            for( let item of _schoolLIst){
              item.currentOnline = false
              console.log('item.online == true',item.online == true)
              if(item.device_id == deviceid && item.online == true){
                app.getsocket(deviceid).then(res => {
                  console.log("app.getsocket(deviceid)===>", res)
                  if (res) {
                    item.currentOnline = true
                    wx.switchTab({
                      url: '/pages/index/index'
                    });
                    app.getsocket(app.globalData.currentId);
                    return
                  } 
                })
              };

            }
          })
       
        })
      }
    });

  },
  // 获取学校列表
  getSchool: function () {
    app.globalData.currentId = deviceid
    console.log(" app.globalData.currentId", app.globalData.currentId)
    console.log("开始加载学校列表")
    if (app.globalData.identity.token == '') {
      app.getToken().then((res) => {
        console.log("getSchool  res==>", res)
        console.log(" app.globalData.currentId", app.globalData.currentId)

        app.getDevicelist(res).then((res) => {
          console.log("getSchool  res==>9999999999999999999999999999999999999999999999999999999999999999999999", res)
          console.log("getSchool  获取学校列表", app.globalData.devicelist)

          let _schoolLIst = app.globalData.devicelist
        
          this.setData({
            schoolList: _schoolLIst
          });
          console.log("获取学校列表", app.globalData.devicelist)

        })
      })
    } else {
      util.storageHelper.get('token').then(res => {
    console.log(" app.globalData.currentId", app.globalData.currentId)

        app.getDevicelist(res).then((res) => {
          this.setData({
            schoolList: app.globalData.devicelist
          });
          console.log("获取学校列表", app.globalData.devicelist)
        })
      })
    }

  },


  GetSchool: function () {
    let res = app.globalData.identity.token;
    app.globalData.currentId = deviceid
    console.log(" app.globalData.currentId", app.globalData.currentId)

    app.getDevicelist(res).then((res) => {
      console.log(res)
      this.setData({
        schoolList: app.globalData.devicelist
      });
      console.log("获取学校列表", app.globalData.devicelist)
    })
  },

  // 添加学校

  bindDevice: function (url, res) {
    console.log(123)
    console.log("123res===>", res)
    util.Requests(url, res, "GET").then((res) => {
      console.log("添加学校11111111111", res)
      if (res.status && res.response == null) {
        wx.showToast({
          title: '学校添加成功！',
          icon: 'none',
          duration: 1500
        })
        wx.navigateTo({
          url: '/pages/my/chooseschool/index'
        });
        console.log("绑定成功加载学校")
        this.getSchool()
      } else if (!res.status) {
        console.log("绑定失败")
        if (res.response.errmsg == "repeated binding") {
          wx.showToast({
            title: '当前用户已经绑定这台设备',
            icon: 'none',
            duration: 1500
          })
          wx.navigateTo({
            url: 'pages/my/chooseschool/index',
          })
        } else {
          if (res.response.errmsg == "database error") {
            wx.showToast({
              title: '数据库错误',
              icon: 'none',
              duration: 1500
            })
            console.log("database error")
            wx.navigateTo({
              url: 'pages/my/chooseschool/index',
            })
          }
        }
        this.getSchool()
      }
    }).catch((fail_message) => {
      
      wx.showToast({
        title: '请求返回401',
        duration: 2000
      })
      console.log("请求失败",fail_message);
    });
  },
  //连接学校
  connectSchool: function (e) {
    let that = this
    console.log("  //连接学校");
    deviceid = e.currentTarget.dataset.deviceid
    console.log(" _deviceid", e)
    if (deviceid == app.globalData.currentId &&  app.globalData.haveOnline) {
      console.log("正处于当前学校")
      wx.showToast({
        title: '正处于当前学校',
        duration: 1500
      })
      wx.switchTab({
        url: '/pages/index/index'
      });
      return
    }
    const online = e.currentTarget.dataset.online;
    if (!online) {
      console.log("当前学校不在线")
      wx.showToast({
        title: '当前学校不在线',
        duration: 2000
      })
    } else {
      app.globalData.currentId = deviceid
      console.log("deviceid==",deviceid)
      console.log("token==>", app.globalData.identity.token)
      app.getsocket(deviceid).then(function (res) {

        console.log("点击进入首页==》", res)
        if (res) {
          for(let item of app.globalData.devicelist){
            item.currentOnline = false
            if(item.device_id == app.globalData.currentId ){
              item.currentOnline = true
            }
          }
          that.setData({
            schoolList : app.globalData.devicelist
          })
          console.log("点击连接后的 schoolLIst",that.data.schoolList)
          wx.switchTab({
            url: '/pages/index/index'
          });
          app.rewebsocket(app.globalData.currentId);
          util.storageHelper.set('deviceid', deviceid);
        }
      })

    }
  },
  // 取消绑定学校
  cancel:function(mid){
    let _res = {
      token : app.globalData.identity.token,
      mid:mid
    }
    util.Requests(util.addr.concelBind, _res, "GET").then((res) => {
      console.log("cancel===>",res)
    })

  },
  // 删除学校
  deleteItem:function(e) {
    let that = this;
   let deviceid = e.currentTarget.dataset.deviceid
    wx.showModal({
     title: '提示',
     content: '是否删除该条数据？',
     success(res) {
      if (res.confirm) {
        that.cancel(deviceid)
        that.slideAnimation(0, 300);
        that.getSchool();
        deviceid = ""

      } else if (res.cancel) {
       console.log('用户点击取消')
      }
     }
    });
   },
   
   touchstartX(e) {
    this.setData({
     currentIndex: e.currentTarget.dataset.index
    });
    // 获取触摸X坐标
    this.recordX = e.touches[0].clientX;
   },
   // 点击操作
   resetX() {
    this.slideAnimation(0, 300);
   },
   // 手指触摸后移动
   touchmoveX(e) {
    let currentX = e.touches[0].clientX;
    movedistance = currentX - this.recordX; // 获取移动距离
    this.slideAnimation(movedistance, 300);
   },
   // 手指触摸动作结束
   touchendX() {
    let recordX;
    if (movedistance <= -50) { // 移动达到距离就动画显示全部操作项
     recordX = -170;
    } else if (movedistance >= -50) { // 移动未达到距离即还原
     recordX = 0;
    }
    this.slideAnimation(recordX, 300);
   },
   // 滑动动画
   slideAnimation(recordX, time) {
    let animation = wx.createAnimation({
     duration: time,
     timingFunction: 'ease'
    });
    animation.translate(recordX + 'rpx', 0).step()
    this.setData({
     animation: animation.export()
    })
   },






})