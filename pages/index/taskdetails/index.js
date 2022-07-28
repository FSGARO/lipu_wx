//index.js
//获取应用实例

const app = getApp();
const util = require('../../../utils/util.js');
let _place = '';
let placeName = '';
let detail = {};
let rmptList = [];
// 播放的教室地址
let cat3Url = [];
// 每页获取消息的条数
let cnt = 8;
// 当前详情页的ID
let detailId = '';
let count = 0;
let detailId_requestId = '';

let stopModifyId = '';
let runModifyId = '';
let stop_requestId = '';
let run_requestId = '';
let getMedia_requestId_array = [];
let sockerarr=[];
let cmd_off = 0;
let cmd_cnt = 10;
let cmd_requestId = ''

Page({
  data: {
    projector: false,
    taskDetail: {},
    // 是否禁用
    stop_enabled: false,
    run_enabled: false,
    // 暂停与启用任务
    isActive: false,
    method: "deactive",
    place: "",
    classfly: '',
    url_list: [],
    url: [],
    layout: '',
    // audio_enabled  
    source: [],
    // 任务执行的区域 
    executePlace: [],
    // 同步控制
    contarl: [],
    // 直播源
    newArray: [],

  },
  onLoad: function (options) {

    count++
    console.log("count", count)
    // let options = JSON.parse(options);
console.log("options",options)
    _place = JSON.parse(options.place);
    // detail = JSON.parse(options.detail);
    rmptList = JSON.parse(options.rmptList)
    detailId = options.id
    console.log("detailId===>", detailId);
    getMedia_requestId_array = []

    // this.getCtral(0, 20)
    this.getDetail(detailId)
    this.getCmd( cmd_off, cmd_cnt )

    this.listenMsg()
    this.setData({
      // taskDetail: detail,
      classfly: options.method,
      // layout: this.changLayout(detail.actions.layout),
      // enabled: detail.enabled
    })

  },
  // 同步控制格式化
  // changCtral: function () {
  //   let _contarl = detail.actions.device_sync;
  // },
    // 获取指令列表 
    getCmd: function (off, cnt) {
      app.globalData.requestId = app.globalData.requestId + 1;
      cmd_requestId  = app.globalData.requestId
      var request = {
        "msgname": "http_request",
        "msgid": app.globalData.requestId,
        "payload": {
          "path": util.addr.getCmd,
          "method": "get",
          "args": {
            "off": off,
            "cnt": cnt,
          }
        }
      }
      app.globalData.SocketTask.send({
        data: JSON.stringify(request),
      })
    },
  // 通过id获取当前的任务的详情
  getDetail: function (id) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    app.globalData.requestId = app.globalData.requestId + 1;
    detailId_requestId = app.globalData.requestId
    console.log(' // 通过id获取当前的任务的详情===>', detailId_requestId)

    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getLivelist,
        "method": "get",
        "args": {
          id
        }
      }
    }
    console.log(" JSON.stringify(request)==>", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        wx.showLoading({
          title: '加载中',
        })
      }
    })
  },
  // 获取执行区域的地址
  getexecutePlace(detail) {
    console.log("detail===>", detail)
    let _executePlace = []
    for (let items of detail.actions.place) {
      console.log("items==>", items)
      let sname = this.optionAction(_place, items)
      _executePlace.push(sname)
      console.log("_executePlace====>", _executePlace)
    }
    this.setData({
      executePlace: _executePlace
    })
  },
  // 
  listenMsg: function () {
    app.globalData.SocketTask.onMessage(res => {
      var res = JSON.parse(res.data);
      console.log("res= listMsg===>", res)
      if ('play_url' in res.payload && getMedia_requestId_array.includes(res.msgid)) {
        for (let items of cat3Url) {
          if (items.category == 1 && items.requestId == res.msgid) {
            if(res.payload.play_url == null){
              items.url = "无效的视频文件"
            }else{
              items.url = res.payload.play_url.url

            }
          }
        }
        this.setData({
          newArray: cat3Url
        })

      }
      // if ('play_url' in res.payload && res.payload.play_url != null && getMedia_requestId_array.includes(res.msgid)) {
      //   console.log("getMedia_requestId_array--->",getMedia_requestId_array)
      //   console.log("listMsg===------------------=>", res)
      //   this.sockerarr.push(res.payload.play_url.url)
      //   this.remove(res.msgid)
      //   console.log("删除后的 getMedia_requestId_array",getMedia_requestId_array)
      //   console.log("sockerarr===>", this.sockerarr)
      // }
      else if ( cmd_requestId == res.msgid) {
        console.log("res.payload.cmd_info_list.total",res.payload.cmd_info_list.total)
        if(res.payload.cmd_info_list.total > cmd_cnt){
          cmd_cnt = res.payload.cmd_info_list.total
          console.log("再整一遍")
          this.getCmd(cmd_off,cmd_cnt)
        }else {
          let cmdList = res.payload.cmd_info_list.cmd_property_list
          console.log("同步控制返回", cmdList)
          this.changCmd(cmdList, this.data.contarl)
          this.setData({
            contarl: this.data.contarl
          })
        }
     
        console.log("this.data.contarl===>", this.data.contarl)
      } else if (stop_requestId == res.msgid) {
        if (res.payload.result.text == "ok") {
          wx;
          wx.showToast({
            title: '停止运行！',
            duration: 2000,
          })
  
          this.getDetail(detailId)

        } else {
          wx;
          wx.showToast({
            title: '请求失败！',
            icon: 'none',

            duration: 2000
          })
        }

      } else if (run_requestId == res.msgid) {
        if (res.payload.result.text == "ok") {
          wx;
          wx.showToast({
            title: '立即运行！',
            duration: 2000,
          })

          this.getDetail(detailId)
        } else {

          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 2000
          })
        }

      } else if (detailId_requestId == res.msgid) {
        console.log("详情===========》", res)
        let _taskDetail = res.payload.task_info_list.task_property_list[0]

        switch (_taskDetail.repeat_mode) {
          case -1:
            _taskDetail.mode = "按需执行";
            break;
          case 0:
            _taskDetail.mode = "单次运行";
            break;
          case 1:
            _taskDetail.mode = "每天";
            break;
          case 2:
            _taskDetail.mode = "指定日期:";
            _taskDetail.prop = `${_taskDetail.repeat_prop[0]}月${_taskDetail.repeat_prop[1]}日`
            break;
          case 3:
            _taskDetail.mode = `指定星期：`;
            _taskDetail.prop = []
            _taskDetail.repeat_prop.filter(items => {
              switch (items) {
                case 0:
                  _taskDetail.prop.push("周日");
                  break;
                case 1:
                  _taskDetail.prop.push("周一");
                  break;
                case 2:
                  _taskDetail.prop.push("周二");
                  break;
                case 3:
                  _taskDetail.prop.push("周三");
                  break;
                case 4:
                  _taskDetail.prop.push("周四");
                  break;
                case 5:
                  _taskDetail.prop.push("周五");
                  break;
                case 6:
                  _taskDetail.prop.push("周六");
                  break;
                default:
                  _taskDetail.prop.push("按周重复");
                  break;
              }
            });
            break;
          case 4:
            _taskDetail.mode = "法定节假日";
            break;
          case 5:
            _taskDetail.mode = "非法定节假日";
            break;
        };
        switch (_taskDetail.enabled) {
          case true:
            _taskDetail.able = "启动中";
            break;
          case false:
            _taskDetail.able = "已暂停";
            break;
        };
        if(_taskDetail.next == 0){
          _taskDetail.next = "未设置"
        }else{
        _taskDetail.next = util.formatDate(_taskDetail.next * 1000)
        }

        if(_taskDetail.prev == 0){
          _taskDetail.prev = "未设置"
        }else{
        _taskDetail.prev = util.formatDate(_taskDetail.prev * 1000)
        }
    
        this.setData({
          stop_enabled:! _taskDetail.running ,
          run_enabled: _taskDetail.running,
        })

        console.log(" _taskDetail ===>", _taskDetail)
        this.getexecutePlace(_taskDetail)
        this.setData({
          taskDetail: _taskDetail,
          classfly: _taskDetail.method,
          layout: this.changLayout(_taskDetail.actions.layout),
          enabled: _taskDetail.enabled
        })
        if (_taskDetail.method == 1) {
          this.data.contarl = _taskDetail.actions.device_sync;
          this.changAudio(_taskDetail.actions.source)
          this.data.url = []
          this.get();
        } else if (_taskDetail.method == 0) {
          this.data.contarl = _taskDetail.actions.oplist;
        }
      }
//       else if(cmd_requestId == res.msgid){
//         let _syncControl1 = res.payload.cmd_info_list.cmd_property_list;
// console.log("指令列表=====================》",_syncControl1)
//       }
    })
  },
  indexOf: function (val) {
    for (var i = 0; i < getMedia_requestId_array.length; i++) {
      if (getMedia_requestId_array[i] == val) return i;
    }
    return -1;
  },
  // 删除数组中的指定元素
  remove: function (val) {
    var index = this.indexOf(val);
    console.log("val  index", val, index)
    if (index > -1) {
      getMedia_requestId_array.splice(index, 1);
    }
  },

  // 同步控制格式化
  changCmd: function (cmd, sync) {
    for (let item of cmd) {
      for (let items of sync) {
        if (item.name == items.method) {
          items.name = item.comment;
          for (let itemss of item.options) {
            if (items.attr == itemss.attr) {
              items.options = itemss
            }
          }

        }
      }
    }
  },
  // 序列化直播源
  // changarray: function (ary, cat3) {
  //   console.log("// 序列化直播源",ary)
  //   console.log("// 序列化直播源  cat3",cat3)
  //   if (ary.length == 0) {
  //     console.log("ary===>", ary)
  //     let _cat3 = []
  //     for (let item of cat3) {
  //       _cat3.push(item.url)
  //     }
  //     this.setData({
  //       newArray: _cat3
  //     })
  //   } else {
  //     for (let item of cat3) {
  //       console.log("item111111111111111>", ary)
  //       ary.splice(item.id, 0, item.url)
  //       console.log("ary===>", ary)
  //     }
  //     this.setData({
  //       newArray: ary
  //     })
  //   }
  //   console.log(" this.newArray==>", this.data.newArray)
  // },
  projectorChange: function () {
    this.setData({
      projector: !this.data.projector

    })
  },
  // 模式数字变大写数字
  changLayout: function (val) {
    if (val == 1) {
      return "一"
    } else if (val == 2) {
      return "二"
    } else if (val == 3) {
      return "三"
    } else if (val == 4) {
      return "四"
    } else if (val == 5) {
      return "五"
    } else if (val == 6) {
      return "六"
    } else if (val == 7) {
      return "七"
    } else if (val == 8) {
      return "八"
    }
  },
  // 获取任务详情
  get: function () {
    getMedia_requestId_array = []
    console.log("我在这里 ====================")
    this.newArray = []
    this.sockerarr = []
    cat3Url = []
    if (this.data.classfly == 1) {
      console.log("进入详情页时==》", this.data.url)
      let idd = 0;
      this.data.taskDetail.actions.source.map(items => {
        console.log("items --->", items)
        items.id = idd++
        if (items.category == 0) {
          let cat0 = {}
          cat0.id = idd - 1;
          cat0.category = 0;
          if (items.target != null && items.target != undefined && items.target != '') {
            cat0.url = items.target;
          } else {
            cat0.url = "无url播放地址";
          }
          cat3Url.push(cat0)
          console.log("cat1Url===>", cat3Url)
        } else if (items.category == 1) {
          this.getMedia(items)
          let cat1 = {}
          cat1.id = idd - 1;
          cat1.category = 1;
          cat1.requestId = this.requestId
          cat3Url.push(cat1)
          console.log("items.target===> url", this.data.url)
        } else if (items.category == 2) {
          let _rmpt = this.getRmpt(items.target)
          let cat2 = {}
          cat2.id = idd - 1;
          cat2.category = 2;

          cat2.url = _rmpt;
          cat3Url.push(cat2)
          console.log("cat2Url===>", cat3Url)
        } else if (items.category == 3) {
          let target = items.target.split(":")[0]
          console.log("tartget===>", target)
          let cat3 = {}
          let url_place = this.optionAction(_place, target)
          cat3.id = idd - 1;
          cat3.category = 3;

          cat3.url = url_place
          cat3Url.push(cat3)
          console.log("cat3Url===>", cat3Url)
        }
      })
      this.setData({
        newArray:cat3Url
      })
      console.log("cat3Url===>", cat3Url)
    }
    console.log("cat3Url===>", cat3Url)

  },

  // 暂停或启用任务
  modify: function (type) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    app.globalData.requestId = app.globalData.requestId + 1;
    if (type == "stop") {
      stop_requestId = app.globalData.requestId
    } else if (type == "run") {
      run_requestId = app.globalData.requestId
    }
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "method": "PUT",
        "path": util.addr.getLivelist,
        "args": {
          "id": detailId,
          "method": type
        }
      }
    }
    console.log("JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),

    })

  },
  stopModify: function () {
    if (!this.data.stop_enabled) {
      console.log("stopModify 暂停任务");
      this.modify("stop");
      stopModifyId = app.globalData.requestId;
    }

    // this.setData({
    //   method: this.data.method == "active" ? "deactive" : "active",
    //   isActive: !this.data.isActive
    // })
  },
  runModify: function () {
    if (!this.data.run_enabled) {
      console.log("stopModify 开启任务");
      this.modify("run");
    }
    // this.setData({
    //   method: this.data.method == "active" ? "deactive" : "active",
    //   isActive: !this.data.isActive
    // })
  },
  // 获取多媒体信息
  getMedia: function (item) {
    app.globalData.requestId = app.globalData.requestId + 1;
    this.requestId = app.globalData.requestId

    console.log("// 获取多媒体信息getMedia_requestId_array ", getMedia_requestId_array)
    getMedia_requestId_array.push(app.globalData.requestId)
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getMedia,
        "method": "get",
        "args": {
          "id": item.target
        }
      }
    }
    console.log(request)
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        console.log("发送请求成功！！")
      }
    })
  },
  go_record: function () {
    wx.navigateTo({
      url: `/pages/index/record/index?detailId=${detailId}`
    });
  },

  // 获取同步控制
  getCtral: function (off, cnt) {
    app.globalData.requestId = app.globalData.requestId + 1;
    this.requestId = app.globalData.requestId
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getCmd,
        "method": "get",
        "args": {
          "off": off,
          "cnt": cnt
        }
      }
    }
    console.log("request===>", request)

    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: () => {
        console.log("同步控制请求成功")
      }
    })
  },
  // 用id找到地址
  optionAction(array, id) {
    for (let item of array) {
      if (item.id == id) {
        placeName = item.name
        console.log('optionAction(id)', item.name, id)
        continue
      }
      if (item.items) {
        this.optionAction(item.items, id)
      }
    }
    return placeName
  },
  // 用id 找到 rmpt 音频 信息
  getRmpt: function (id) {
    for (let item of rmptList) {
      if (item.id == id) {
        return item.name
      }
    }
  },
  // 有声 无声
  changAudio: function (obj) {
    let _source = []
    obj.filter(items => {
      if (items.audio_enabled) {
        _source.push("有声")
      } else {
        _source.push("无声")
      }
    })
    this.setData({
      source: _source
    })
    console.log(' _source===>', _source)
  }
})