Date.prototype.fmt = function(fmt) { //author: meizz  
  var date = this;
  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "h+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


var tools = {
  //显示模态弹窗
  alert: function(msg, _bools, tit) {
    if (_bools == undefined) {
      _bools = true
    }
    return new Promise(function(resolve, reject) {
      wx.showModal({
        title: tit == undefined ? "提示" : tit,
        content: msg,
        showCancel: _bools,
        success: res => {
          resolve(res)
        }
      })
    })
  },
  //显示提示框
  ShowToast: function(msg, target) {
    target.toast.show = true;
    target.toast.msg = msg;
    target.$apply();
    setTimeout(() => {
      target.toast.show = false;
      target.$apply();
    }, 1500);
  },
  tips: function(msg,callback, timeout = 1500) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: timeout,
      success:function(){
        if (typeof callback =='function'){
          callback();
        }
      },
    })
  },
  
};
 


export default tools