var Bmob = require('../../utils/bmob.js')
var app = getApp()
Page({
  data: {
    dea: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true, 
    num:1,
  // 全选状态，默认全选
    obj: {
      name: "hello"
    }
  },
  onShow() {
    this.setData({
      hasList: true,
    });
    this.getTotalPrice();
  },

  onLoad:function(e){
   console.log(e)
   var that =this
   var id =e.id
   Bmob.getcar.call(that,id)
  },
  /**
   * 当前商品选中事件      
   */
  selectList(e) {
    console.log(e)
     const index = e.currentTarget.dataset.index;
    let dea = this.data.dea;
     const selected = dea[index].selected;
     dea[index].selected = !selected;
     this.setData({
      dea: dea
    });
   this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let dea = this.data.dea;
    dea.splice(index, 1);
    this.setData({
    dea: dea
    });
    if (!dea.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    console.log(e)
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let dea = this.data.dea;

    for (let i = 1; i < dea.length; i++) {
      dea[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      dea: dea
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
     console.log(e)
     const index = e.currentTarget.dataset.index;
     let dea = this.data.dea;
     let num = dea[index].num;
     num++;
    dea[index].num = num;
     this.setData({
       dea: dea,
       num:num+1
     });
     this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let dea = this.data.dea;
    let num = dea[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    dea[index].num = num;
    this.setData({
      dea: dea,
           num: num - 1
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let dea = this.data.dea;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < dea.length; i++) {         // 循环列表得到每个数据
      if (dea[i].selected) {                     // 判断选中才会计算价格
        total += dea[i].num * dea[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      dea: dea,
      totalPrice: total.toFixed(2)
    });
  }

})

