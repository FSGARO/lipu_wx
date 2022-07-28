//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //修改密码
  formSubmit: function (e) {
    // console.log(e);
    var oldpwd = e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;
    // var no = wx.getStorageSync('student').no;
    // console.log(no);
    if (oldpwd == '' || newpwd == '' || newpwd2 == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (oldpwd == newpwd){
      wx.showToast({
        title: '密码不能和原来的一样',
        icon: 'none',
        duration: 1000
      })
    }else if (newpwd != newpwd2) {
      wx.showToast({
        title: '两次输入不一致',
        icon: 'none',
        duration: 1000
      })
    } else {
      console.log("修改成功")
      // var url = app.globalData.url.setpassword;
      // wx.request({
      //   url: url, //仅为示例，并非真实的接口地址
      //   method: 'POST',
      //   data: {
      //     no: no,
      //     oldpwd: oldpwd,
      //     newpwd: newpwd
      //   },
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   success: (res) => {
      //     console.log(res.data);
      //     if (res.data.error) {
      //       wx.showToast({
      //         title: res.data.msg,
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     } else {
      //       wx.showToast({
      //         title: res.data.msg,
      //         icon: 'success',
      //         duration: 2000,
      //         success: function () {
      //           setTimeout(function () {
      //             wx.navigateBack({ belta: 1 })
      //           }, 2000)
      //         }
      //       })
      //     }

      //   }
      // })
    }
  },
  onLoad: function () {
  }

})
