Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    title: {
      type: String,
      value: 'default value', //不存在此属性时
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    searchVal:''
  },
  ready:function(){
    
  },
  methods: {
    customMethod: function () { },
    upPage:function(){
      wx.navigateBack({
        delta: 1  
      })
    },
    goSearch:function(){
      this.triggerEvent('onSearch', this.data.searchVal);
    },
    empty:function(){
      console.log("点击清空");
      this.setData({
        searchVal:''
      });
    }
  }
})