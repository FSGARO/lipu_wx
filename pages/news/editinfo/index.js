//index.js
//获取应用实例
import WxValidate from '../../../utils/WxValidate.js'
const app = getApp()
Page({
  data: {
    currentTab:0,
    colorBoard:false,
    colorData: {
      hueData: {
        colorStopRed: 255,
        colorStopGreen: 0,
        colorStopBlue: 0,
      },
      pickerData: {
        x: 0,  
        y: 480, 
        red: 0,
        green: 0,
        blue: 0,
        hex: '#000000'
      },
      barY: 0
    },
    selectColorval:'',
    rpxRatio: 1,
    pushForm:{
      sbucontent:'',
      duratime:'',
      fscolor:'',
      classlist:''
    },
    newsform:{
      title:'',
      newcontent:'',
      classlist: ''
    }
  },
  clickTab:function(e){
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  onChangeColor(e) {
    
    console.log(e.detail.colorData);
    this.setData({
      colorData: e.detail.colorData
    })
  },
  selectColorval(e){
    this.setData({
      selectColorval: e.detail.colorData
    })
    this.showSelectcolor();
  },
  addClass:function(e){
    wx.navigateTo({
      url: "/pages/news/siteselect/index?type="+e.target.dataset.type
    });
  },
  showSelectcolor:function(){
    this.setData({
      colorBoard: !this.data.colorBoard
    });
  },
  titleInput:function(){
    
  },
  onLoad: function () {
    this.initValidate()
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate(a) {
    const rules = {
      sbucontent: {
        required: true
      },
      duratime: {
        required: true,
        number: true
      },
      // title: {
      //   required: true
      // },
      // newcontent: {
      //   required: true
      // }
    }
    const messages = {
      sbucontent: {
        required: '请入内容'
      },
      duratime: {
        required: '播放时长不能为空',
        number: '您输入的时间不正确'
      },
      // title: {
      //   required: '请入标题'
      // },
      // newcontent: {
      //   required: '请入内容'
      // }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  fabuForm: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.showModal({
      msg: '提交成功'
    })
  },
  //发布字幕
  pushForm: function(e){
    this.fabuForm(e)
  },
  //发布消息
  newForm: function (e) {
    const title = e.detail.value.title
    const newcontent = e.detail.value.newcontent
    if (title==""){
      this.showModal({
        msg: '标题不能为空'
      })
      return false
    } else if (newcontent==""){
      this.showModal({
        msg: '内容不能为空'
      })
      return false
    }else{
      this.showModal({
        msg: '提交成功'
      })
    }
  }
 
})
