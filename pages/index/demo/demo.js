// pages/index/demo/demo.js
import util from "../../../utils/util.js";
import addr from "../../../utils/addr.js";

const app = getApp();
let id = 0;
let getControl_requestId = '';
let cmdStatus = {};
let Status_requestId = '';
let modeMethod_requestId = '';
let groupName = ""
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    iotITemsTest: [],
    outputItemsTest: [],
    ambientItemsTest: [],
    buttonItemsTest: [],
    radioItemsTest: [],
    allLists: [],
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options===>", options)
    id = options.deviceId
    groupName = options.groupName
    this.setData({
      school: options.schoolName
    })
    this.getStatus()
    // this.getControl()
    this.listingMsg()
  },
  // 把控件列表与status的值对应
  putAllStates(obj) {
    console.log(" putAllStates(obj)  item", obj)

    if (obj) {
      console.log("this.data.allLists", this.data.allLists)
      for (let item of this.data.allLists) {
        console.log(" putAllStates(obj)  item", item)
        let status = obj;
        if (item.options.key) {
          let keys = item.options.key.split(".");
          for (let key of keys) {
            // 捕获异常并抛弃
            try {
              status = status[key];
              console.log('==================' + JSON.stringify(keys));
            } catch (e) {
              console.log(e);
            }
          }
          if (item.options.type == "switch") {
            if (status != item.options.status_mount) {
              item.options.status_mount = status;
              // this.modeMethod(item);
            }
          } 
         else if (item.options.type == "button") {
            if (status != item.options.status_mount) {
              item.options.status_mount = status;
              // this.modeMethod(item);
            }
          }else if (item.options.type == "view") {
            if (status != item.options.content) {
              item.options.content = status;
              // this.modeMethod(item);
            }
          } else if (item.options.type == "slider") {
            if (status != item.options.music) {
              item.options.music = status;
              // this.modeMethod(item);
            }
          } else if (item.options.type == "radio") {
            if (status != item.options.mun) {
              item.options.mun = status;
              // this.modeMethod(item);
            }
          }
        } else {
          status = null;
        }
        //            console.log(status)
      }
    }
    this.setData({
      allLists: this.data.allLists
    })
  },
  //修改类目控制
  modeMethod(item) {
    console.log("走你%%%%%%%%%》", item)
    app.globalData.requestId = app.globalData.requestId + 1;
    modeMethod_requestId = app.globalData.requestId;
    let id = item.id;
    let param = {
      name: item.name,
      idx: item.idx,
      options: item.options,
    };
    if (item.options.type == "radio" && item.options.status_mount == true) {
      this.radioChange(item);
    }
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getWebInfo,
        "method": "post",
        "args": {
          id
        },
        "data": {
          param
        }
      },

    }
    console.log("data=**************==>", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })
    // this.api.terminal
    //   .postMethod(id, param)
    //   .then(() => {
    //     //					console.log(res)
    //     // this.getMethodState();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
