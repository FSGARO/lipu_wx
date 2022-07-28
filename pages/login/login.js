// index.js
Page({
  data: {
    token: '',
    phone_req: false
  },
  onLoad: function () {
    let that = this
    wx.showLoading({
      title: '加载中，请稍候...'
    })
    wx.login({
      success(res) {
        wx.hideLoading()
        if (res.code) {
          wx.request({
            url: 'https://wx.litpsmart.com/sc/auth',
            data: {
              code: res.code
            },
            success(res) {
              that.setData({
                token: res.data.response.token || '',
                phone_req: res.data.response.phone_req || false
              })
              if (!that.data.phone_req) {
                console.log('登陆成功')
                wx.redirectTo({
                  url: '/pages/my/chooseschool/index',
                  success: result => {
                    console.log(`build up ----- goSchool ----- result`, result)
                  },
                  fail: e => {
                    console.log(`build up ----- goSchool ----- e`, e)
                  },
                  complete: () => { }
                })
              } else {
                console.log('login 失败')
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail(err) {
        console.log('login失败', err)
      }
    })
  },
  getPhoneNumber: function (e) {
    // 需要提前通过wx.login获取code
    // 然后使用code获取wx.litpsmart.com上的token
    // 此处再使用token将获取手机号码的code传到服务区上
    let token = this.data.token || ''
    let code = e.detail.code
    // 判断参数是否有效
    if (token && code) {
      wx.request({
        url: 'https://wx.litpsmart.com/sc/auth',
        data: {
          token: token,
          code: code,
          mobile: true
        },
        success(res) {
          console.log(res)
          console.log(res.data)
        }
      })
    } else {
      this.goSchool()
    }
  },
  goSchool() {
    console.log('跳转扫码页面')
    wx.redirectTo({
      url: '/pages/my/chooseschool/index',
      success: result => {
        console.log(`build up ----- goSchool ----- result`, result)
      },
      fail: e => {
        console.log(`build up ----- goSchool ----- e`, e)
      },
      complete: () => { }
    })
  }
})