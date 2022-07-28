import {
  weekArr
} from '../../utils/text.js'
let ID = '';
let weekCount = [];
let dayss = [];
const app = getApp()
const util = require('../../utils/util.js');
let contralArray = [];
// 时间模型
let timeMode = 0;
let isModify = false;
let addcontrol_requestId = ""
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    // title: {
    //   type: String,
    //   value: 'default value'
    // },
    Id: String,
    comeName: String,
    comePlaces: Array,
    comeContralArray: Array,
    comeTimeMode: String,
    comeDayys: Array,
    comePlaytime: Array
  },
  observers: {
    'comeTimeMode': function (val) {
      console.log("val----->", val)
      if (val != "") {
        console.log("comeTimeMode===val=>", val)

        // if (this.data.timeMode == 3) {
        //   weekCount = repeat_prop
        //  } else if (this.data.timeMode == 2) {
        //     dayss = _detail.repeat_prop
        //  }
        for (let item of this.data.repeat_mode) {
          if (item.mode == val) {
            item.isChecked = true
          }
        }
        timeMode = val,
          this.setData({
            repeat_mode: this.data.repeat_mode,
            mainName: "修改"
          })
        this.come_radioValue(val)
      }
    },
    'comeName': function (val) {
      if( val != ""){
        this.setData({
          TaskName : val
        })
      }
      console.log("TaskName====>val", val) 
    },
    'Id': function (val) {
      console.log("id  val===------------------------------->", val)
      if (val != "") {
        ID = val
        isModify = true
      }
    },
    'comePlaces': function (val) {

      if (val.length != 0) {
        this.data.comePlaces = val
      }

    },
    'comeDayys': function (val) {

      console.log("val=====>", val)
      if (val.length != 0) {
        if(this.data.timeMode == 2){
          this.data.dayVal = this.data.dayVal.concat(val)
          this.setData({
            dayVal: this.data.dayVal
          })
        }else if(this.data.timeMode == 3){
          // this.data.weekVal = this.data.weekVal.concat(val[0])
          this.setData({
            weekVal: val[0]
          })
        }
        
        console.log("this.data.dayVal===>", this.data.dayVal)
        console.log("this.data.weekVal===>", this.data.weekVal)
      
      }
    },
    'comeContralArray': function (val) {
      if (val.length != 0) {
        this.data.comeContralArray = val
        contralArray = val
      }
    },
    'comePlaytime': function (val) {
      if (val.length != 0) {
        console.log('comePlaytime val====>', val)
        this.setData({
          playtime: val

        })
      }
    },

   
  },
  data: {
    month_day_range: [
      ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日", "31日"]
    ],
    time_range: [
      ["00时", "01时", "02时", "03时", "04时", "05时", "06时", "07时", "08时", "09时", "10时", "11时", "12时", "13时", "14时", "15时", "16时", "17时", "18时", "19时", "20时", "21时", "22时", "23时", "24时"],
      ["00分", "01分", "02分", "03分", "04分", "05分", "06分", "07分", "08分", "09分", "10分", "11分", "12分", "13分", "14分", "15分", "16分", "17分", "18分", "19分", "20分", "21分", "22分", "23分", "24分", "25分", "26分", "27分", "28分", "29分", "30分", "31分", "32分", "33分", "34分", "35分", "36分", "37分", "38分", "39分", "40分", "41分", "42分", "43分", "44分", "45分", "46分", "47分", "48分", "49分", "50分", "51分", "52分", "53分", "54分", "55分", "56分", "57分", "58分", "59分", "60分"],
      ["00秒", "01秒", "02秒", "03秒", "04秒", "05秒", "06秒", "07秒", "08秒", "09秒", "10秒", "11秒", "12秒", "13秒", "14秒", "15秒", "16秒", "17秒", "18秒", "19秒", "20秒", "21秒", "22秒", "23秒", "24秒", "25秒", "26秒", "27秒", "28秒", "29秒", "30秒", "31秒", "32秒", "33秒", "34秒", "35秒", "36秒", "37秒", "38秒", "39秒", "40秒", "41秒", "42秒", "43秒", "44秒", "45秒", "46秒", "47秒", "48秒", "49秒", "50秒", "51秒", "52秒", "53秒", "54秒", "55秒", "56秒", "57秒", "58秒", "59秒", "60秒"]
    ],
    mainName: "添加",
    comeContralArray: [],
    comePlaces: [],
    isweek: false,
    // 按周重复
    weekVal: [],
    // 指定日期
    dayVal: [],
    // 当前选中的时间模型
    timeMode: '',
    // 执行时间
    playtime: [],
    array: ['优先级1', '优先级2', '优先级3', '优先级4'],
    repeat_mode: [{
        mode: -1,
        name: "按需",
        isChecked: false
      },
      {
        mode: 0,
        name: "单次",
        isChecked: false
      },
      {
        mode: 1,
        name: "每天",
        isChecked: false

      },
      {
        mode: 2,
        name: "指定日期",
        isChecked: false
      },
      {
        mode: 3,
        name: "按周重复",
        isChecked: false
      },

      {
        mode: 4,
        name: "法定节假日",
        isChecked: false
      },
      {
        mode: 5,
        name: "非法定节假日",
        isChecked: false
      },
    ],
    weekArr: weekArr,
    treesArr: [],
    // 控制设备
    syncControl1: [],
    // 任务名称
    TaskName: '',
    //  优先级
    index: 0,
    schollCount: [],
    isSiteDetail: false,
    syncval: '-1',
    // 当前选中的同步控制
    ctroItems: {},
    sync_tabCon: false,
  },
  created: function () {
    // console.log(" this. properties.comeName",this.properties.comeName)
    this.getCmd(0, 32),
      this.getPlace(),
      this.listenMsg()
  },

  methods: {
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
            "cnt": cnt,
          }
        }
      }
      app.globalData.SocketTask.send({
        data: JSON.stringify(request),
      })
    },

    come_radioValue: function (mode) {
      console.log("mode==>", mode)
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
    // 进入修改后的位置的改变
    checkedTree: function (array) {
      console.log("array===>", array)
      console.log("this.properties.comePlace", this.data.comePlaces)
      for (let item of array) {
        for (let arrid of this.data.comePlaces) {
          if (item.id == arrid) {
            item.checked = true;
          }
        }
        if (item.items) {
          this.checkedTree(item.items);
        }
      }
      return array;
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
          console.log("_syncControl1", _syncControl1)
          for (let item of _syncControl1) {
            item.checkbox = false;
            item.mode = 0;
            item.attr = "";
            item.data = '';
            if (item.options != null) {
              for (let items of item.options) {
                items.checkbox = false
              }
              item.options[0].checkbox = true
            }

          }
          _syncControl1 = this.come_syncFuc(_syncControl1)
          this.setData({
            syncControl1: _syncControl1
          })
          console.log("this.data.syncControl1", this.data.syncControl1)
        } else if ('place_info' in res.payload) {
          let places = res.payload.place_info;
          this.changPlace(places)
          this.checkedTree(places)
          this.PickSchool(places)
          this.setData({
            treesArr: places,
            schollCount: this.data.schollCount
          })

          console.log("获取任务地址成功 ", places);
        }
      })
    },

    // 输入任务名称
    inputValue: function (e) {
      console.log(" 输入任务名称==>", e)
      this.setData({
        TaskName: e.detail.value
      })
    },
    // 优先级
    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value
      })
      console.log("优先级", this.data.index)

    },
    // 位置详情
    siteDetail: function () {
      console.log(this.data.isSiteDetail)
      this.setData({
        isSiteDetail: !this.data.isSiteDetail
      })
    },
    treeTapp: function (e) {
      console.log(this.data.treesArr)
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
    //位置选择确定
    goSite: function () {
      this.setData({
        SiteChoose: !this.data.SiteChoose
      })
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
    //指令附加条件
    add_term: function (e) {
      console.log(" add_term==>", e)
      let _data = e.detail.value;
      this.data.ctroItems.data = _data;
      this.itemChange(this.data.ctroItems)

    },

    // 将come进来的sycn放入syncControl1原数组中
    come_syncFuc: function (array) {
      console.log("this.data.comeContralArray==", this.data.comeContralArray)
      for (let item of array) {
        for (let arrs of this.data.comeContralArray) {
          console.log("arrs==============>", arrs)
          if (item.name == arrs.method) {
            item.checkbox = true;
            item.mode = arrs.mode;
            item.attr = arrs.attr;
            item.data = arrs.data;
            for (let item_options of item.options) {
              if (item_options.attr == arrs.attr) {
                item_options.checkbox = true
              }
            }

          }
        }
      }
      return array;
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
            v.attr = obj.attr
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

    radioValue: function (e) {
      console.log(" radioValue==>", e)
      timeMode = e.detail.value
      let _timeMode = e.detail.value
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
        console.log('timeMode', this.data.timeMode)
      }
    },

    audioVal: function (e) {
      console.log("pickerValue==>", e)
      // let val = e.detail.value+ ":00"
      let val = this.data.time_range[0][e.detail.value[0]].slice(0, 2) + ":" + this.data.time_range[1][e.detail.value[1]].slice(0, 2) + ":" + this.data.time_range[2][e.detail.value[2]].slice(0, 2)
      let _playtime = this.data.playtime
      if (_playtime.indexOf(val) < 0) {
        _playtime.push(val);
        this.setData({
          playtime: _playtime
        })
        console.log(" playtime ", this.data.playtime)
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
      // let _dayVal = this.data.dayVal
      // if (_dayVal.indexOf(day) < 0) {
      //   _dayVal.push(day);
      //   this.setData({
      //     dayVal: _dayVal
      //   })
      //   console.log(" dayVal ", this.data.dayVal)
      // }

      // let days = this.data.dayVal[0].split("月");
      // dayss = [];
      // dayss[0] = parseInt(days[0])
      // dayss[1] = parseInt(days[1])
      // console.log("days===>", days)
      // console.log("dayss===>", dayss)
      // console.log(this.data.dayVal)
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

    toggleWeek: function () {
      this.setData({
        isweek: true
      });
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
        console.log("weekVal", weekVal)
        console.log("weekCount", weekCount)
        this.setData({
          weekVal: weekVal
        });
      }
    },

    onAddtask: function () {
      console.log("添加物联任务")
      let _place = []
      for (let i of this.data.schollCount) {
        _place.push(i.id)
      }
      let _prop = []
      if (this.data.timeMode == 3) {
        _prop = weekCount
      } else if (this.data.timeMode == 2) {
        for (let i of this.data.dayVal) {
          let _i = ''
          _i = i.split("月");
          _i[0] = parseInt(_i[0])
          _i[1] = parseInt(_i[1].split("日")[0])
          console.log("_i===============>", _i)
          _prop = _prop.concat(_i)
        }
        console.log("_prop===>", _prop)
      }

      let _clock = []
      for (let time of this.data.playtime) {
        console.log("time", time)
        // time = time + ":00"
        console.log("time", time)
        _clock.push(time)

      }
      let _mode = '';
      for(let mode of this.data.repeat_mode){
        if(mode.isChecked){
          _mode = mode.mode
        }
      }

      let plan = {
        "clock": _clock,
        "repeat": {
          "mode": parseInt(_mode),
          "prop": _prop
        }
      }
      console.log("plan", plan)
      // 硬件同步控制
      let device_sync = [];
      console.log("contralArray===>", contralArray)
      // for( let v of contralArray){
      //   let device_syncItem = {}
      //   device_syncItem.mode = parseInt(0) 
      //   device_syncItem.method = v.name
      //   for( let i of v.options){
      //     if(i.checkbox){
      //       device_syncItem.attr = parseInt(i.attr) 
      //     }
      //   }
      //   device_syncItem.data = v.data
      //   device_sync.push(device_syncItem)
      // }

      for (let v of contralArray) {
        let device_syncItem = {}
        device_syncItem.mode = parseInt(v.mode)
        if (v.name) {
          device_syncItem.method = v.name
        } else {
          device_syncItem.method = v.method
        }
        if (v.attr == '') {
          device_syncItem.attr = parseInt(0)
        } else {
          device_syncItem.attr = parseInt(v.attr)
        }
        if (v.data == null) {
          device_syncItem.data = ""
        } else {
          device_syncItem.data = v.data
        }
        device_sync.push(device_syncItem)
      }
      console.log("device_sync===>", device_sync)

      let options = {
        "place": _place,
        "oplist": device_sync,
      
      }
      if(isModify){
        console.log("修改当前任务")
      this.modifyTast(this.data.TaskName, plan, options);
      }else{
        console.log("创建任务")
      this.creatTast(this.data.TaskName,plan,options);
      }
    },


    // 创建多媒体任务
    creatTast: function (name, plan, options) {
      console.log(name, plan, options)
      app.globalData.requestId = app.globalData.requestId + 1;
      addcontrol_requestId = app.globalData.requestId
      // this.requestId = app.globalData.requestId
      var request = {
        "msgname": "http_request",
        "msgid": app.globalData.requestId,
        "payload": {
          "path": util.addr.creatWulian,
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
    modifyTast: function (name, plan, options) {
      app.globalData.requestId = app.globalData.requestId + 1;
      addcontrol_requestId = app.globalData.requestId
      // this.requestId = app.globalData.requestId
      var request = {
        "msgname": "http_request",
        "msgid": app.globalData.requestId,
        "payload": {
          // "path": util.addr.creatMadie + `?id =` + ID,
          "method": "PUT",
          "path": util.addr.getLivelist,
          "args": {
            "id": ID,
            "method": "modify",
          },

          "data": {
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
  }
})