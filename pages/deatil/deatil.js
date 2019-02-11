// pages/deatil/deatil.js
var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike: true,
    // banner
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
id:"",
coId:"",
    // 商品详情介绍
    deatil: [],
    biao:false,
    name:'',
  },
  //预览图片
  previewImage: function(e) {
    // console.log(e);
    var index = e.currentTarget.dataset.src;
    var imgArr = [];
    var objkeys = Object.keys(this.data.dea);
    for (var i = 0; i < objkeys.length; i++) {
      imgArr.push(this.data.dea[i]["url"]);
    }
    console.log(imgArr)
     wx.previewImage({
       current:imgArr[index],//当前图片地址
       urls: imgArr
     })
    console.log(index)
  },
  // 收藏
  addLike(e) {
      var that = this
    if (app.globalData.userInfo == null) {
      
      wx.redirectTo({
        url: '../logins/logins',
      })
    }else{
      var username = app.globalData.userInfo.username
      var price =that.data.dea[0].price
      var house =that.data.dea[0].house
      var iurl =  that.data.dea[0].url
      if (this.data.isLike == true){
        Bmob.addcollection.call(that, username, house, price, iurl,)
      this.setData({
        isLike: !this.data.isLike,
        username:username,
        house:house,
        price:price,
        iurl:iurl
      });
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 2000
        });
      } else {
          var id = that.data.coId;
        Bmob.deleltecollection.call(that,id)
        this.setData({
          isLike: !this.data.isLike,
        });
          console.log(id)
          wx.showToast({
            title: '取消收藏',
            icon: 'falil',
            duration: 2000
        });
      }
    }
    
  },
  // 跳到购物车
  toCar:function() {
   wx.navigateTo({
     url: '/pages/car/car',
   })
  },
  // 立即购买
  immeBuy:function(e) {
    if (app.globalData.userInfo == null) {

      wx.redirectTo({
        url: '../logins/logins',
      })
      }else{
    var that= this
    var sho = that.data.dea[0].sho
    var id = that.data.dea[0].objectId
      sho++;
    Bmob.Buy.call(that,id,sho)
  
      

    // Bmob.getpay.call(that,price)
   

      }
  },
  onLoad: function(e) {
    var that = this
    var id = e.id;
    Bmob.gettiaos.call(that,id)
    that.setData({
      id:id,
      isLike:true
    })
  },
   addCar:function(e){
     var that = this
     if (app.globalData.userInfo == null) {
       wx.redirectTo({
         url: '../logins/logins',
       })
     }else{
   var username = app.globalData.userInfo.username
       if (username != null) {
         var price = e.currentTarget.dataset.typePrice
         var house = e.currentTarget.dataset.typeHouse
         var url = e.currentTarget.dataset.typeUrl
         var num = e.currentTarget.dataset.typeNum
         Bmob.goaddcar.call(that, price, house, url, num, username)
         that.setData({
           price,price,
           house: house,
          url: url,
          num:num,
           username: username
         });
         wx.showToast({
           title: '加入购物车成功',
           icon: 'success',
           duration: 2000
         });
       } else {
         wx.showToast({
           title: '添加失败',
           icon: 'fail',
           duration: 2000
         });
     }
     
    }
     
    //   var that = this
    //  var id = that.objectId
    // alert(id)
    //  var house= e.house,
    //  var price =e.price
    // Bmob.goaddcar.call(that,house,price)
    // that.setData({
    // house:house,
    // price:price
    // })
   }
})