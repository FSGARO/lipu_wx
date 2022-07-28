// components/layout/index.js
Component({
  /**
   * 组件的属性列表 
   * 
   */
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    selectLayout:Number,
    onChoose:String
  },

  /**
   * 组件的初始数据  
   */
  data: {
    // selectLayout: 'layout1',
    onChoose:'1',
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    chooseFuc:function(e){
      console.log("chooseFuc1",e)
      this.setData({
        onChoose : e.currentTarget.dataset.onchoose
      })
      this.triggerEvent("onChoose",this.data.onChoose)
    },


  }
})
