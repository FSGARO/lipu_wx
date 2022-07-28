//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    deviceId: '',
    tabcheck: 'tab1',
    offgroup: [
      { check: false, },
      {
        check: false, arr: [
          { checked: true, name: "HDMi" },
          { checked: false, name: "S视频" },
          { checked: false, name: "HDmi2" },
          { checked: false, name: "DVi" }
        ]
      }
    ]
  },
  onLoad: function (options) {
    this.setData({
      deviceId: options.deviceId
    });
    var that = this;
    app.globalData.SocketTask.onMessage(function (res) {
      var res = JSON.parse(res.data);
      if (res.msgid == app.globalData.requestId && res.msgname == "result") {
        util.hideLoad();
      }
    });
  },
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
        wx.showLoading({
          title: '加载中',
        })
        console.log("ws发送设备控制请求");
        console.log(app.globalData.requestId)
      }
    })

  },
  radioChange: function (e) {
    console.log("2321312")
    console.log(e)
    const type = e.currentTarget.dataset.type;
    const index = e.currentTarget.dataset.index;


  },
  switchChange: function (e) {
    const type = e.currentTarget.dataset.type;
    const check = e.detail.value;
    var that = this;
    if (type == 'light') {
      const el = 'offgroup[0].check';
      if (check) {
        that.setData({
          [el]: true
        });
      } else {
        that.setData({
          [el]: false
        });
      }
      app.globalData.requestId = app.globalData.requestId + 1;
      that.controlDevice(that.data.deviceId, 'light', that.data.offgroup[0].check ? 1 : 0);
    } else if (type == 'camera') {
      const el = 'offgroup[1].check';
      if (check) {
        this.setData({
          [el]: true
        });
      } else {
        this.setData({
          [el]: false
        });
      }

    }

  },
  cameraChange: function (e) {
    const itemIndex = e.detail.value;
    for (var i = 0; i < this.data.offgroup[1].arr.length; i++) {
      const item = 'offgroup[1].arr[' + i + '].checked';
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
  checkTab: function (e) {
    console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    this.setData({
      tabcheck: 'tab' + id
    });
  }


})
