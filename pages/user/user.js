// pages/user/user.js
var app = getApp()
var Bmob = require('../../utils/bmob.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Name: '',
    username: null,
    avatarUrl: null,
    userInfo:null,
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // userInfo: app.globalData.userInfo
    var that = this
    console.log(that)
    if (app.globalData.userInfo == null) {
      wx.redirectTo({
        url: '../logins/logins',
      })
    } 
  },

  gotologin: function(e) {
    var that = this;
    var username = app.globalData.userInfo.username
    console.log(that)
    if (e.detail.userInfo) {
      that.setData({
        userInfo: e.detail.userInfo,
        Name:username,
        hidden:true
      });
    }
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