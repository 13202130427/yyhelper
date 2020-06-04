const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.data.Time = setInterval(() => {
      that.setData({
        time: --that.data.time
      })
      if (that.data.time <= 0) {
        clearInterval(that.data.Time)
        if (!app.globalData.status) {
          wx.reLaunch({
            url: '../error/error'
          })
        }
        if (app.globalData.status) {
          wx.reLaunch({
            url: '../index/index'
          })
        }
        // wx.showLoading({
        //   title: '加载中',
        // })
        // setTimeout(function () {
        //   console.log(app.globalData.status)
          
        //   wx.hideLoading()
        // }, 2000)
       
      }
    }, 1000)
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