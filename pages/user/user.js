// pages/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseAddress: "http://localhost:8080/",
    baseImageAddress: "http://localhost:8080/img/",
    user: [],
    body: [],
    /**
     * 从用户的登录界面获取
     * TODO
     */
    userId: '28adf861-5b81-11eb-8fb9-00163e10d555'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserById();
    this.getBodyById();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  /**
   * 通过id获取用户信息
   */
  getUserById: function(){
    var that = this;

    wx.request({
      url: that.data.baseAddress + 'user/selectOne?id=' + that.data.userId,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          user: res.data.data
        });
      }
    });
  },

  /**
   * 根据id获取身体信息
   */
  getBodyById: function () {
    var that = this;

    wx.request({
      url: that.data.baseAddress + 'body/selectOne?id=' + that.data.userId,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          body: res.data.data
        });
      }
    });
  },

  
  getCalendarData(e) { // 监听日历数据
    console.log(e.detail)
  }
})