changStatus:function (arry,statusList){
 console.log("arry==>",arry.length)
 console.log("arry==>",arry)
 console.log("statusList==>",statusList)
    if(arry.length > 0){
      for(let key of arry){
        for(let stu in statusList ){ 
      if( key == stu){
        arry.splice(0,1)
     let st = statusList[key]
     console.log("st=====>",st)
     if(st != null){
      this.changStatus(arry,st)
     }
      }
        }
      }
    }else{
      console.log("看我",statusList)
    console.log("JSON.stringify(jsonobj)",JSON.stringify(statusList))
    let t = JSON.stringify(statusList)
      return t;
    }
  },


  listingMsg: function () {
    let that = this
    console.log("请求返回的数据 demo")

    app.globalData.SocketTask.onMessage(function (res) {
      var res = JSON.parse(res.data)
      console.log("请求返回的数据 demo", res)
      if (modeMethod_requestId == res.msgid) {
        console.log("???????????demo", res)

      }
      if (res.payload.result.text == "ok" && getControl_requestId == res.msgid) {
        // res.payload.data[0].options.configs[0].attr = 1
        res.payload.data = that.arry_qucong(res.payload.data)
        console.log("去重", that.arry_qucong(res.payload.data))
        if (groupName != "") {
          for (let item of res.payload.data) {
            if (item.options.groupName) {
              if (item.options.groupName == groupName) {
                that.data.allLists.push(item)
              }
            }

          }
        } else {
          that.data.allLists = res.payload.data;

        }
        that.putAllStates(cmdStatus)
        var _iotITemsTest = [];
        var _outputItemsTest = [];
        var _ambientItemsTest = [];
        var _buttonItemsTest = [];
        var _radioItemsTest = [];
        for (let item of that.data.allLists) {
          console.log("item", item)
          // var iot = ["button", "switch"]
          var iot = ["switch"]
          if (iot.includes(item.options.type)) {
            if (item.options.type == "switch") {
              // let contentValue = ""
              let Status = cmdStatus
              let view_status = item.options.key?item.options.key.split("."):[]
              let ss = ''
              // ss = that.changStatus(view_status,cmdStatus,that)
            //  console.log("sssss==>",ss)
            //  console.log("that.changStatus(view_status,cmdStatus,that)",that.changStatus(view_status,cmdStatus))
              item.isChecked = item.status_mount
            }



            _iotITemsTest.push(item)
          }
          if (item.options.type == "button") {
            item.isChecked = true
            let _confings = []


            for (let items of item.options.configs) {
              for (let itemss of _confings) {
                if (items.attr == itemss.attr) {
                  break
                }
              }
              if (items.attr == 0) {
                console.log("items--------------->", items)
                items.isChecked = cmdStatus.base.power_screen_up
                // items.isChecked = true
              } else if (items.attr == 1) {
                items.isChecked = cmdStatus.base.power_screen_down
              }

              _confings.push(items)
            }
            item.options.configs = _confings
            _buttonItemsTest.push(item)
            console.log(" _buttonItemsTest====>", _buttonItemsTest)

          }



          if (item.options.type == "slider") {
            item.mikeval = item.options.music

            _outputItemsTest.push(item)

          }
          if (item.options.type == "radio") {
            item.isChecked = item.options.status_mount
            for (let items of item.options.configs) {
              items.isChecked = false
              if (items.attr == item.options.mun) {
                items.isChecked = true
              }
            }
            _radioItemsTest.push(item)

          }


          if (item.options.type === "view") {
            let Status = cmdStatus
            console.log("cmdStatus===>", cmdStatus)
            // let view_status = []
            // let view_status = item.options.key.split(/[^\.][0]+/)
            let view_status = item.options.key.split(".")
            // view_status[0] = view_status1[0]


            console.log(" view_status", view_status)
            // for (let key of view_status) {
            //   console.log("key2222", key)
            //   Status = Status[key]
            //   console.log("Status ", Status)
            // }
            item.view_key = Status

            _ambientItemsTest.push(item)
          }
        }

        that.setData({
          iotITemsTest: that.allSort(_iotITemsTest),
          outputItemsTest: that.allSort(_outputItemsTest),
          ambientItemsTest: that.allSort(_ambientItemsTest),
          buttonItemsTest: that.allSort(_buttonItemsTest),
          radioItemsTest: that.allSort(_radioItemsTest)
        })
        wx.hideLoading()
        console.log(" iotITemsTest", that.data.iotITemsTest)
        console.log(" outputItemsTest", that.data.outputItemsTest)
        console.log(" ambientItemsTest", that.data.ambientItemsTest)
        console.log(" buttonItemsTest", that.data.buttonItemsTest)
        console.log(" radioItemsTest", that.data.radioItemsTest)
        // that.getStatus()
      } else if (Status_requestId == res.msgid && res.payload.result.text == "ok") {
        cmdStatus = res.payload.status
        that.putAllStates(cmdStatus)
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
  // 去重
  arry_qucong: (arr) => {
    for (let shu of arr) {
      if (shu.options.configs) {
        let obj = {};
        shu.options.configs = shu.options.configs.reduce(function (
            item,
            next
          ) {
            obj[next.attr] ?
              "" :
              (obj[next.attr] = true && item.push(next));
            return item;
          },
          []);
      }
    }
    return arr;
  },

  // 排序  
  allSort(arr) {
    console.log("arr==>", arr)
    arr.sort(function (a, b) {
      return b.idx - a.idx;
    });
    return arr
  },

  edit: function (e) {
    console.log("e===>", e)
    this.setData({
      isEdit: !this.data.isEdit
    })
  },

  radioChange: function (e) {
    console.log("radioChange e===>", e)

  },

  detail: function (index) {
    console.log("", index)
  },

  // 开关控制  
  change: function (e) {
    console.log("change e ===>", e)
    let method = e.currentTarget.dataset.detail.options.method;
    let _id = e.currentTarget.dataset.detail.id
    let attr = e.detail.value ? 1 : 0;
    let type = e.currentTarget.dataset.detail.options.type;
    let data_type = e.currentTarget.dataset.type;
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
      this.changCmd(id, method, attr)
    } else if (data_type == "buttonItemsTest") {
      console.log("type   data_type", type, data_type)
      for (let item of this.data.buttonItemsTest) {
        if (item.id == _id) {
          console.log("_id======================", _id)
          item.isChecked = e.detail.value
        }
      }
      this.setData({
        buttonItemsTest: this.data.buttonItemsTest
      })

    } else if (data_type == "radioItemsTest") {
      for (let item of this.data.radioItemsTest) {
        if (item.id == _id) {
          console.log("_id======================", _id)
          item.isChecked = e.detail.value
        }
      }
      this.setData({
        radioItemsTest: this.data.radioItemsTest
      })
    }

  },
  outputChange: function (e) {
    console.log("outputChange e ===>", e)
  },
  iot_btn_change: function (e) {
    console.log(" iot_btn_change =====>", e)
    // let id = e.currentTarget.dataset.id;
    let method = e.currentTarget.dataset.method
    let attr = parseInt(e.detail.value);
    this.changCmd(id, method, attr)
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

  changCmd: function (id, method, attr, measure) {
    wx.showLoading({
      title: '请求中',
    })
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
        },
        "data": {
          measure
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
    this.changCmd(id, method, attr, _mikeval)
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