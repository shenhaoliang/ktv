// pages/collection/collection.jsvar Bmob = require('../../utils/bmob.js');
var app = getApp()
var Bmob = require('../../utils/bmob.js');
var bool =true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
     show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    var that = this
    var username = app.globalData.userInfo.username

    Bmob.selectusername.call(that,username)

    that.setData({
      username: username,
      hidden: true
    })
  },
  btn_edit: function () {
    var that = this;
    if (bool) {
      that.setData({
        edit_show: "block",
        edit_name: "取消",
        show_edit: "none"
      })
      bool = false;
    } else {
      that.setData({
        edit_show: "none",
        edit_name: "编辑",
        show_edit: "block"
      })
      bool = true;
    }
  },
  deletes:function(e){
    console.log(e)
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = that.data.dea;
    let id = e.currentTarget.dataset.typeId

    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          Bmob.deleltecollection.call(that, id)

          // wx.showToast({
          //   title: '删除成功',
          //   icon: 'success',
          //   duration: 2000
          // });
          // 页面渲染数据
          that.setData({
            dea: list,
          });
          // 如果数据为空
          if (!list.length) {
            that.setData({
               hidden:false
            });
          } else {
            // 调用金额渲染数据
            that.count_price();
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  onLaunch: function(){

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})