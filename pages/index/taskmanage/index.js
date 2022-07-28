//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')
let requestId0 = 0;
let requestId1 = 0;
let place = '';
let rmptList = [];
var page = 1;
let movedistance = 0;
let deleteID_requestId = '';
let disableItem_requestId = '';
let OpendisableItem_requestId = '';
let index = '';


// 加载数据 
var GetList = function (that) {
  that.setData({
    hidden: false
  });

}


Page({
  data: {
    currentIndex: 0,
    index: 0,
    // 多媒体任务列表
    tasklist: "",
    //物联任务列表
    wulianList: '',
    headtop: '',
    isShow: true,
    mode: true,
    isAdd: false,

    // 上拉加载
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  onShow: function () {},
  onLoad: function () {
    let that = this;
    that.getTasklist(1, 0, 20);
    that.getTasklist(0, 0, 20);
    that.getPlace();
    that.getRmpt();
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    that.listenMsg();

  },
  // 上拉加载数据
  bindDownLoad: function () {
    var that = this;
    GetList(that);
  },
  // 获取滚动位置的信息
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  onPullDownRefresh: function () {
    console.log("下拉")
  },
  onReachBottom: function () {
    console.log("上拉");
  },


  onReady: function () {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select("#taskpgTop").boundingClientRect(function (rect) {
      that.setData({
        'headtop': rect.height * 2
      });
    }).exec();
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  taskDetails: function (e) {
    console.log("e===>", e)
    // var detail = JSON.stringify(e.currentTarget.dataset.detail)
    let detail_id = e.currentTarget.dataset.detail.id
    // console.log("detail===>--------------------", detail)
    wx.navigateTo({
      url: `/pages/index/taskdetails/index?id=${detail_id}&method=${e.currentTarget.dataset.method}&place=${place}&rmptList=${rmptList}`,

    });
  },
  addTask: function () {
    // wx.navigateTo({
    //   url: '/pages/index/modifyTask/index?detail=${detail}&method=${e.currentTarget.dataset.method}&place=${place}&rmptList=${rmptList}'
    // });

    wx.navigateTo({
      url: '/pages/index/modifyTask/index',
    })

  },
  getTasklist: function (method, off, cnt) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    app.globalData.requestId = app.globalData.requestId + 1;
    if(method == 0){
      requestId0 = app.globalData.requestId
    }else if(method == 1){
      requestId1 = app.globalData.requestId
    }
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getLivelist,
        "method": "get",
        "args": {
          method,
          "off": off,
          "cnt": cnt
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
  // 发送获取地址
  getPlace: function () {
    app.globalData.requestId = app.globalData.requestId + 1;
    this.requestId = app.globalData.requestId
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getPlace,
        "method": "get",
      }
    }
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: function (res) {
        console.log("发送获取任务地址成功", res)
      }
    })
  },
  // 获取视频列表
  getRmpt: function () {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getLive,
        "method": "get",
      }
    }
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })
  },
  // 监听onMessage消息
  listenMsg: function () {

    app.globalData.SocketTask.onMessage(res => {
      var res = JSON.parse(res.data);
      // console.log("又有新消息了===》",res)
      wx.hideLoading();
      if ('task_info_list' in res.payload && requestId0 == res.msgid ||requestId1 == res.msgid) {
        console.log(" taskDetails res什么鬼？？？ ===>", res)
        if(res.payload.task_info_list.total != 0){

       
        var _tasklist = res.payload.task_info_list.task_property_list;
        _tasklist.map(item => {
          switch (item.repeat_mode) {
            case -1:
              item.mode = "按需执行";
              break;
            case 0:
              item.mode = "单次运行";
              break;
            case 1:
              item.mode = "每天";
              break;
            case 2:
              item.mode = "指定日期:";
              item.prop = `${item.repeat_prop[0]}月${item.repeat_prop[1]}日`
              break;
            case 3:
              item.mode = `指定星期：`;
              item.prop = []
              item.repeat_prop.filter(items => {
                switch (items) {
                  case 0:
                    item.prop.push("周日");
                    break;
                  case 1:
                    item.prop.push("周一");
                    break;
                  case 2:
                    item.prop.push("周二");
                    break;
                  case 3:
                    item.prop.push("周三");
                    break;
                  case 4:
                    item.prop.push("周四");
                    break;
                  case 5:
                    item.prop.push("周五");
                    break;
                  case 6:
                    item.prop.push("周六");
                    break;
                  default:
                    item.prop.push("按周重复");
                    break;
                }
              });
              break;
            case 4:
              item.mode = "法定节假日";
              break;
            case 5:
              item.mode = "非法定节假日";
              break;
          };
          // switch (item.enabled) {
          //   case true:
          //     item.able = "启动中";
          //     break;
          //   case false:
          //     item.able = "已暂停";
          //     break;
          // };
          // item.next = util.formatDate(item.next * 1000)
        })
        for(let i of _tasklist){
          i.isDisable = false
        }
        if (res.payload.task_info_list.task_property_list[0].method == 1) {
          this.setData({
            tasklist: _tasklist
          })
          console.log("this.data.tasklist", this.data.tasklist)
        } else if (res.payload.task_info_list.task_property_list[0].method == 0) {
          this.setData({
            wulianList: _tasklist
          })
          console.log("this.data.wulianList", this.data.wulianList)
        }
      }} else if ('place_info' in res.payload) {
        place = JSON.stringify(res.payload.place_info)
        console.log("获取任务地址成功 ", JSON.parse(place));
      } else if ("rtmp_info_list" in res.payload) {
        console.log("音频列表===>", res)
        rmptList = JSON.stringify(res.payload.rtmp_info_list.rtmp_property_list)
      } else if (deleteID_requestId == res.msgid) {
        console.log("删除任务是否成功", res)
        if (res.payload.result.text == 'ok') {
          if (this.data.mode) {
            this.data.wulianList.splice(index, 1)
            this.setData({
              wulianList: this.data.wulianList
            })
            this.slideAnimation(0, 300);
          } else {
            this.data.tasklist.splice(index, 1)
            this.setData({
              tasklist: this.data.tasklist
            })
            this.slideAnimation(0, 300);
          }
        }

      }else if(disableItem_requestId == res.msgid ){

        if(res.payload.result.text == 'ok'){
            if (this.data.mode) {
              this.data.wulianList[index].enabled = false
              this.setData({
                wulianList: this.data.wulianList
              })
        
            } else {
              this.data.tasklist[index].enabled = false
              this.setData({
                tasklist: this.data.tasklist
              })
  
            }
            wx.showToast({
              title: '禁用成功！',
              icon: 'none',
              duration: 1500
            })
       
          }else{
          wx.showToast({
            title: '禁用失败！',
            icon: 'none',
            duration: 1500
          })
        }
       
      }else if(OpendisableItem_requestId == res.msgid  ){
        if(res.payload.result.text == 'ok'){
            if (this.data.mode) {
              this.data.wulianList[index].enabled = true
              this.setData({
                wulianList: this.data.wulianList
              })
        
            } else {
              this.data.tasklist[index].enabled = true
              this.setData({
                tasklist: this.data.tasklist
              })
  
            }
            wx.showToast({
              title: '开启成功！',
              icon: 'none',
              duration: 1500
            })
       
          }else{
          wx.showToast({
            title: '开启失败！',
            icon: 'none',
            duration: 1500
          })
        }
       
      }
    })
  },
  // 任务切换
  taskChange: function () {
    this.setData({
      mode: !this.data.mode
    })
  },
  sortChange:function(){

  },
  onSearch: function () {
    console.log("父组件监听到搜索");
  },
  // 显示添加任务的类型
  isAdd: function () {
    let _isAdd = !this.data.isAdd;
    this.setData({
      isAdd: _isAdd
    })
  },
  // 去添加物联任务
  addWulian: function () {
    wx.navigateTo({
      url: '/pages/index/addtask/index',
    });
  },


  //  左移
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
      recordX = -400;
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
  modifyItem:function(e){
    console.log("修改任务===》",e)
    var detail = JSON.stringify(e.currentTarget.dataset.detail)
    console.log("detail===>", detail)
    if( !this.data.mode ){
      wx.navigateTo({
        url: `/pages/index/modifyTask/index?detail=${detail}&method=${e.currentTarget.dataset.method}&place=${place}&rmptList=${rmptList}`
      });
    }else{
      wx.navigateTo({
        url: `/pages/index/addtask/index?detail=${detail}&method=${e.currentTarget.dataset.method}&place=${place}&rmptList=${rmptList}`
      });
    }

  },

  // 删除当前任务
  deleteItem: function (e) {
    let that = this
    console.log("删除当前任务===>", e)
    let ID = e.currentTarget.dataset.deviceid
    index = e.currentTarget.dataset.index
    
    wx.showModal({
      title: '提示',
      content: '是否删除该条任务？',
      success(res) {
        if (res.confirm) {
          console.log("确定删除")
          that.taskID("DELETE",ID)
          deleteID_requestId = app.globalData.requestId;
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

  },
  // 开启当前任务

  //  禁用当前任务
  disableItem: function (e) {
    let that = this
    console.log("禁用当前任务===>", e)
    let ID = e.currentTarget.dataset.deviceid
    index = e.currentTarget.dataset.index
    let disable = e.currentTarget.dataset.disable
    if(disable == 'deactive'){
   
       wx.showModal({
        title: '提示',
        content: "是否禁用该条任务？",
        success(res) {
          if (res.confirm) {
            that.taskID("PUT", ID,disable )
            disableItem_requestId = app.globalData.requestId;
          }
        }
      });
    } else if(disable == 'active'){
      wx.showModal({
        title: '提示',
        content: "是否开启该条任务？",
        success(res) {
          if (res.confirm) {
            that.taskID("PUT", ID,disable )
            OpendisableItem_requestId = app.globalData.requestId;
          }
        }
      });

    }
  },

  //  删除当前任务
  taskID: function (method, ID, args_method) {
    console.log(" deleteID:function(ID)")
    app.globalData.requestId = app.globalData.requestId + 1;
    
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "method": method,
        "path": util.addr.getLivelist,
        "args": {
          "id": ID,
          "method": args_method
        }
      }
    }
    console.log("JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })
  },

})