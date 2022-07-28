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
    selectLayout:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectLayout: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    toggleLayout: function (e) {
      const type = e.currentTarget.dataset.type;
      this.setData({
        selectLayout: type
      });
      this.triggerEvent("toggleLayout",type)
    },

  }
})
