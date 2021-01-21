// app.js
App({
  onLaunch() {
    //假定成功登陆，直接使用id去数据库查信息
    //28adf861-5b81-11eb-8fb9-00163e10d555
    //
    const userId = "28adf861-5b81-11eb-8fb9-00163e10d555";
    const app = this;

    wx.request({
      url: 'http://localhost:8080/user/selectOne',
      method: "GET",
      data:{
        "id": userId
      },
      success: function(res){
        app.globalData.userInfo = res.data.data;
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
