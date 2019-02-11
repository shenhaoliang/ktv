// pages/login/login.js
//获取应用实例
var Bmob = require('../../utils/bmob.js')
const app = getApp()
// const util = require("../../utils/util.js")
// const dataJs = require("../../utils/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phones: '',
    password: '',
    ajxtrue: false,
  
  },
  // 获取输入账号
  usernameInput: function (e) {
    console.log(e)
    var username = e.detail.value

    this.setData({
      username: username,
    })

  },


  // 获取输入密码
  passwordInput: function (e) {
    var that = this
    var password = e.detail.value

    this.setData({
      password: password
    })

  },
 

 
  onShow: function () {


  },
  // 登录
  login: function (e) {
    var that = this
    var user = that.data.username
    var pass = that.data.password
    Bmob.getUsers.call(that,user)

    Bmob.getlogin.call(that, user,pass)
    app.globalData.userInfo ={username:user}
    console.log(e + "-------------------")
  },
  

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})