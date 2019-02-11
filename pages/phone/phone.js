// pages/deatil/deatil.js
var Bmob = require('../../utils/bmob.js');
var app = getApp()

Page({
  data: {
    BoList: "",
    hiddenLoading: true,
    interfaces: true,
    imgurlList: '',
    list: '',

    //轮播图
    indicatorDots: true,
    autoplay: true,
    interva: 5000,
    duration: 400,
    hidden: "false",
    recommended: '',
    loading: false,
    plain: false,
    picker1Value: "豪华大包",
    picker1Range: ['豪华大包', '快乐中包', '迷你小包'],
    timeValue: '00:00',
    dateValue: '2019-1-19',
    index: 0,

    text: '',
    marqueePace: 1, //滚动速度
    marqueeDistance: 0, //初始滚动距离
    size: 14,
    orientation: 'left', //滚动方向
    interval: 20, // 时间间隔
    adUrl: '../../image/tab/mic.png',
  },
  normalPickerBindchange: function(e) {
    var that = this
    var picker1Value = that.data.picker1Range[e.detail.value]
    // console.log(picker1Value)
    this.setData({
      picker1Value: picker1Value
    })
  },
  timePickerBindchange: function(e) {
    var that = this
    var time = e.detail.value
    this.setData({
      timeValue: time
    })
  },
  datePickerBindchange: function(e) {
    var that = this
    var date = e.detail.value
    this.setData({
      dateValue: date
    })
  },
  add: function(e) {
    var that = this
    console.log(that)
    if (app.globalData.userInfo == null){
      wx.showToast({
        title: "请先登录",
        icon: 'success',
        duration: 1500
      })
      wx.redirectTo({
        url: '../logins/logins',
      })
    }else{
    var username = app.globalData.userInfo.username
    var dinghouse = that.data.picker1Value
    var time = that.data.timeValue
    var date = that.data.dateValue

    
    Bmob.adddate.call(that,username,dinghouse, time, date)
    if(dinghouse!=''&&time!=""&&date!=""){
      wx.showToast({
        title: '预定成功',
        icon: 'success',
        duration: 2000
      })
    }
    }
  },
  onLoad: function() {
    var that = this
    Bmob.getBoList.call(that)
    Bmob.getrun.call(that)
    console.log(that)
  },
  onShow: function() {
    // 页面显示
    var that = this;
    var time = setInterval(function() {
      if (that.data.text != "") {
        var length = that.data.text * that.data.size; //文字长度
        var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
        that.setData({
          length: length,
          windowWidth: windowWidth,
        });
        that.runMarquee(); // 水平一行字滚动完了再按照原来的方向滚动

      }
      clearInterval(time)
    }, 1000)
  },
  runMarquee: function() {
    var that = this;
    var interval = setInterval(function() {
      //文字一直移动到末端
      if (-that.data.marqueeDistance < that.data.length) {
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        that.setData({
          marqueeDistance: that.data.windowWidth
        });
        that.runMarquee();
      }
    }, that.data.interval);
  }

})