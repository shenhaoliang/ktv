//index.js
//获取应用实例
/**
 * 引入Bmob
 */
var Bmob = require('../../utils/bmob.js');
var utils = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    // BoList:"",
    hiddenLoading: true,
    interfaces: true,
    imgurlList:'',
    list:'',
    
    //轮播图
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 400,
    hidden: "false",
    recommended: '',
   loading: false,
    plain: false
  },
  
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   var that = this
  //   app.getUserInfo(function(userInfo){
  //     //更新数据
  //     that.setData({
  //       userInfo:userInfo
  //     })
  //   })
    
  // },

  // 导航至音乐界面
  previewImage:function(e){
    var index = e.currentTarget.dataset.index;
    var imgArr = [];
    var objkeys = Object.keys(this.data.imgurlList);
    for (var i = 0; i < objkeys.length; i++) {
      imgArr.push(this.data.imgurlList[i]["imgurl"]);
    }
    console.log(imgArr)
    wx.previewImage({
      current: imgArr[index],//当前图片地址
      urls: imgArr
    })
    console.log(index)

  },
  
  getNextDate: function () {
    var now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad: function () {
    var that =this
    Bmob.getBoList.call(that)
    Bmob.getimgurl.call(that)
    Bmob.gettiao.call(that)
  },
  playphone: function () {
    wx.showActionSheet({
      itemList: ['豪华大包','快乐中包','迷你小包'],
      success: function (res) {
        console.log(res)
        if (res.tapIndex==0) {
           console.log("豪华大包")
        } else if (res.tapIndex == 1){
          console.log('快乐中包')
        } else if (res.tapIndex == 2){
          console.log('迷你小包')
         }
      }
    });
  }
})
