//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    radioCheck: false,
    off: {
      projector: {
        check: false,
        offGroup: [{
          checked: true,
          name: "HDMl1"
        },
        {
          checked: false,
          name: "S视频"
        },
        {
          checked: false,
          name: "VGA"
        },
        {
          checked: false,
          name: "DVl"
        }
        ]
      },
      signalMain: {
        check: false,
        offGroup: [{
          checked: true,
          name: "电脑"
        },
        {
          checked: false,
          name: "HDMl1"
        },
        {
          checked: false,
          name: "HDMl2"
        },
        {
          checked: false,
          name: "广播"
        }
        ]
      },
      signalAssist: {
        check: false,
        offGroup: [{
          checked: true,
          name: "电脑"
        },
        {
          checked: false,
          name: "HDMl1"
        },
        {
          checked: false,
          name: "HDMl2"
        }

        ]
      }
    },
    mikeval: 10,
    soundVal: 10,
    switchCheck: false,
    computerCheck: false,
    lightingCheck: false,
    seatCheck: false,
    projectorCheck: false,
    deviceId: ''
  },
  onLoad: function (options) {
    this.setData({
      deviceId: options.deviceId
    });
    // 获取设备的默认状态
    this.deviceStatus()

  },
  onShow:function(){
    // this.deviceStatus()
   
  },
  theadRadio: function () {
    this.setData({
      radioCheck: !this.data.radioCheck
    })
  },
  makechange: function (e) {
    console.log(e.detail.value);
    this.setData({
      mikeval: e.detail.value
    });
    app.globalData.requestId = app.globalData.requestId + 1;
    this.controlDevice(this.data.deviceId, 'volume', this.data.mikeval);
  },
  klangchange: function (e) {
    console.log(e.detail.value);
    this.setData({
      soundVal: e.detail.value
    });

    app.globalData.requestId = app.globalData.requestId + 1;
    this.controlDevice(this.data.deviceId, 'volume', this.data.soundVal);


  },
  goOffDetails: function () {
    wx.navigateTo({
      url: '/pages/index/offdetails/index?deviceId=' + this.data.deviceId
    });
  },
  goLive: function () {
    wx.navigateTo({
      url: '/pages/index/live/index'
    });
  },
  signalChange: function (e) {
    const itemIndex = e.detail.value;
    for (var i = 0; i < this.data.off.projector.offGroup.length; i++) {
      const item = 'off.projector.offGroup[' + i + '].checked';
      if (i != itemIndex) {
        this.setData({
          [item]: false
        });
      } else {
        this.setData({
          [item]: true
        });
      }
    }
  },
  mainChange: function (e) {
    const itemIndex = e.detail.value;
    for (var i = 0; i < this.data.off.signalMain.offGroup.length; i++) {
      const item = 'off.signalMain.offGroup[' + i + '].checked';
      if (i != itemIndex) {
        this.setData({
          [item]: false
        });
      } else {
        this.setData({
          [item]: true
        });
      }
    }
  },
  assistChange: function (e) {
    const itemIndex = e.detail.value;
    for (var i = 0; i < this.data.off.signalAssist.offGroup.length; i++) {
      const item = 'off.signalAssist.offGroup[' + i + '].checked';
      if (i != itemIndex) {
        this.setData({
          [item]: false
        });
      } else {
        this.setData({
          [item]: true
        });
      }
    }
  },

  // 开关控制 
  mainSwitch: function (e) {
    console.log("mainSwitch e====>",e)
    console.log(e.currentTarget.dataset.name);
    const type = e.currentTarget.dataset.name;
    var that = this;
    if (type == "total") {
      console.log("总开关")
      const switchCheck = !that.data.switchCheck;
      that.setData({
        switchCheck: switchCheck,
        computerCheck: switchCheck,
        lightingCheck: switchCheck,
        seatCheck: switchCheck,
        projectorCheck: switchCheck
      })
      app.globalData.requestId = app.globalData.requestId + 1;
      that.controlDevice(that.data.deviceId, 'power', that.data.switchCheck ? 1 : 0);

    } else if (type == "computer") {
      that.setData({
        computerCheck: !that.data.computerCheck
      })
      app.globalData.requestId = app.globalData.requestId + 1;
      that.controlDevice(that.data.deviceId, 'computer', that.data.computerCheck ? 1 : 0);

    } else if (type == "lighting") {
      that.setData({
        lightingCheck: !that.data.lightingCheck
      })
      app.globalData.requestId = app.globalData.requestId + 1;
      console.log("灯光开关")
      console.log(app.globalData.requestId)
      that.controlDevice(that.data.deviceId, 'light', that.data.lightingCheck ? 1 : 0);
    } else if (type == "seat") {
      that.setData({
        seatCheck: !that.data.seatCheck
      })
      app.globalData.requestId = app.globalData.requestId + 1;
      that.controlDevice(that.data.deviceId, 'light', that.data.lightingCheck ? 1 : 0);
    } else if( type == 'projector'){
      this.setData({
        projectorCheck: !this.data.projectorCheck
      });
      app.globalData.requestId = app.globalData.requestId + 1;
      this.controlDevice(this.data.deviceId, 'projector', this.data.projectorCheck ? 1 : 0);
    }

  },
  // 获取所有开关的状态
  deviceStatus: function (id, method, attr) {
  wx.showLoading({
    title: '加载中',
  })
    app.globalData.requestId = app.globalData.requestId + 1;
    const requestId = app.globalData.requestId;
    var that = this;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.deviceStatus,
        "method": "get",
        "args": {
          "id": that.data.deviceId
        } 
      }
    }
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        console.log("发送获取设备信息申请");
        console.log(res)
      }
    })

    app.globalData.SocketTask.onMessage(function (res) {
      var res = JSON.parse(res.data);
      console.log("监听设备状态信息函数")
      wx.hideLoading();
      if (res.msgid == requestId) {
        console.log("设备默认状态信息")
        console.log(res)
        that.setData({
          computerCheck: res.payload.status.pc_enabled,
          lightingCheck: res.payload.status.pc_enabled,
          seatCheck: res.payload.status.pc_enabled,
          switchCheck: res.payload.status.system_enabled,
          projectorCheck: res.payload.status.projector_enabled 
        });
        
      }
    });

  },
  // 控制设备的开关 
  controlDevice: function (id, method, attr) {
    var that = this;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.deviceControl,
        "method": "POST",
        "args": {
          "method": method,
          "id": that.data.deviceId,
          "attr": attr
        }
      }
    }
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        console.log("ws发送设备控制请求");
        console.log(app.globalData.requestId)
      }
    })

  }


})