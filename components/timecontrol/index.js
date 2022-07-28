import {
  weekArr
} from '../../utils/text.js'
const app = getApp()
const util = require('../../utils/util.js')
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
    
  },
  properties: {
    title: {
      type: String,
      value: 'default value'
    }
  },
  data: {
    pickercol: false,
    isweek: false,
    index: 0,
    syncval: '1',
    syncControl1:[],
    weekArr: weekArr,
    weekVal:'',
    repeat_mode:[
      {
        mode:0,
        name:"单次"
      },
      {
        mode:1,
        name:"每天"
      },
      {
        mode:2,
        name:"指定日期"
      },
      {
        mode:3,
        name:"按周重复"
      },

      {
        mode:4,
        name:"法定节假日"
      },
      {
        mode:5,
        name:"非法定节假日"
      },
    ]


  },
  onLoad:function(){
    console.log("weekArr==>",weekArr)
  },
  ready: function() {

  },
  created:function(){

  },
  methods: {

    // 监听onMessage消息
    listenMsg:function (){
      app.globalData.SocketTask.onMessage( res => {
        var res = JSON.parse(res.data)
        console.log("获取指令列表==》",res)
        if('cmd_info_list' in res.payload){
         this.data.syncControl1 = res.payload.cmd_info_list.cmd_property_list
        }
      })
    },
    onPickerView: function(e) {
      const type = e.detail.type;
      this.togglePicker();
      if (type == 'define') {
        this.setData({
          'audioVal.executetime': e.detail.val.colval1 + '-' + e.detail.val.colval2 + '-' + e.detail.val.colval3
        });
      }
    },
    onWeek: function(e) {
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
        var weekVal = '';

        for (var i = 0; i < resultArr.length; i++) {
          console.log(resultArr[i]);
          if (resultArr[i].check) {
            weekVal = weekVal + resultArr[i].text + "、";
          }
        }

        console.log("返回星期")
        console.log(weekVal)

        this.setData({
          weekVal: weekVal
        });


      }
    },
    onAddtask: function (e) {
      const pageVal = this.data;
      this.triggerEvent('onAddtask', { type: 'addaudio', val: pageVal })
    },
    togglePicker: function() {
      this.setData({
        pickercol: !this.data.pickercol
      });
console.log("togglePicker==>",this.data.pickercol)
    },
    toggleWeek: function() {
      this.setData({
        isweek: true
      });
      console.log("toggleWeek 点击成功",this.data.isweek)

    },
    bindPickerChange: function(e) {
      this.setData({
        index: e.detail.value
      })
    },
    changeSync: function(e) {
      const type = e.currentTarget.dataset.type;
      this.setData({
        syncval: type
      });
    },
    changePattern: function(e) {
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
    changeDegree: function(e) {
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
    checkboxChangesync: function(e) {
      const type = parseInt(e.currentTarget.dataset.type) - 1;
      const check = e.detail.value;
      const checkbox = 'syncControl[' + type + '].checkbox';
      const off = 'syncControl[' + type + '].off';
      if (this.data.syncControl[type].checkbox){
        this.setData({
          [off]: false
        });
      }
      this.setData({
        [checkbox]: !this.data.syncControl[type].checkbox
      });



    },
    switchChangesync: function(e) {

      const type = parseInt(e.currentTarget.dataset.type) - 1;
      const checkbox = 'syncControl[' + type + '].off';
      this.setData({
        [checkbox]: !this.data.syncControl[type].off
      });
    },
    switch1Change: function(e) {
      console.log(e)
    },
    clickDwew: function() {
      console.log(this.data.syncControl[0].checkbox)
    },
    inputValue:function(e){

    },
   radioValue:function(e){
      console.log(" childrenRadio===>",e)
      

    }


  }

})