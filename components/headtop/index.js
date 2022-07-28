var app = getApp();
const util = require('../../utils/util.js')


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
    },
    comeType: {
      type: String,
      value: 'default value'
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    navH: '',
    statusBarHeight: '',
    currentUrl: '',
    topdisplay: true
  },
  ready: function () {
    
    const statusBarHeight = parseInt(app.globalData.statusBarHeight);
    this.setData({
      navH: statusBarHeight + 46,
      statusBarHeight: statusBarHeight
    });
    const getcurrentRouter = util.getcurrentRouter();
    if (getcurrentRouter.route == "pages/news/index") {
      this.setData({
        topdisplay: false
      });
    }

  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    upPage: function () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})