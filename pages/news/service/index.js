//index.js
//获取应用实例
const app = getApp()
import {tools} from '../../../utils/util.js'

Page({
  data: {
  },
  onLoad: function () {
  
  },
  emptyMsg:function(){
    console.log("2321321321")
    tools.alert("确定要清空信息吗").then(function (data) {
      if (data.confirm) {
        console.log("清空信息")
      }
    });
  }

})
