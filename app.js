//app.js
/**
 * 引入Bmob
 */
var Bmob = require('./utils/Bmob-1.6.1.min.js');
Bmob.initialize("f011e890fd9a827cd6dae4ca38429b4a","c0414cbfee934a1e9b805c7538ea0b8d");
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              })
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
   phone:""
  },
})
var list = [{
  "iconPath": "image/tab/home.png",
  "selectedIconPath": "image/tab/home.png",
  "pagePath": "pages/index/index"
},
  {
    "iconPath": "image/tab/phone.png",
    "selectedIconPath": "image/tab/phone.png",
    "pagePath": "pages/phone/phone"
  },
  {
    "iconPath": "image/tab/compass.png",
    "selectedIconPath": "image/tab/compass.png",
    "pagePath": "pages/map/map"
  },
  {
    "iconPath": "image/tab/user.png",
    "selectedIconPath": "image/tab/user.png",
    "pagePath": "pages/user/user"
}];

for (var i = 0; i < list.length; i++) {
  wx.setTabBarItem({
    index: i,
    text: list[i].text,
    iconPath: list[i].iconPath,
    selectedIconPath: list[i].selectedIconPath
  })
}