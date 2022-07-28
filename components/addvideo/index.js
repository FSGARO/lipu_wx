import {
  weekArr
} from '../../utils/text.js'
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
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
    array: ['优先级1', '优先级2', '优先级3', '优先级4'],
    index: 0,
    audioVal: {
      executetime: '',
      playtime: ''
    },
    selectLayout: 'layout1',
    weekArr: weekArr,
    weekVal: ''

  },
  ready: function () {

  },
  methods: {
    onPickerView: function (e) {
      const type = e.detail.type;
      this.togglePicker();
      if (type == 'define') {
        this.setData({
          'audioVal.executetime': e.detail.val.colval1 + '-' + e.detail.val.colval2 + '-' + e.detail.val.colval3
        });
      }
    },
    onWeek: function (e) {
      const type = e.detail.type;
      this.setData({
        isweek: !this.data.isweek
      });
      
      if (type == 'sure') {
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
    togglePicker: function () {
      this.setData({
        pickercol: !this.data.pickercol
      });
    },
    toggleWeek: function () {
      this.setData({
        isweek: true
      });
    },
    toggleLayout: function (e) {
      const type = e.currentTarget.dataset.type;
      this.setData({
        selectLayout: type
      });
    },
    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value
      })
    }


  }


})