// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    comeName:'',
    comePlaces:[],
    comeContralArray:[],
    comeTimeMode:'',
    dayss:[],
    playtime:[],
    Id :''
  },
  onLoad: function (options) { 
    console.log("options====>",options)
    if( JSON.stringify(options) != "{}"){

      console.log("options====>",options)
      let _place = JSON.parse(options.place);
      let _detail = JSON.parse(options.detail);
      let _rmptList = JSON.parse(options.rmptList);
      console.log("_place",_place)  
      console.log("_detail",_detail)  
      console.log("_rmptList",_rmptList)  
      this.data.dayss.push(_detail.prop)
      // places = this.checkedTree(places)  

      if(_detail.clock != null ){
        this.setData({
          playtime :_detail.clock
        })
      }
      this.setData({
        dayss :this.data.dayss ,
        comeName : _detail.name,
        comePlaces :  _detail.actions.place,
        comeContralArray : _detail.actions.oplist,
        comeTimeMode :_detail.repeat_mode,
        Id : _detail.id,
      })
      console.log("this.data.dayss",this.data.dayss)
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
checkedTree : function(array) {
  for(let item of array) {
      for(let arrid of come_place) {
          if(item.id == arrid) {
              item.checked = true ;
          }
      }
      if(item.items) {
          this.checkedTree(item.items);
      }
  }
  return array;
},


})


