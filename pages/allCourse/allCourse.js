// pages/allCourse/allCourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏内容
    navTopItems: "",
    // courses集合
    courses: "",
    // 被选中的导航栏的下标
    current: "",
    // 搜索框中的值
    searchVal: "",
    // 搜索框中有内容后对应查询值
    searchResult: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 初始加载页面时向后台申请查询数据
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/queryAllByLimit',
      success: function (res) {
        that.setData({
          courses: res.data.data
        })
      }
    })

    // 初始化时加载导航栏内容
    wx.request({
      url: 'http://localhost:8080/course/queryAllKeyword',
      success: function (res) {
        that.setData({
          navTopItems: res.data.data
        })
      }
    })
  },

  // 点击导航栏按钮后根据导航栏显示内容
  chooseNav: function (event) {

    // 更改导航栏样式
    var index = event.currentTarget.dataset.index;
    this.setData({
      current: index
    })
    // 获取导航栏内容
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/queryByLike',
      data: {
        value: event.currentTarget.dataset.title
      },
      success: function (res) {
        that.setData({
          courses: res.data.data
        })
      }
    })
  },

  // 提交搜索框时触发的函数
  sendSearch: function (event) {
    var val = event.detail.value;
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/queryByLike',
      data: {
        value: val
      },
      success: function (res) {
        if (res.data.data.length === 0) {
          that.setData({
            searchVal:""
          })
          wx.showToast({
            title: '抱歉 没有搜索到有关课程',
            icon: "none",
            duration: 2000 //持续的时间
          })
        } else {
          that.setData({
            courses: res.data.data
          });
        }
      }
    })
  },

  // 搜索框内容改变后
  changeSearch: function (event) {
    var that = this;
    var message = event.detail.value;
    this.setData({
      searchVal:message
    })
    if (message != null&&message.length!=0) {
      wx.request({
        url: 'http://localhost:8080/course/queryByLike',
        data: {
          value: message
        },
        success: function (res) {
          if (res.data.data.length != 0) {
            that.setData({
              searchResult: res.data.data
            })
          }
        }
      })
    }else if(message.length==0){
      this.setData({
        searchResult:""
      })
    }
  },

  // 点击搜索框结果后
  chooseSearchResult:function(event){
    var that = this;
    this.setData({
      searchResult:"",
      searchVal:""
    });
    wx.request({
      url: 'http://localhost:8080/course/selectOne/'+event.target.dataset.val,
      success:function(res){
        that.setData({
          searchVal:"",
          searchResult:"",
          courses:res.data.data
        });
      }
    })
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

  }
})