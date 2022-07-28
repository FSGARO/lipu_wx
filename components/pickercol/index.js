Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    pickervalue:{
      type: Array,
      value: [0,0,0], 
    },
    title: {
      type: String,
      value: 'default value',  
    }
  },
  data: {
    someData: {},
    col1:[
      "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"
    ],
    col2: [
      "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "52", "53", "54", "55", "56", "57", "58", "59"
    ],
    col3: [
      "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "52", "53", "54", "55", "56", "57", "58", "59"
    ],
    picker:{
      colval1: '00',
      colval2: '00',
      colval3: '00'
    }

    // pickervalue: ['06', "03", "17"]

    
  },
  ready:function(){
    
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    upPage:function(){
      wx.navigateBack({
        delta: 1  
      })
    },
    bindChange: function (e) {
      console.log(e);
      const val = e.detail.value
      this.setData({
        'picker.colval1': this.data.col1[val[0]],
        'picker.colval2': this.data.col1[val[1]],
        'picker.colval3': this.data.col1[val[2]]
      })

      console.log("改变之后的信息")
      console.log(this.data.picker)
    },
    pickerView:function(e){
      console.log(e.currentTarget.dataset.type)
      const type = e.currentTarget.dataset.type;

      this.triggerEvent('onPickerView', { type: type,val:this.data.picker})
    }
  }
})