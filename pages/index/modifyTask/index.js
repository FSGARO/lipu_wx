// pages/index/modifyTask/index.js
import {
  weekArr
} from '../../../utils/text.js'
const app = getApp();
const util = require('../../../utils/util.js');
// let come_count = 0;
let VideoRequestId = 0;
let MedioRequestId = 0;
let _layoutCount = 0;
let vedio_url = '';
let switch2Change = false;
let come_sync = [];
let isModify = false;
let addcontrol_requestId = ""
let VedioStr = {
  name: '',
  checked: false,
  category: '1',
  category_name:''
};
let dayss = [];
let weekCount = [];
let BackflowCount = 0;
let contralArray = [];
// 当前视频源的类型
let currentIndex = 0;
// 时间模型
let timeMode = 0;
let come_place = [];
let ID = ''

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainName: "添加",
    month_day_range: [
      ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日", "31日"]
    ],
    time_range: [
      ["00时", "01时", "02时", "03时", "04时", "05时", "06时", "07时", "08时", "09时", "10时", "11时", "12时", "13时", "14时", "15时", "16时", "17时", "18时", "19时", "20时", "21时", "22时", "23时", "24时"],[ "00分", "01分", "02分", "03分", "04分", "05分", "06分", "07分", "08分", "09分", "10分", "11分", "12分", "13分", "14分", "15分", "16分", "17分", "18分", "19分", "20分", "21分", "22分", "23分", "24分", "25分", "26分", "27分", "28分", "29分", "30分", "31分", "32分", "33分", "34分", "35分", "36分", "37分", "38分", "39分", "40分", "41分", "42分", "43分", "44分", "45分", "46分", "47分", "48分", "49分", "50分", "51分", "52分", "53分", "54分", "55分", "56分", "57分", "58分", "59分", "60分"],
       [ "00秒", "01秒", "02秒", "03秒", "04秒", "05秒", "06秒", "07秒", "08秒", "09秒", "10秒", "11秒", "12秒", "13秒", "14秒", "15秒", "16秒", "17秒", "18秒", "19秒", "20秒", "21秒", "22秒", "23秒", "24秒", "25秒", "26秒", "27秒", "28秒", "29秒", "30秒", "31秒", "32秒", "33秒", "34秒", "35秒", "36秒", "37秒", "38秒", "39秒", "40秒", "41秒", "42秒", "43秒", "44秒", "45秒", "46秒", "47秒", "48秒", "49秒", "50秒", "51秒", "52秒", "53秒", "54秒", "55秒", "56秒", "57秒", "58秒", "59秒", "60秒"]
    ],
    title_name: "添加多媒体任务",
    sync_tabCon: false,
    // 已选学校
    VALUE :  '2016-09-01',
    currentVedio: [],
    schollCount: [],
    // 只让一个位置组件显示
    siteOne: true,
    rtmpList: [],
    source: [],
    switch2Checked: false,
    LayoutArray: [],
    onChoose: "1",
    // 修改前选中的布局
    currentLayout: 0,
    isYPdetail: false, 
    isSiteDetail: false,
    tabtype: 'tab1',
    pickercol: false,
    isweek: false,
    array: ['优先级1', '优先级2', '优先级3', '优先级4'],
    index: 0,
    // 执行时间
    playtime:[],
    syncval: '-1',
    syncControl1: [],
    // 当前选中的时间模型
    timeMode: '-1',
    // 当前选中的同步控制
    ctroItems: {},
    repeat_mode: [
      {
        mode: -1,
        name: "按需",
        isChecked:false
      },
      {
        mode: 0,
        name: "单次",
        isChecked:false
      },
      {
        mode: 1,
        name: "每天",
        isChecked:false
      },
      {
        mode: 2,
        name: "指定日期",
        isChecked:false
      },
      {
        mode: 3,
        name: "按周重复",
        isChecked:false
      },
      {
        mode: 4,
        name: "法定节假日",
        isChecked:false
      },
      {
        mode: 5,
        name: "非法定节假日",
        isChecked:false
      },
    ],
    weekArr: weekArr,
    // 按周重复
    weekVal: [],
    // 指定日期
    dayVal: [], 
    vedioList: [],
    medioList: [],
    isChoose: false,
    SiteChoose: false,
    // 任务名称
    TaskName: '',
    // 当前选中的音频源的id
    MedioId: '',
    VedioArray: ["URL地址", "视频文件", "直播流", "本地回环"],
    // 当前选中的音频源
    VedioArrayIndex: "",
    treesArr: [],
    treeArr: [],
    backflowArray: [{
        id: 0,
        name: "电脑HDMI",
        isChecked: false,
      },
      {
        id: 1,
        name: "笔记本HDMI",
        isChecked: false,
      },
      {
        id: 2,
        name: "投屏HDMI",
        isChecked: false
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("count========================>",come_count)
    console.log("进入多媒体页面 options=====>",options)
    console.log("刚进入页面 已选学校  schollCount", this.data.schollCount)
  if(JSON.stringify(options) != "{}"){
    isModify = true
    console.log("修改任务==》", options)
    let _place = JSON.parse(options.place);
    let _detail = JSON.parse(options.detail);
    console.log("_detail===>",_detail)
    // let _detail_clock = _detail.clock;

    if(_detail.actions.audio_task){
      this.data.currentVedio = []
      console.log("_detail.actions.source==1==>",_detail.actions.source[0])
      console.log("_detail.actions.source==2==>",_detail.actions.source[0].target)
      console.log("_detail.actions.source==3==>",_detail.actions.source)
      for( let item of _detail.actions.source){
        console.log('item---->',item , item.name, item.category_name )
        VedioStr.name = item.target;
        VedioStr.category_name = item.category_name 
        this.data.currentVedio.push(VedioStr)
      }
      this.setData({
        currentVedio:this.data.currentVedio
      })
      console.log("currentVedio===>",this.data.currentVedio)
    }else{
      for (let item of _detail.actions.source) {
        item.checked = item.audio_enabled
        item.name = item.target
        switch (item.category) {
          case 0:
            item.category_name = "URL地址";
            break;
          case 1:
            item.category_name = "视频文件";
            break;
          case 2:
            item.category_name = "直播流";
            break;
          case 3:
            item.category_name = "本地回环";
            break;
        }
  
      }
      this.setData({
        LayoutArray: _detail.actions.source,
      })
    }
    come_sync = _detail.actions.device_sync;
    contralArray = come_sync
    console.log("come_sync===>",come_sync)
    this.data.timeMode  = _detail.repeat_mode
    if (this.data.timeMode == 3) {
    //  weekCount = repeat_prop
    //  weekCount = _detail.prop
    this.setData({
      weekVal : _detail.prop
    })
    } else if (this.data.timeMode == 2) {
      console.log("_detail.prop====>",_detail.prop)
      //  dayss = _detail.repeat_prop
      //  dayss = _detail.prop
      this.data.dayVal.push(_detail.prop)
      this.setData({
        dayVal : this.data.dayVal
      })
    }

    console.log("任务详情==》", _detail)
    ID = Number(_detail.id);
    let place = this.copyArr(_place);
    let places = this.copyArr(_place);
    let _repeat_mode = _detail.repeat_mode;
    // this.come_radioValue(_repeat_mode)

    this.changPlace(place)
    this.changPlace(places)
    come_place = _detail.actions.place
    this.data.schollCount = []

    places = this.checkedTree(places)
    this.PickSchool(places)
    console.log("places===>",places)
    console.log("come_place==>",come_place)
 
     
    for( let item of this.data.repeat_mode){
      if( item.mode == _repeat_mode){
        item.isChecked = true 
      }
    }
    this.come_radioValue(_repeat_mode)


    this.setData({
      treeArr: place,
      treesArr: places,
      currentLayout: _detail.actions.layout - 1,
      title_name: "修改任务",
      TaskName: _detail.name,
      schollCount : this.data.schollCount,
      repeat_mode : this.data.repeat_mode,
      mainName: "修改",
     
    })

    if(_detail.clock != null ){
      this.setData({
        playtime :_detail.clock
      })
    }
    console.log(" 修改前选中的布局 ",this.data.currentLayout)
  }else{
    this.getPlace()
    come_sync  = []
  }
 
    console.log("syncControl1--->",this.data.syncControl1)
    console.log("  LayoutArray", this.data.LayoutArray)
    this.getCmd(0, 32),
      // this.getPlace(), 
      this.getTaskMedia("video", 0, 10, "VideoRequestId"),
      this.getTaskMedia("audio", 0, 10, 'MedioRequestId'),
      this.getTasklist(0, 10),
      this.listenMsg()
  
  

  },
  // 去重
  arry_qucong : (arr) => {
          for (let shu of arr) {
            if (shu.options) {
              let obj = {};
              shu.options = shu.options.reduce(function (
                item,
                next
              ) {
                obj[next.attr]
                  ? ""
                  : (obj[next.attr] = true && item.push(next));
                return item;
              },
              []);
            }
          }
          return arr;
        },
  // 进入修改后的位置的改变
checkedTree : function(array) {
    for(let item of array) {
        for(let arrid of come_place) {
            if(item.id == arrid) {
                item.checked = true;
            }
        }
        if(item.items) {
            this.checkedTree(item.items);
        }
    }
    return array;
},
  // 获取指令列表  
  getCmd: function (off, cnt) {
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
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
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
      data: JSON.stringify(request)
    })
  },
  // 获取直播流 
  getTasklist: function (off, cnt) {
    console.log("33333333333333")
    app.globalData.requestId = app.globalData.requestId + 1;
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.getLive,
        "method": "get",
        "args": {
          "off": off,
          "cnt": cnt
        }
      }
    }
    console.log(" JSON.stringify(request)", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })

  },
  // 获取人物的音视频列表 
  getTaskMedia: function (mode, off, cnt, RqustId) {
    app.globalData.requestId = app.globalData.requestId + 1;
    this.requestId = app.globalData.requestId;
    console.log("RqustId==>", RqustId);
    if (RqustId == "VideoRequestId") {
      VideoRequestId = this.requestId;
    } else if (RqustId == "MedioRequestId") {
      MedioRequestId = this.requestId;
    }
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.TaskMedia,
        "method": "get",
        "args": {
          "mode": mode,
          "off": off,
          "cnt": cnt
        }
      }
    }
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
    })

  },

  // 监听onMessage消息
  listenMsg: function () {
    app.globalData.SocketTask.onMessage(res => {
      var res = JSON.parse(res.data)
      console.log("获取指令列表==》", res)
      if(addcontrol_requestId == res.msgid ){
        console.log("?????????????????????/")
        if(res.payload.result.text == "ok"){
          if(isModify){
            wx.showToast({
              title: '修改成功！',
              icon: 'none',
              duration: 1500
            })
            wx.navigateTo({
              url: '/pages/index/taskmanage/index'
            });
          }else{
            wx.showToast({
              title: '创建成功！',
              icon: 'none',
              duration: 1500
            })
            wx.navigateTo({
              url: '/pages/index/taskmanage/index'
            });
          }
        }else{
          if(isModify){
            wx.showToast({
              title: '修改失败！',
              icon: 'none',
              duration: 1500
            })
          }else{
            wx.showToast({
              title: '创建失败！',
              icon: 'none',
              duration: 1500
            })
          }
        }

      }
     else if ('cmd_info_list' in res.payload) {
        let _syncControl1 = res.payload.cmd_info_list.cmd_property_list;
        for (let item of _syncControl1) {
          item.checkbox = false;
          item.mode = 0 ;
          item.attr = "";
          item.data = "";
          if(item.options != null){
            for (let items of item.options) {
              items.checkbox = false
            }
            item.options[0].checkbox = true
          }
        }
        if( come_sync.length != 0 ){
        _syncControl1 = this.come_syncFuc(_syncControl1)

        }
        _syncControl1 = this.arry_qucong(_syncControl1)
        this.setData({
          syncControl1: _syncControl1
        })
        console.log("syncControl1-->",_syncControl1)
      } else if ('media_list' in res.payload && res.msgid == VideoRequestId) {
        let _vedioList = this.data.vedioList;
        let media_list = res.payload.media_list.media_property_list
        for (let item of media_list) {
          item.isChecked = false
        }
        _vedioList = _vedioList.concat(media_list);
        this.setData({
          vedioList: _vedioList
        })
        console.log("vedioList===>", this.data.vedioList)

      } else if ('media_list' in res.payload && res.msgid == MedioRequestId) {
        let _medioList = this.data.medioList;
        let media_List = res.payload.media_list.media_property_list
        for (let item of media_List) {
          item.isChecked = false
        }
        _medioList = _medioList.concat(media_List);
        this.setData({
          medioList: _medioList
        })
        console.log("medioList===>", this.data.medioList)

      } else if ("rtmp_info_list" in res.payload) {
        console.log("res==>", res)
        let _list = res.payload.rtmp_info_list.rtmp_property_list;
        this.setData({
          rtmpList: _list
        });
        console.log("rtmpList==>", _list)
      }else if ('place_info' in res.payload) {
        let place = this.copyArr(res.payload.place_info);
          let places = this.copyArr(res.payload.place_info);
        this.changPlace(places)
        this.changPlace(place)
        // this.checkedTree(places)
        // this.PickSchool(places)
        this.setData({
          treeArr:  place,
          treesArr: places,
          // schollCount: this.data.schollCount
        })

        console.log("获取任务地址成功 ", places);
      }
    })
  },
  // 将come进来的sycn放入syncControl1原数组中
  come_syncFuc:function(array) {
    for(let item of array) {
        for(let arrs of come_sync ) {
          // console.log("arrs==============>",arrs)
            if(item.name == arrs.method ) {
                item.checkbox = true;
                item.mode = arrs.mode;
                item.attr = arrs.attr;
                item.data = arrs.data;
                for( let item_options of item.options ){
                  if(item_options.attr ==arrs.attr ){
                    item_options.checkbox = true
                  }
                }
                
            }
        }   
    }
    return array;
},
  // 数组的深拷贝
  copyArr: function (oldArr) {
    let newArr = [];
    newArr = JSON.parse(JSON.stringify(oldArr));
    return newArr;
  },
  // 遍历地址
  changPlace: function (arrays) {
    for (let item of arrays) {
      item.checked = false;
      item.collapse = false;
      if (item.items) {
        this.changPlace(item.items)
      }
    }
  },

    // 单选遍历地址
    changPlacess: function (arrays) {
      for (let item of arrays) {
        item.checked = false;
        // item.collapse = false;
        if (item.items) {
          this.changPlacess(item.items)
        }
      }
    },

  audioVal: function (e) {
    console.log("pickerValue==>", e)
    let val =this.data.time_range[0][e.detail.value[0]].slice(0,2)  + ":" + this.data.time_range[1][e.detail.value[1]].slice(0,2) + ":" + this.data.time_range[2][e.detail.value[2]].slice(0,2)
    let _playtime = this.data.playtime
    console.log("this.data.playtime===>",this.data.playtime)
    if (_playtime.indexOf(val) < 0) {
   
      _playtime.push(val);
      this.setData({
        playtime: _playtime
      })
      console.log(" playtime ", this.data.playtime)
    }
  },

  onWeek: function (e) {
    console.log("e==>", e)
    const type = e.detail.type;
    this.setData({
      isweek: !this.data.isweek
    });
    if (type == 'sure') {
      console.log("获取传回的信息")
      console.log(e.detail.val)
      var resultArr = e.detail.val;
      this.setData({
        weekArr: resultArr
      });
      var weekVal = [];
      let count = 0
      for (let item of resultArr) {
        if (item.check) {
          weekVal.push(item.text)
          weekCount.push(parseInt(count))
        }
        count++
      }
      console.log("返回星期")
      console.log("weekVal",weekVal)
      console.log(weekCount)
      this.setData({
        weekVal: weekVal
      });
    }
  },
  // 是否弹出音频选择框   
  chooseMedio: function () {
    console.log("是否弹出音频选择框 ===>")
    if (this.data.tabtype == 'tab2' && this.data.LayoutArray.length > 0) {
      console.log("this.data.LayoutArray.length", this.data.LayoutArray.length)
      this.setData({
        currentVedio: []
      })
    } else if (this.data.tabtype == 'tab1' && this.data.currentVedio.length > 0) {
      console.log("this.data.currentVedio.length>0", this.data.currentVedio.length)
      this.setData({
        LayoutArray: []
      })
    }

    this.setData({
      isChoose: !this.data.isChoose
    })
  },
  back:function(){
    this.setData({
      isChoose: !this.data.isChoose
    })
  },
  //位置选择确定 
  goSite: function () {
    this.setData({
      SiteChoose: !this.data.SiteChoose
    })
  },


  onAddtask: function () {
    let _prop = []
    if (this.data.timeMode == 3) {
      _prop = weekCount
    } else if (this.data.timeMode == 2) {
      for (let i of this.data.dayVal) {
        let _i = ''
        _i = i.split("月");
        _i[0] = parseInt(_i[0])
        _i[1] =parseInt(_i[1].split("日")[0]) 
        console.log("_i===============>", _i)
        _prop = _prop.concat(_i)
      }
      console.log("_prop===>",_prop)
    }
    let _source = []
    if (this.data.LayoutArray.length > 0) {
      for (let v of this.data.LayoutArray) {
        let _sourceItem = {};
        _sourceItem.category = parseInt(v.category);
        _sourceItem.audio_enabled = v.checked;
        if (v.category == 3) {
          _sourceItem.target = v.ids;
        } else {
          _sourceItem.target = v.name;
        }
        _source.push(_sourceItem)
      }
    } else {
      for (let v of this.data.currentVedio) {
        let _sourceItem = {};
        _sourceItem.category = parseInt(v.category);
        _sourceItem.audio_enabled = v.checked;
        _sourceItem.target = v.name;
        _source.push(_sourceItem)
      }
    }

    // 硬件同步控制

    let device_sync = [];
    console.log(" 硬件同步控制contralArray---> ",contralArray)
    for (let v of contralArray) {
      let device_syncItem = {}
      device_syncItem.mode = parseInt(v.mode)
      if(v.name){
        device_syncItem.method = v.name 
      }else{
      device_syncItem.method = v.method 
      }
      if (v.attr == '') {
        device_syncItem.attr = parseInt(0)
      } else {
        device_syncItem.attr = parseInt(v.attr)
      }
      if(v.data == null){
        device_syncItem.data = ""
      }else{
        device_syncItem.data = v.data
      }
      device_sync.push(device_syncItem)
    }
    console.log("device_sync===>", device_sync)


    console.log("组件onAddtask===>")
    console.log("source===>", _source)
    // let _clock = []
    // for (let time of this.data.playtime) {
    //   console.log("time", time)
    //   time = time + ":00"
    //   console.log("time", time)
    //   _clock.push(time)

    // }
    let _mode = '';
    for(let mode of this.data.repeat_mode){
      if(mode.isChecked){
        _mode = mode.mode
      }
    }
    console.log("_mode===========>",_mode)
    
    let plan = {
      "clock": this.data.playtime== null ? []:this.data.playtime  ,
      "repeat": {
        "mode": parseInt(_mode),
        "prop": _prop
      }
    }
    let _place = []
    for (let i of this.data.schollCount) {
      _place.push(i.id)
    }

    let options = {
      "place": _place,
      "audio_task": this.data.currentVedio.length > 0? true: false,
      "priority": parseInt(this.data.index),
      "duration": 0,
      "layout": _layoutCount,
      "source": _source,
      "device_sync": device_sync
    }

    // let params = {
    //   "name":this.data.TaskName,
    //   "plan" : plan,
    //   "options" : options,
    // }
    // this.creatTast(this.data.TaskName, plan, options)
    // this.modifyTast(this.data.TaskName, plan, options)
    if(isModify){
      console.log("修改当前任务")
    this.modifyTast(this.data.TaskName, plan, options);
    }else{
      console.log("创建任务")
    this.creatTast(this.data.TaskName,plan,options);
    }

    // this.triggerEvent('onAddtask', )
  },

  // 创建多媒体任务
  creatTast: function (name, plan, options) {
    app.globalData.requestId = app.globalData.requestId + 1;
    // this.requestId = app.globalData.requestId
    addcontrol_requestId = app.globalData.requestId
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId,
      "payload": {
        "path": util.addr.creatMadie,
        "method": "POST",
        "data": {
          name,
          plan,
          options
        }
      }
    }
    console.log("request", request)
    console.log("JSON.stringify(request)=====>", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: (res) => {
        console.log("添加多媒体任务成功", res)
      },
      fail: (err) => {
        console.log("添加多媒体任务失败", err)

      }
    })
  },
  // 修改任务
  modifyTast: function (name,plan,options) {
    app.globalData.requestId = app.globalData.requestId + 1;
    // this.requestId = app.globalData.requestId
    addcontrol_requestId = app.globalData.requestId
    var request = {
      "msgname": "http_request",
      "msgid": app.globalData.requestId , 
      "payload": {
        // "path": util.addr.creatMadie + `?id =` + ID,
        "method": "PUT", 
        "path": util.addr.getLivelist ,
        "args": {
          "id": ID,
          "method": "modify",
        },

        "data":{
          name,
          plan,
          options,
        }

      }
    }
    console.log("request", request)
    console.log("JSON.stringify(request)=====>", JSON.stringify(request))
    app.globalData.SocketTask.send({
      data: JSON.stringify(request),
      success: (res) => {
        console.log("添加多媒体任务成功", res)
      },
      fail: (err) => {
        console.log("添加多媒体任务失败", err)

      }
    })
  },

  toggleWeek: function () {
    this.setData({
      isweek: true
    });
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log("优先级", this.data.index)

  },
  // 请选择视频源  17373075705
  bindPickerInput: function (e) {
    console.log(" bindPickerInput==>", e);
    this.setData({
      VedioArrayIndex: e.detail.value
    })

  },
  changeSync: function (e) {
    console.log("this.data.syncControl1==>", this.data.syncControl1)
    console.log("e==>", e)
    const index = e.currentTarget.dataset.index;
    const items = e.currentTarget.dataset.items;

    this.setData({
      syncval: index,
      ctroItems: items,
      sync_tabCon: true
    });

  },
  changePattern: function (e) {
    const type = e.currentTarget.dataset.type;
    const key1 = 'syncControl[2].pattern[0].check';
    const key2 = 'syncControl[2].pattern[1].check';
    const key3 = 'syncControl[2].pattern[2].check';
    this.setData({
      [key1]: false,
      [key2]: false,
      [key3]: false
    });
    if (type == 'tab1') {
      const key = 'syncControl[2].pattern[0].check';
      this.setData({
        [key1]: !this.data.syncControl[2].pattern[0].check
      });
    } else if (type == 'tab2') {
      const key = 'syncControl[2].pattern[1].check';
      this.setData({
        [key2]: !this.data.syncControl[2].pattern[1].check 
      });
    } else {
      const key = 'syncControl[2].pattern[2].check';
      this.setData({
        [key3]: !this.data.syncControl[2].pattern[2].check
      });
    }
  },
  // 同步控制里面的选项 例如 上下课 中的 上课 或是下课按钮  
  radioChange: function (e) {
    console.log("radioChange===>", e)
    let _attr = e.detail.value;
    let _ctroItems = this.data.ctroItems
    for (let item of _ctroItems.options) {
      if (item.attr == _attr) {
        item.checkbox = !item.checkbox
      } else {
        item.checkbox = false;

      }
    }
    this.itemChange(this.data.ctroItems)

  },
  changeDegree: function (e) {
    const type = e.currentTarget.dataset.type;
    var degree = this.data.syncControl[2].degree;
    var degreeStr = 'syncControl[2].degree';
    const that = this;
    if (type == 'add') {
      console.log("add")
      that.setData({
        [degreeStr]: parseInt(degree) + 1
      });
    } else if (type == 'reduce' && parseInt(degree) > 1) {
      console.log("reduce")
      that.setData({
        [degreeStr]: parseInt(degree) - 1
      });
    }
  },
  // 同步控制点击选择框
  checkboxChangesync: function (e) {
    console.log("checkboxChangesync=>", e)
    this.data.ctroItems.checkbox = !this.data.ctroItems.checkbox;
    this.setData({
      ctroItems: this.data.ctroItems
    })
    this.itemChange(this.data.ctroItems)
    console.log("this.data.ctroItems==>", this.data.ctroItems)

  },
  changeMedio: function (e) {
    console.log("changeMedio===>", e)
    this.setData({
      MedioId: e.detail.value
    })
  },

  // 将改变后的同步控制的某个 item  替换原有的 数组的 item  
  itemChange: function (obj) {
    console.log("itemChange obj===>", obj)
    console.log("contralArray", contralArray)
    if (obj.checkbox) {
      let vv = 0;
      for (let v of contralArray) {
        if (v.id == obj.id) {
          v.options = obj.options;
          v.mode = obj.mode;
          v.attr = obj.attr;
          vv++
        }
      }
      if (vv == 0) {
        contralArray.push(obj)
      }
      console.log("contralArray", contralArray)
    } else {
      let i = 0;
      for (let v of contralArray) {
        if (v.id == obj.id) {
          contralArray.splice(i, 1)
        }
        i++
      }
    }
    console.log(" this.contralArray==>", contralArray)
    for (let item of this.data.syncControl1) {
      if (item.id == obj.id) {
        console.log("id==>", obj)
        item.checkbox = obj.checkbox
        item.options = obj.options
        item.mode = obj.mode;
        item.attr = obj.attr;
        item.data = obj.data;
      }
    }
    this.setData({
      syncControl1: this.data.syncControl1
    })
    console.log("item==>", this.data.syncControl1)
  },
  //指令附加条件
  add_term: function (e) {
    console.log(" add_term==>", e)
    let _data = e.detail.value;
    this.data.ctroItems.data = _data;
    this.itemChange(this.data.ctroItems)

  },

  // 输入的延时时间
  delay_time: function (e) {
    console.log(" delay_time==>", e)
    let attr_count = parseInt(e.detail.value)
    if (attr_count > 0) {
      this.data.ctroItems.mode = 1;

    } else {
      this.data.ctroItems.mode = 0;
    }
    this.data.ctroItems.attr = attr_count;
    this.itemChange(this.data.ctroItems)

  },
  // 输入任务名称
  inputValue: function (e) {
    console.log(" 输入任务名称==>", e)
    this.setData({
      TaskName: e.detail.value
    })
  },
  radioValue: function (e) {
    console.log(" radioValue==>", e)
    // timeMode = e.detail.value
    let _timeMode = e.detail.value
    console.log("_timeMode",_timeMode)
    for( let mode of this.data.repeat_mode){
      mode.isChecked = false
      if( mode.mode == _timeMode){
        mode.isChecked = true
      }
    }
    let _timeArry = ['0', '1', '4', '5']
    if (_timeArry.indexOf(_timeMode) > -1) {
      this.setData({
        timeMode: "6"
      })
    } else {
      this.setData({
        timeMode: _timeMode
      })
    }
    console.log('timeMode', this.data.timeMode)

  },

  come_radioValue: function (mode) {
 console.log("mode==>",mode)
    let _timeMode = mode
    let _timeArry = [0, 1, 4, 5]
    if (_timeArry.indexOf(_timeMode) > -1) {
      this.setData({
        timeMode: "6"
      })
    } else {
      this.setData({
        timeMode: _timeMode
      })
      console.log('timeMode', this.data.timeMode)
    }
  },
  // 删除已经选择的时间
  del_item: function (e) {
    console.log("点击成功==>", e)
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    console.log("type==>", type)
    if (type == 'weekVal') {
      this.data.weekVal.splice(index, 1);
      this.setData({
        weekVal: this.data.weekVal
      })
    } else if (type == 'playtime') {
      this.data.playtime.splice(index, 1);
      this.setData({
        playtime: this.data.playtime
      })
    } else if (type == 'dayVal') {
      this.data.dayVal.splice(index, 1);
      this.setData({
        dayVal: this.data.dayVal 
      })
    }

  },
  // 监听输入指定时间
  pickerValue: function (e) {
    console.log("pickerValue==>", e)
    // this.data.month_day_range[e.detail[0]]

    // let day = e.detail.value
    let day = this.data.month_day_range[0][e.detail.value[0]] + this.data.month_day_range[1][e.detail.value[1]]
    console.log("day===========>", day)
    this.data.dayVal[0] = day
      this.setData({
        dayVal : this.data.dayVal
      })

    // let days = this.data.dayVal[0].split("月");
    // dayss = [];
    // dayss[0] = parseInt(days[0])
    // dayss[1] = parseInt(days[1])
    // console.log("days===>", days)
    // console.log("dayss===>", dayss)
    // console.log(this.data.dayVal)
  },
  tabChange: function (e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      tabtype: type
    });
  },
  // 获取已选的布局 

  toggleLayout: function (e) {
    console.log("父级toggleLayout   ===》", e)
    this.setData({
      currentLayout: e.detail,
      onChoose: "1",
      LayoutArray: []
    })
    _layoutCount = this.data.currentLayout.substring(this.data.currentLayout.length - 1) - 1
    console.log("currentLayout", this.data.currentLayout, _layoutCount)

  },
  // 已选布局的布局顺序
  onChoose: function (e) {
    console.log("onChoose", e)
    this.setData({
      onChoose: e.detail
    })
  },
  // tree 单选
  treeTap: function (e) {
    this.changPlacess(this.data.treeArr)
    console.log(" treeTap", this.data.treeArr)
    let obj = e.detail.item
    console.log("父级treeTap obj===>", obj)
    if (!obj.checked) {
      let index = this.data.onChoose - 1;
      if (this.data.LayoutArray[index] == undefined) {
        console.log("111111111")
        let str = {}
        str.name = obj.name;
        str.ids = obj.id + ':' + BackflowCount;
        str.checked = switch2Change;
        str.category = this.data.VedioArrayIndex;
        str.category_name = "本地回环";
        this.data.LayoutArray[index] = str;
      } else {
        console.log("222222222")

        this.data.LayoutArray[index].name = obj.name;
        this.data.LayoutArray[index].ids = obj.id + ':' + BackflowCount;
        this.data.LayoutArray[index].category_name = "本地回环";
        this.data.LayoutArray[index].checked = switch2Change;
        this.data.LayoutArray[index].category = this.data.VedioArrayIndex;
      }


      this.setData({
        LayoutArray: this.data.LayoutArray
      })
      console.log(" this.data.LayoutArray==>", this.data.LayoutArray)
    } else {
      let index = this.data.onChoose - 1
      this.data.LayoutArray.splice(index, 1)
      for (let item of this.data.backflowArray) {
        item.isChecked = false
      }
      this.setData({
        LayoutArray: this.data.LayoutArray,
        backflowArray: this.data.backflowArray

      })
      console.log(" this.data.LayoutArray==>", this.data.LayoutArray)


    }
    this.opposite(this.data.treeArr, obj)

    console.log(" (this.data.treeArr)==>", this.data.treeArr)

    this.setData({
      treeArr: this.data.treeArr
    })
  },
  // 获得已选学校
  PickSchool: function (arry) {
    for (let item of arry) {
      if (item.checked && !item.items) {
        this.data.schollCount.push(item)
      } else if (item.items) {
        this.PickSchool(item.items)
      }
    }
  },

  treeTapp: function (e) {
    console.log(this.data.treesArr, this.data.treeArr)
    console.log("treeTapp", e)
    let obj = e.detail.item
    for (let item of this.data.treesArr) {
      if (item.id == obj.id) {
        item.checked = !item.checked
        if (item.items) {
          this.isChecked(item.items, item.checked)
        }
      } else {
        if (item.items) {
          for (let twos of item.items) {
            if (twos.id == obj.id) {
              twos.checked = !twos.checked
              if (twos.items) {
                this.isChecked(twos.items, twos.checked)
              }
            } else {
              if (twos.items) {
                for (let trees of twos.items) {
                  if (trees.id == obj.id) {
                    trees.checked = !trees.checked
                    if (trees.items) {
                      this.isChecked(trees.items, trees.checked)
                    }
                  } else {
                    if (trees.items) {
                      for (let four of trees.items) {
                        if (four.id == obj.id) {
                          four.checked = !four.checked
                        }
                      }
                      //判断同级checked是否都为true
                      let trueFour = trees.items.every(function (res) {
                        return res.checked == true;
                      })
                      if (trueFour) {
                        trees.checked = true;
                      }
                      //判断同级checked是否有一个为false
                      let falseFour = trees.items.some(function (res) {
                        return res.checked == false;
                      })
                      if (falseFour) {
                        trees.checked = false;
                        twos.checked = false;
                        item.checked = false;
                      }
                    }
                  }
                }
                //判断同级checked是否都为true
                let trueThree = twos.items.every(function (res) {
                  return res.checked == true;
                })
                if (trueThree) {
                  twos.checked = true;
                }
                //判断同级checked是否有一个为false
                let falseFour = twos.items.some(function (res) {
                  return res.checked == false;
                })
                if (falseFour) {
                  twos.checked = false;
                  item.checked = false;
                }
              }
            }
          }
          //判断同级checked是否都为true
          let trueTwo = item.items.every(function (res) {
            return res.checked == true;
          })
          if (trueTwo) {
            item.checked = true;
          }
          //判断同级checked是否有一个为false
          let falseFour = item.items.some(function (res) {
            return res.checked == false;
          })
          if (falseFour) {
            item.checked = false;
          }
        }
      }
    }
    this.data.schollCount = []
    this.PickSchool(this.data.treesArr)

    console.log("已选学校", this.data.schollCount)
    this.setData({
      treesArr: this.data.treesArr,
      schollCount: this.data.schollCount
    })
  },
  // trees  多选
  opposite: function (tree, obj) {
    for (let item of tree) {
      if (item.id == obj.id) {
        console.log("item.checked===>", item.checked)
        item.checked = !obj.checked
        return
      } else if (item.items) {
        this.opposite(item.items, obj)
      }

    }
  },

  isChecked(item, checked) {
    for (let two of item) {
      two.checked = checked
      if (two.items) {
        for (let tree of two.items) {
          tree.checked = checked
          if (tree.items) {
            for (let fouth of tree.items) {
              fouth.checked = checked
            }
          }
        }
      }
    }
    return item
  },
  //点击行  父页面添加 bind:treeTaps="treeTaps"
  treeTaps: function (e) {
    console.log(" treeTaps 父级", e)
    let obj = e.detail.item
    for (let item of this.data.treeArr) {
      if (item.id == obj.id) {
        item.collapse = !obj.collapse
      } else {
        if (item.items) {
          for (let two of item.items) {
            if (two.id == obj.id) {
              two.collapse = !obj.collapse
            } else {
              if (two.items) {
                for (let tree of two.items) {
                  if (tree.id == obj.id) {
                    tree.collapse = !obj.collapse
                  } else {
                    if (tree.items) {
                      for (let four of tree.items) {
                        if (four.id == obj.id) {
                          four.collapse = !obj.collapse
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log(this.data.treeArr)
    this.setData({
      treeArr: this.data.treeArr
    })
  },
  treeTapss: function (e) {
    console.log(" treeTapss 父级", e)
    let obj = e.detail.item
    for (let item of this.data.treesArr) {
      if (item.id == obj.id) {
        item.collapse = !obj.collapse
      } else {
        if (item.items) {
          for (let two of item.items) {
            if (two.id == obj.id) {
              two.collapse = !obj.collapse
            } else {
              if (two.items) {
                for (let tree of two.items) {
                  if (tree.id == obj.id) {
                    tree.collapse = !obj.collapse
                  } else {
                    if (tree.items) {
                      for (let four of tree.items) {
                        if (four.id == obj.id) {
                          four.collapse = !obj.collapse
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log(this.data.treesArr)
    this.setData({
      treesArr: this.data.treesArr
    })
  },
  // 位置详情
  siteDetail: function () {
    console.log(this.data.isSiteDetail)
    this.setData({
      isSiteDetail: !this.data.isSiteDetail
    })
  },
  // 音视频详情
  YPdetail: function () {
    this.setData({
      isYPdetail: !this.data.isYPdetail
    })
  },
  // 输入的视频源地址
  vedioUrl: function (e) {
    console.log("vedioUrl==", e)
    // vedio_url = e.detail.value
    let index = this.data.onChoose - 1
    let str = {};
    str.name = e.detail.value;
    str.checked = switch2Change;
    str.category = this.data.VedioArrayIndex;
    str.category_name = "URL地址";
    this.data.LayoutArray[index] = str
    this.setData({
      LayoutArray: this.data.LayoutArray
    })
  },
  // 选择的视频源是否有声 3300 
  switch2Change: function (e) {
    switch2Change = e.detail.value
    console.log(" switch2Change==>", switch2Change);
    let index = this.data.onChoose - 1;
    this.data.LayoutArray[index].checked = switch2Change;
    this.setData({
      LayoutArray: this.data.LayoutArray
    })
    console.log("switch2Change==>", this.data.LayoutArray)
  },
  changeBackflow: function (e) {
    console.log(" changeBackflow==>", e);
    let index = Number(e.detail.value)
    BackflowCount = index

    for (let item of this.data.backflowArray) {
      item.isChecked = false
    }
    this.data.backflowArray[index].isChecked = true;
    this.setData({
      backflowArray: this.data.backflowArray
    })
    let Index = this.data.onChoose - 1;
    if (this.data.LayoutArray[Index] != undefined) {
      // console.log(this.data.LayoutArray[Index])
      this.data.LayoutArray[Index].ids = this.data.LayoutArray[Index].ids.substr(0, this.data.LayoutArray[Index].ids.length - 1) + BackflowCount;
      // BackflowCount = index

    } else {
      let str = {};
      // str.mode = index
      this.data.LayoutArray[Index] = str
    }
    this.setData({
      LayoutArray: this.data.LayoutArray
    })
    console.log("LayoutArray==>", this.data.LayoutArray)
    console.log(" this.data.backflowArray==>", this.data.backflowArray)
  },
  // 视频文件
  changevedio: function (e) {
    console.log("changevedio==>", e)
    let index = this.data.onChoose - 1;
    let str = {};
    str.name = e.detail.value;
    str.checked = switch2Change;
    str.category = this.data.VedioArrayIndex;
    if (this.data.VedioArrayIndex == 1) {
      str.category_name = "视频文件";

    } else {
      str.category_name = "直播流";

    }
    this.data.LayoutArray[index] = str
    this.setData({
      LayoutArray: this.data.LayoutArray
    })
    console.log("LayoutArray===>", this.data.LayoutArray)
  },
  changeMedio: function (e) {
    this.data.currentVedio = []
    console.log("changeMedio==>", e)
    VedioStr.name = e.detail.value
    console.log("this.data.medioList=========>",this.data.medioList)
    for( let item of this.data.medioList){
      if( item.id == e.detail.value){
        VedioStr.category_name = item.name 
      }
    }
    console.log("VedioStr====>",VedioStr)
    this.data.currentVedio.push(VedioStr)
    this.setData({
      currentVedio: this.data.currentVedio
    })
    console.log(this.data.currentVedio)
  },

  Medio_sound: function (e) {
    this.data.currentVedio = []
    console.log(" Medio_sound==>", e)
    VedioStr.checked = e.detail.value;
    this.data.currentVedio.push(VedioStr)
    this.setData({
      currentVedio: this.data.currentVedio
    })
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