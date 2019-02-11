var Bmob = require('/Bmob-1.6.1.min.js')
var app = getApp()

//获取菜品分类
function getBoList(cb) {
  var that = this;
  const query = Bmob.Query("Bo");
  query.find().then(res => {
    // console.log(res)
    that.setData({
      BoList: res,
    })
    typeof cb == 'function' && cb(res)
  });
}

function getimgurl(cb) {
  var that = this;
  const query = Bmob.Query("show");
  query.find().then(res => {
    console.log(res)
    that.setData({
      imgurlList: res,
    })
    typeof cb == 'function' && cb(res)
  });
}

function godetil(cb) {
  var that = this;
  const query = Bmob.Query("deatil");
  query.find().then(res => {
    console.log(res)
    that.setData({
      imgUrls: res,
    })
    typeof cb == 'function' && cb(res)
  });
}

function gettiao(cb) {
  var that = this;
  const query = Bmob.Query("tiao");
  query.find().then(res => {
    console.log(res)
    that.setData({
      dea: res,
    })
    typeof cb == 'function' && cb(res)
  });
}

function gettiaos(id) {
  var that = this;
  const query = Bmob.Query("tiao");
  query.equalTo("objectId", "==", id);
  query.find().then(res => {
    console.log(res)
    that.setData({
      dea: res,
    })
    // typeof cb == 'function' && cb(res)
  });
}

function getcars(cb) {
  var that = this;
  const query = Bmob.Query("addcar");
  query.find().then(res => {
    console.log(res)
    that.setData({
      dea: res,
    })
    typeof cb == 'function' && cb(res)
  });
}
/**查询购物车里的所有商品 */
function getcarfind(cb) {
  var that = this;
  const query = Bmob.Query("addcar");
  query.find().then(res => {
    console.log(res)
    that.setData({
      list: res,
    })
    wx.showToast({
      title: '正确',
      duration: 5000
    })
    typeof cb == 'function' && cb(res)
  }).catch(err => {
    wx.showToast({
      title: '错误',
      duration: 5000
    })
  });
}

function getcar(id) {
  var that = this;
  const query = Bmob.Query("addcar");
  query.equalTo("objectId", "==", id);
  query.find().then(res => {
    console.log(res)
    that.setData({
      dea: res,
    })
    // typeof cb == 'function' && cb(res)
  });
}

function goxiangqing(cb) {
  var that = this;
  const query = Bmob.Query("xiangqing");
  query.find().then(res => {
    console.log(res)
    that.setData({
      deatil: res,
    })
    typeof cb == 'function' && cb(res)
  });
}
/**
 * 添加购物车方法
 */
function goaddcar(price, house, url, num, username) {
  const query = Bmob.Query('addcar');
  query.set("price", price)
  query.set("house", house)
  query.set("url", url)
  query.set("num", num)
  query.set("username", username)
  query.save().then(res => {
    that.setData({
      cId: res.objectId
    })
    console.log(res)
  }).catch(err => {
    console.log("失敗")
  })
}

