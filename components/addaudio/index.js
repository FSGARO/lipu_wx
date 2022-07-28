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
    weekArr: weekArr,
    weekVal: '',
    pickviewArr: ''



  },
  ready: function() {

    console.log("音频weekArr数据")
    console.log(this.data.weekArr)


  },
  methods: {
    onPickerView: function(e) {
      console.log("onPickerView")
      console.log(e)
      const type = e.detail.type;
      this.togglePicker();  
   
      if (type == 'define') {
        const val = e.detail.val.colval1 + '-' + e.detail.val.colval2 + '-' + e.detail.val.colval3;
 
        var pickviewArr = [e.detail.val.colval1, e.detail.val.colval2, e.detail.val.colval3];
        this.setData({
          pickviewArr: pickviewArr
        });
      

        this.setData({
          'audioVal.executetime': val
        });
      }
    },
    onWeek: function(e) {
   

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

        this.setData({
          weekVal: weekVal
        });


      }

    },
    onAddtask:function(e){
      const pageVal = this.data;
      this.triggerEvent('onAddtask', { type: 'addaudio', val: pageVal })
    },
    togglePicker: function() {
      this.setData({
        pickercol: !this.data.pickercol
      });
    },
    toggleWeek: function() {
      this.setData({
        isweek: true
      });
    },

    bindPickerChange: function(e) {
      this.setData({
        index: e.detail.value
      })
    }


  }


})