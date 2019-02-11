
var Bmob = require('../../utils/bmob.js')
// var dataJs = require('../../utils/data.js');
var app = getApp();
Page({
  data: {
    showTopTips: false,
    username: "",
    phone:"",
    password:"",
    email:'',
    ajxtrue: false,
  },
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
  usernameInput:function(e){
    console.log(e)
    var username = e.detail.value

    this.setData({
      username: username,
    })

  },
  phoneInput:function(e){
    console.log(e)
    var phone = e.detail.value

    this.setData({
      phone: phone,
    })
  },
  passwordInput:function(e){
    console.log(e)
    var password = e.detail.value

    this.setData({
      password: password,
    })
  },
  // emailInput:function(e){
  //   console.log(e)
  //   var email = e.detail.value

  //   this.setData({
  //     email:email,
  //   })
  // },
  regis:function(){
    var that = this
    var username = that.data.username
     var password = that.data.password
    //  var email = that.data.email
     var phone =that.data.phone 
    Bmob.regis.call(that, username, password, phone)
     that.setData({
       username: username ,
       password:password,
      //  email:email,
       phone: phone
     })
  }
  // getLoginName: function(e) {
  //   let that = this
  //   var username = e.detail.value;
  //   if (!(/^1[34578]\d{9}$/.test(username))) {
  //     this.setData({
  //       ajxtrue: false
  //     })
  //     if (username.length > 11) {
  //       wx.showToast({
  //         title: '手机号有误',
  //         icon: 'none',
  //         duration: 1000
  //       })
  //     }
  //     if (username.length < 11) {
  //       wx.showToast({
  //         title: '手机号有误',
  //         icon: 'none',
  //         duration: 1000
  //       })
  //     }
  //   } else {
  //     that.setData({
  //       ajxtrue: true,
  //       userName: username,
  //     })
  //   }
  // },

  // formSubmit: function(e) {
  //   // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用
  //   var realName = e.detail.value.realName;
  //   var that = this;
  //   // 判断账号是否为空和判断该账号名是否被注册
  //   if ("" == util.trim(that.data.userName)) {
  //     wx.showToast({
  //       title: '账号不能为空',
  //     })
  //     return;
  //   }

  //   var data = {
  //     realName: realName,
  //     username: that.data.userName,
  //   }
  //   util.postRequest(dataJs.url2, data, function(res) {
  //     if (res.ret == 0) {
  //       app.globalData.userName = that.data.userName;
  //       wx.navigateTo({
  //         url: '/pages/check/check',
  //       })
  //     } else {
  //       // 显示消息提示框
  //       wx.showToast({
  //         title: '注册失败',
  //         icon: 'error',
  //         duration: 2000
  //       })
  //     }
  //   });
  // }
})