function delelteId(id) {
  const query = Bmob.Query('addcar');
  query.destroy(id).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

function getuser(user) {
  var that = this;
  const query = Bmob.Query("user");
  query.equalTo("username", "==", user);
  query.find().then(res => {
    console.log(res)
    that.setData({
      dea: res,
    })
    if (that.data.dea.length != 0) {
      if (that.data.pass != that.data.dea[0].password) {
        wx.showToast({
          title: '密码不正确',
          icon: 'fail',
          duration: 2000
        })

      } else {
        wx.showToast({
          title: '即将去往我的',
          icon: 'loading',
          duration: 4000
        })
        wx.switchTab({
          url: '../user/user',
        })
      }
    } else {
      // 这里修改成跳转的页面
      wx.showToast({
        title: '用户名不正确',
        icon: 'success',
        duration: 2000
      })

    }

    // typeof cb == 'function' && cb(res)
  });
}
/**
 * 添加预定时间和房间大小
 */
function adddate(username, dinghouse, time, date) {
  const query = Bmob.Query('ding');
  query.set("username", username)
  query.set("dinghouse", dinghouse)
  query.set("time", time)
  query.set("date", date)
  query.save().then(res => {
    console.log(res)
  }).catch(err => {
    console.log("失敗")
  })
}
/**跑马灯 */
function getrun(cb) {
  var that = this;
  // console.log(that)
  const query = Bmob.Query("run");
  query.find().then(res => {
    console.log(res)
    that.setData({
      dea: res,
      text: res[0].text.length
    })

    typeof cb == 'function' && cb(res)
  });
}
/**
 * Bmob登陆
 */

function getlogin(username, password) {
  var that = this
  Bmob.User.login(username, password).then(res => {
    // var sesionionToken = res.data.sesionionToken
    var sessionToken = res.sessionToken
    that.setData({
      sessionToken: sessionToken,
      dea: res
    })
    wx.switchTab({
      url: '../index/index',
    })
  }).catch(err => {
    console.log(err)
    wx.showToast({
      title: '用户名和密码不正确',
      icon: 'success',
      duration: 2000
    })
  });
}
/**
 * 注册方法
 */
function regis() {
  var that = this
  let params = {
    username: that.data.username,
    password: that.data.password,
    phone: that.data.phone
  }
  // var reg = new RegExp('/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/');
  // var pas = new RegExp('/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/');
  // var ph = new RegExp('/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/');
  var mobile = /^[1][3,4,5,7,8][0-9]{9}$/; //判断手机号格式
  if (!that.data.username) {
    wx.showToast({
      icon: 'none',
      title: '用户名不能为空',
    })
    return false
  } else if (!that.data.phone) {
    wx.showToast({
      icon: 'none',
      title: '手机号码不能为空',
    })
    return false
  } else if (!mobile.test(that.data.phone)) {
    wx.showToast({
      title: '手机号格式错误',
      icon: 'none',
      duration: 2000
    })
    return false;
  } else if (!that.data.password) {
    wx.showToast({
      icon: 'none',
      title: '密码不能为空',
    })
    return false
  } else if (that.data.password.length !=6) {
    wx.showToast({
      icon: 'none',
      title: '不能少于6位',
    })
    return false
  } else {
    Bmob.User.register(params).then(res => {
      console.log(res)
      wx.showToast({
        title: '註冊成功',
        icon: 'success',
        duration: 2000
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }).catch(err => {
      wx.showToast({
        title: '註冊失敗',
        icon: 'fail',
        duration: 2000
      })
      console.log(err)
    });
  }
}
/**
 * 添加收藏的方法
 */
function addcollection(username, house, price, iurl) {
  var that = this;
  const query = Bmob.Query('colection');
  query.set("username", username)
  query.set("house", house)
  query.set("price", price)
  query.set("iurl", iurl)
  query.save().then(res => {
    console.log(res)
    that.setData({
      coId: res.objectId
    })
  }).catch(err => {
    console.log("失敗")
  })
}
/**
 * 根据姓名查订单
 */
function selectuserdingname(username){
  var that = this;
  const query = Bmob.Query("ding");
  query.equalTo("username", "==", username);
  query.find().then(res => {
    if (res.length == 0) {
      that.setData({
        hidden: false,
      
      })
    }
    console.log(res)
    that.setData({
      dea: res,
      // phone: res.phone
    })
    // typeof cb == 'function' && cb(res)
  });
}
/**
 * 查询姓名查收藏
 */
function selectusername(username) {
  var that = this;
  const query = Bmob.Query("colection");
  query.equalTo("username", "==", username);
  query.find().then(res => {
    console.log(res)
    if (res.length ==0){
      that.setData({
        hidden: false,
      })
    }
    that.setData({
      dea: res,
    })
    // typeof cb == 'function' && cb(res)
  });
}
/**
 * 查询购物车
 */
function selectcarname(username) {
  var that = this;
  const query = Bmob.Query("addcar");
  query.equalTo("username", "==", username);
  query.find().then(res => {
    console.log(res)
    if (res.length == 0) {
      that.setData({
        hasList: false,
      })
    }
    that.setData({
      dea: res,
    })
    // typeof cb == 'function' && cb(res)
  });
}
/**
 * 删除收藏
 */
function deleltecarId(id) {
  const query = Bmob.Query('ding');
  query.destroy(id).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}



/**
 * 删除收藏
 */
function deleltecollection(id) {
  const query = Bmob.Query('colection');
  query.destroy(id).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
/**
 * 查讯用户手机号
 */
function getUsers(username) {
  var that = this;
  const query = Bmob.Query("_User");
  query.equalTo("username", "==", username);
  query.find().then(res => {
    console.log(res)
    that.setData({
      dea: res,
      phones:res[0].phone
    })
    // typeof cb == 'function' && cb(res)
    app.globalData.phone = res[0].phone
  });
}
/**
 * 发起支付
 */

function getpay(price){
  // // var openId = Bmob.User.current().get('authData').weapp.openid;
  //  var openId = wx.getStorageSync('openid');
  // //传参数金额，名称，描述,openid
  // Bmob.Pay.weApp(price, openId).then(function (resp) {
  //   console.log(resp);

  //   that.setData({
  //     loading: true,
  //     dataInfo: resp
  //   })

  //   //服务端返回成功
  //   var timeStamp = resp.timestamp,
  //     nonceStr = resp.noncestr,
  //     packages = resp.package,
  //     orderId = resp.out_trade_no,//订单号，如需保存请建表保存。
  //     sign = resp.sign;

  //   //打印订单号
  //   console.log(orderId);

  //   //发起支付
  //   wx.requestPayment({
  //     'timeStamp': timeStamp,
  //     'nonceStr': nonceStr,
  //     'package': packages,
  //     'signType': 'MD5',
  //     'paySign': sign,
  //     'success': function (res) {
  //       //付款成功,这里可以写你的业务代码
  //       console.log(res);
  //     },
  //     'fail': function (res) {
  //       //付款失败
  //       console.log('付款失败');
  //       console.log(res);
  //     }
  //   })

  // }, function (err) {
  //   console.log('服务端返回失败');
  //   console.log(err);
  // });
}
/**
 * 更新购买数
*/
function Buy(id,sho){
  var that =this
  const query = Bmob.Query('tiao');
  query.equalTo("objectId", "==", id);
  query.set('id', id) //需要修改的objectId
  query.set('sho', sho)


  query.save().then(res => {
    that.setData({
      sho: sho,
      id:id
    })

    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

function location(latitude, longitude){
  const point = Bmob.GeoPoint({ latitude: latitude, longitude:longitude })
}
module.exports = {
  getBoList: getBoList,
  getimgurl: getimgurl,
  godetil: godetil,
  gettiao: gettiao,
  gettiaos: gettiaos,
  goxiangqing: goxiangqing,
  goaddcar: goaddcar,
  getcar: getcar,
  getcars: getcars,
  getcarfind: getcarfind,
  delelteId: delelteId,
  getuser: getuser,
  adddate: adddate,
  getrun: getrun,
  getlogin: getlogin,
  addcollection: addcollection,
  selectusername: selectusername,
  selectcarname: selectcarname,
  deleltecarId: deleltecarId,
  regis: regis,
  selectuserdingname: selectuserdingname,
   deleltecollection: deleltecollection,
  getUsers: getUsers,
  getpay: getpay,
   Buy: Buy,
  location: location
}