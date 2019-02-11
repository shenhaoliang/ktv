// pages/home/marquee/marquee.js
var Bmob = require('../../utils/bmob.js');
var maps = require('../../utils/amap-wx.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
Page({
  data:{
    longitude:"",
    latitude:'',
    controls:"",
    markers:"",
    polyline:"",
    circles:''
  },
   onLoad:function(res){
     var that = this;
     var qqmapsdk = new QQMapWX({
       key: '4V5BZ-42GWG-ONBQY-ICY5E-26TS7-KCFZ4'
     });
     wx.getLocation({
       type: 'gcj02', //返回可以用于wx.openLocation的经纬度
       success: (res) => {
         // let longitude = res.longitude;
         // let latitude = res.latitude;
         let marker = this.createMarker(res);
         that.setData({
          //  +markers: this.getMessageMarkers(),
           scale: 14,
           longitude: res.longitude,
           latitude: res.latitude
         })
       }
     });
   },
  getMessageMarkers() {
    let markers = [];
    for (let item of newsData.initData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
   createMarker(point) {
    let longitude = point.longitude;
    let latitude = point.latitude;
    let marker = {
      iconPath: "../../image/key.png",
      id: point.id || 0,
      street: point.street || '',
      address: point.address || '',
      longitude: longitude,
      latitude: latitude,
      width: 48,
      height: 48
    };
    return marker;
  },
})
