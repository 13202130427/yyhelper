const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    alertStatus: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    var that = this;
    console.log(e)
    console.log('01')
    
    wx.request({
      url: "https://www.api.yyhelper.icu/1.0/users",
      method: 'PUT',
      data: {
        name: e.detail.userInfo.nickName,
        sex: e.detail.userInfo.gender,
        city: e.detail.userInfo.city,
        province: e.detail.userInfo.province,
        country: e.detail.userInfo.country,
        photo: e.detail.userInfo.avatarUrl,
        userId: app.globalData.userId
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (data) {
        console.log('02')
        console.log(data);
        app.globalData.userInfo = data.data.userInfo;
        app.globalData.hasUserInfo = true;
        that.setData({
          userInfo: data.data.userInfo,
          hasUserInfo: true,
          alertStatus: true
        });
      },
      fail: function () {
        console.log("请求数据失败");
      }
    });  
    
  },
  /**
   * 微信授权成功跳转
   */
  loginAlertBtn(e){
    // wx.reLaunch({
    //   url: '../home/home',
    // })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.hasUserInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        alertStatus: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          alertStatus: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            alertStatus: true
          })
        }
      })
    }
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