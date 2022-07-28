//app.js

const util = require('./utils/util.js')
console.log(util)
var again = false;


App({
  onLaunch: function () {
    // 展示本地存储能力 
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户个人信息 
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 新版本提示
    const updateManager=wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res){
      console.log('新版本发布',res)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      console.log('更新失败')
    })
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.statusBarHeight = res.statusBarHeight;
        console.log(res.statusBarHeight, 'statusBarHeight')
      }
    });
    // this.getToken()
  },

  rewebsocket: function () {
    let that = this
    that.globalData.SocketTask.onClose(function (res) {
      console.log("断线重连！！！")
      that.getsocket(that.globalData.currentId)
    })
  },

  // 成功登陆并连接上websocket 
  // onLink: function () {
  //   let _this = this
  //   wx.showLoading({
  //     title: '连接中',
  //   })
  //   _this.getToken().then((res) => {
  //     _this.getDevicelist(res).then((res) => {
  //       let currentId = res;
  //       _this.getsocket(currentId)
  //     })
  //   })
  //   util.storageHelper.get('token').then(res => {
  //     _this.globalData.identity.token = res;
  //     console.log(" that.globalData.identity.token = res;====>", res)
  //     if (res == '') {
  //       _this.getToken().then((res) => {

  //         _this.getDevicelist(_this.globalData.identity.token).then((res) => {
  //           let currentId = res;
  //           _this.getsocket(currentId)
  //         })
  //       })
  //     } else {
  //       _this.getDevicelist(_this.globalData.identity.token).then((res) => {
  //         let currentId = res;
  //         _this.getsocket(currentId)
  //       })
  //     }
  //   })
  // },

  // 获取有效token code
  getToken: function () {
    wx.removeStorageSync('logs');
    // console.log("token===>", util.storageHelper.get('token'))

    let __this = this;
    // if(__this.globalData.identity.token  == ""){
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          console.log("重新连接  res.code  ===>", res)
          __this.globalData.identity.programCode = res.code;
          console.log(" _this.globalData.identity.programCode>>==", res.code);
          wx.request({
            url: 'https://wx.litpsmart.com/sc/auth?code=' + res.code,
            success: (res) => {
              console.log("token===>", res)
              __this.globalData.identity.token = res.data.response.token;
              util.storageHelper.set('token', res.data.response.token);
              console.log("token==>", res.data.response.token)
              resolve(res.data.response.token)
            },
            fail: (err) => {
              console.log("errr===>", err)
            }
          })
        }
      })
    })
    // }

  },
  // 获取已连接设备的列表 
  getDevicelist: function (token) {
    return new Promise((resolve, reject) => {
      let that = this;
    console.log("that.globalData.currentId",that.globalData.currentId)

      var data = {
        token: token,
        // _t:Date.parse(new Date())
      };
      var onlineArr = [];
      util.Requests(util.addr.getDevicelist, data, "GET").then((res) => {
        console.log("that.globalData.currentId", that.globalData.currentId)
        let data = Object.assign(res)
        console.log("data",data)
        console.log("that.globalData.currentId", that.globalData.currentId)
        for (let item of data.response) {
          console.log("that.globalData.currentId", that.globalData.currentId)
          item.currentOnline = false
          if (item.device_id == that.globalData.currentId) {
            console.log("data.response.device_id", item.device_id)
            item.currentOnline = true
          }
        }
        console.log(" getDevicelist===========", data)
        // that.globalData.getDevicelist = data.response;
        that.globalData.devicelist = data.response;
        // resolve(that.globalData.getDevicelist);
        resolve(that.globalData.devicelist);
        if (data == 401) {
          console.log("重新发起请求！！！！！")
          wx.showToast({
            title: '请下拉刷新',
          })
          return
        }
        if (data.response.length <= 0) {
          console.log("that.globalData.currentId", that.globalData.currentId)
          wx.navigateTo({
            url: '/pages/auth/index'
          })
        } else {
          console.log("that.globalData.currentId", that.globalData.currentId)
          onlineArr = [];
          // for (var i = 0; i < data.response.length; i++) {
          //   if (data.response[i].online) {
          //     onlineArr.push(data.response[i])
          //   }
          // }
          for( let item of  data.response){
            if(item.online){
              item.currentOnline = false
              if(item.device_id ==  that.globalData.currentId){
              item.currentOnline = true

              }
              onlineArr.push(item)
            }
          }
          if (onlineArr.length == 0) {
            console.log("that.globalData.currentId", that.globalData.currentId)
            console.log(" onlineArr===", onlineArr)
            console.log("当前没有设备在线！")
            wx.showToast({
              title: '当前没有设备在线！请选择学校',
              duration: 1000,
              icon: 'none'
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/auth/index'
              })
            }, 1000)
            // wx.navigateTo({
            //   url: '/pages/my/chooseschool/index'
            // });
          } else {
            console.log("请选择设备", onlineArr)
            console.log(" onlineArr===", onlineArr)
            for(let item of onlineArr){
              if(item.currentOnline){
                that.globalData.currentId = item.device_id
              }
            }
            // that.globalData.currentId = onlineArr[onlineArr.length - 1].device_id;
            console.log(" that.globalData.currentId", that.globalData.currentId)
            resolve(that.globalData.currentId)
          }
        }
        if (data.response != null) {
          for (let item of data.response) {
            console.log("that.globalData.currentId",that.globalData.currentId)
            item.currentOnline = false
            if (item.device_id == that.globalData.currentId && item.online == true) {
              console.log("item.device_id",item.device_id)
              item.currentOnline = true
            }
          }
        }
        that.globalData.devicelist = data.response;
        console.log("that.globalData.devicelist===>",that.globalData.devicelist)
      }).catch((fail_message) => {
        console.log(fail_message);
      });
    })

  },

  // 连接 websocket 
  getsocket: function (mid) {
    let that = this;
    wx.showLoading({
      title: '正在连接中',
    })
    return new Promise((resolve, reject) => {
      // wx.closeSocket()

      that.globalData.SocketTask = wx.connectSocket({
        url: util.addr.wsGlobal + '?token=' + that.globalData.identity.token + '&mid=' + mid,
        success: function (res) {
          if (res.errMsg == "connectSocket:ok") {
            console.log(util.addr.wsGlobal + '?token=' + that.globalData.identity.token + '&mid=' + mid,'==========????????????????????')
            console.log("connectSocket:ok 成功连接", res)
            wx.hideLoading()
          }
        },
        fail: function (err) {
          console.log("连接失败===》", err)
        }
      });
      //接收到信息 确定已连接
      that.globalData.SocketTask.onMessage(function (res) {
        var res = JSON.parse(res.data);
        // console.log(" //接收到信息 确定已连接==>",res)
        if (res.msgname == 'hello') {
          that.globalData.requestId = res.msgid;
          resolve(true);
          console.log("onMessage 接受到的消息", res)
        } else {
          resolve(false)
        }
      });
      //监听websocket打开事件
      that.globalData.SocketTask.onOpen(function (res) {
        console.log("webSocket  onOpen已打开")
        that.globalData.haveOnline = true
      })
      that.globalData.SocketTask.onClose(function (res) {
        that.globalData.haveOnline = false
        reject(false)
        console.log("webSocket onClose已关闭????????????????????????????????????????????????????")
        that.getsocket(mid)
      })

    })

  },
  //全局变量存储
  globalData: {
    haveOnline: false,
    userInfo: null,
    //小程序凭证
    identity: {
      programCode: '',
      token: ''
    },
    //设备列表
    devicelist: '',
    //当前设备id
    currentId: '',
    //初始化全局请求id  每一次socket请求 id加1
    requestId: '',
    //全局socket变量
    SocketTask: '',
    //页面顶部高度
    statusBarHeight: '',
  }
})