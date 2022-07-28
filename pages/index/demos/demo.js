// pages/index/demo/demo.js
import util from "../../../utils/util.js";
import addr from "../../../utils/addr.js";
const app = getApp();
let id = 0;
let getControl_requestId = '';
let cmdStatus = {};
let Status_requestId = '';
let schoolId = [];
let Control_requestId = '';
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    // 批量控制的学校
    schoolArr: [],
    iotITemsTest: [],
    outputItemsTest: [],
    // ambientItemsTest: [],
    // 音量的步长
    mikeval: 0,
    // 是否显示删除按钮
    isEdit: false,
    // 是否有麦克
    maike: {},
    yingXiang: {},
    haveMaike: false,
    haveYingxing: false,
    shool: ""


  },

  /**
   * 生命周期函数--监听页面加载  下个礼拜就好了
   */
  onLoad: function (options) {
    console.log("options===>", options)
    console.log("JSON.parse(jsonstr)", JSON.parse(options.batchIdarr))
    let batchIdarr = JSON.parse(options.batchIdarr)
    // id = options.deviceId
    for (let item of batchIdarr) {
      schoolId.push(item.id)
    }

    this.setData({
      // school: options.schoolName
      schoolArr: batchIdarr
    })
    // this.getStatus()
    this.getControl()
    this.listingMsg()
  },
  getStatus: function () {
    app.globalData.requestId = app.globalData.requestId + 1;
    Status_requestId = app.globalData.requestId;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.deviceStatus,
        "method": "get",
        "args": {
          id
        }
      },

    }
    console.log("data===>", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request)
    })
  },

  // 获取学校设备控制列表
  getControl: function (e) {
    // wx.showLoading({
    //   title: '请求中',
    // })
    app.globalData.requestId = app.globalData.requestId + 1;
    getControl_requestId = app.globalData.requestId;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getWebInfo,
        "method": "get",
      }
    }
    console.log("data===>", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function () {
        console.log("请求发送成功")
      }
    })
  },

  listingMsg: function () {
    let that = this
    console.log("请求返回的数据 demo")

    app.globalData.SocketTask.onMessage(function (res) {
      var res = JSON.parse(res.data)
      console.log("请求返回的数据 demo", res)
      if (res.payload.result.text == "ok" && getControl_requestId == res.msgid) {
        console.log("ok")
        var _iotITemsTest = [];
        var _outputItemsTest = [];
        var _ambientItemsTest = [];
        for (let item of res.payload.data) {
          console.log("item", item)
          var iot = ["button", "switch"]
          if (iot.includes(item.options.type)) {
            item.isChecked = false

            // if (item.options.type == "switch") {
            //   // let contentValue = ""
            //   let Status = cmdStatus
            //   console.log("cmdStatus===>", cmdStatus)
            //   let _status = item.options.key.split('.')
            //   for (let key of _status) {
            //     console.log("key", key)
            //     Status = Status[key]
            //     console.log("Status ", Status)
            //   }
            //   item.isChecked = Status
            // }


            if (item.options.type == "button") {
              item.isChecked = false
              let _confings = []
              for (let items of item.options.configs) {
                for (let itemss of _confings) {
                  if (items.attr == itemss.attr) {
                    break
                  }
                }
                items.isChecked = false

                // if(items.attr == 0){
                //   console.log("items--------------->",items)
                //   items.isChecked = cmdStatus.base.power_screen_up
                //   // items.isChecked = true
                // }else if(items.attr == 1){
                //   items.isChecked = cmdStatus.base.power_screen_down
                // }

                _confings.push(items)
              }
              item.options.configs = _confings
            }
            _iotITemsTest.push(item)
          }
          var outPut = ["slider", "radio"]
          if (outPut.includes(item.options.type)) {
            item.isChecked = false
            // if (item.options.type == "slider") {
            //   item.mikeval = item.options.music
            // }
            if (item.options.type == "radio") {
              for (let items of item.options.configs) {
                items.isChecked = false
                // if(items.attr ==  item.options.mun){
                // items.isChecked = true
                // }
              }
            }
            _outputItemsTest.push(item)
          };
          // if (item.options.type === "view") {
          // let Status = cmdStatus
          // console.log("cmdStatus===>", cmdStatus)
          // let view_status = item.options.key.split('.')
          // for (let key of view_status) {
          //   console.log("key2222", key)
          //   Status = Status[key]
          //   console.log("Status ", Status)
          // }
          // item.view_key = Status
          // _ambientItemsTest.push(item)
          // }
        }
        that.setData({
          iotITemsTest: _iotITemsTest,
          outputItemsTest: _outputItemsTest,
          // ambientItemsTest: _ambientItemsTest
        })
        wx.hideLoading()
        console.log(" iotITemsTest", that.data.iotITemsTest)
        console.log(" outputItemsTest", that.data.outputItemsTest)
        // console.log(" ambientItemsTest", that.data.ambientItemsTest)
        // that.getStatus()
      } else if (Status_requestId == res.msgid && res.payload.result.text == "ok") {
        cmdStatus = res.payload.status
        that.getControl()
        console.log("设备状态 cmdStatus===》", cmdStatus)
      } else if (app.globalData.requestId == res.msgid) {
        if (res.payload.result.text == 'ok') {
          wx.hideLoading()
        } else {
          wx.showToast({
            title: '请求失败',
            duration: 1000
          })
        }
      }
    })
  },
  // 切换编辑
  edit: function (e) {
    console.log("e===>", e)
    this.setData({
      isEdit: !this.data.isEdit
    })
  },

  radioChange: function (e) {
    console.log("radioChange e  音频控制===>", e)
    let method = e.currentTarget.dataset.detail.options.method;
    let attr = e.detail.value
    this.controlDev(schoolId,method,attr)
  },

  detail: function (index) {
    console.log("", index)
  },

  // 开关控制  
  change: function (e) {
    console.log("智能物联控制 change e ===>", e)
    let method = e.currentTarget.dataset.detail.options.method;
    let _id = e.currentTarget.dataset.detail.id
    let attr = e.detail.value ? 1 : 0;
    let type = e.currentTarget.dataset.detail.options.type;
    let data_type = e.currentTarget.dataset.type;
    // console.log("method attr",attr,method )
    if (data_type == "outputItemsTest") {
      for (let item of this.data.outputItemsTest) {
        if (item.id == _id) {
          console.log("_id======================", _id)
          item.isChecked = e.detail.value
        }
      }
      this.setData({
        outputItemsTest: this.data.outputItemsTest
      })
      console.log("this.data.outputItemsTest===>", this.data.outputItemsTest)
    } else if (type == 'switch') {
      // this.changCmd(id, method, attr)
      for (let item of this.data.iotITemsTest) {
        if (item.id == _id) {
          console.log("_id======================", _id)
          item.isChecked = e.detail.value
        }
      }

      this.controlDev(schoolId, method, attr)
    } else if (type == 'button' && data_type == "iotITemsTest") {
      console.log("type   data_type", type, data_type)
      for (let item of this.data.iotITemsTest) {
        if (item.id == _id) {
          console.log("_id======================", _id)
          item.isChecked = e.detail.value
        }
      }
      this.setData({
        iotITemsTest: this.data.iotITemsTest
      })
    }
  },


  // 控制开关的请求
  controlDev: function (id, method, attr,measure) {
    console.log("method, attr", method, attr)
    wx.showLoading({
      title: '请求中',
    })
    var that = this;
    app.globalData.requestId = app.globalData.requestId + 1;
    Control_requestId = app.globalData.requestId;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.deviceControl,
        "method": "post",
        "args": {
          id: 0,
          method,
          attr
        },
        "data": {
          "id": id,
          measure

        }
      }
    }
    console.log("JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function () {
        console.log("请求发送成功")
      }
    })

  },
  outputChange: function (e) {
    console.log("outputChange e ===>", e)
  },
  iot_btn_change: function (e) {
    console.log(" iot_btn_change =====>", e)
    // let id = e.currentTarget.dataset.id;
    let method = e.currentTarget.dataset.method
    let attr = parseInt(e.detail.value);
    // this.changCmd(id, method, attr)
    this.controlDev(schoolId, method, attr)
  },
  changWeb: function (id, options) {
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.ControlWeb,
        "method": "POST",
        "args": {
          id
        },
        "data": {
          options
        }
      }
    }
    console.log(" data: JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })
  },

  changCmd: function (id, method, attr) {
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.deviceControl,
        "method": "POST",
        "args": {
          id,
          method,
          attr,
        }
      }
    }
    console.log(" data: JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })
  },
  makechange: function (e) {
    console.log("滑块===》", e)
    let _id = e.currentTarget.dataset.detail.id;
    let attr = e.currentTarget.dataset.detail.options.attr;
    let _mikeval = e.detail.value;
    let method = e.currentTarget.dataset.detail.options.method
    for (let item of this.data.outputItemsTest) {
      if (_id == item.id) {
        item.mikeval = _mikeval
      }
    }
    this.setData({
      outputItemsTest: this.data.outputItemsTest
    })
    this.controlDev(schoolId,method, attr,_mikeval)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})