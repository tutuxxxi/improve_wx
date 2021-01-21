// index.js
// 获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    time: null,
    infoList: null,
    bindDisabled: false,
    nums:null
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    const thisPointer = this;

    //等待用户信息返回
    const interval = setInterval(function(){
      if(app.globalData.userInfo != null){
        clearInterval(interval);
        wx.request({
          url: 'http://localhost:8080/userPlan/queryInfo/' + app.globalData.userInfo.userId,
          method: "GET",
          success: function(res){
            //根据用户信息查询首页信息
            //为用户预生成图标序列和颜色序列
            thisPointer.setData({
              infoList: res.data.data,
              nums: util.getNums(10, app.globalData.userInfo.userId)
            });
          }
        })
      }
    }, 100);


    //系统获取日期
    const getTime = setInterval(function(){
      var time = util.formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      thisPointer.setData({
        time: time
      });
    }, 200);

    
    
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
