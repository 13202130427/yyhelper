const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    error: false,
    url: '',
    hasUrl: 0,
    legalLength: 1
  },
  /**
   * 计算输入框值的长度 小于300
   */
  length: function (e) {
    let length = e.detail.value.length
    let url = e.detail.value
    if (length > 0) {
      this.setData({
        length: length,
        hasUrl: 1,
        url: url
      })
    } else {
      this.setData({
        length: length,
        hasUrl: 0,
        url: url
      })
    }
    // console.log(length)
    if (length > 300 || length ==0) {
      this.setData({
        legalLength: 1
      })
    } else {
      this.setData({
        legalLength: 0
      })
    }
  },
  /**
   * 获取输入的文本
   */
  urlInput: function (e) {
    this.setData({
      url: e.detail.value
    })
  },
  /**
   * 保存项目业绩
   */
  saveUrl: function (e) {
    var that = this;
    if (this.data.length > 300 || this.data.length ==0) {
      this.setData({
        error: true
      })
    } else {
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[pages.length - 2];
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        url: this.data.url,
        hasUrl: 1
      })
      wx.navigateBack({
        delta: 1,
      })
    }

  },
  /**
   * 关闭提示框
   */
  close: function () {
    this.setData({
      error: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.judge == 1) {
      this.setData({
        url: options.url,
        length: options.url.length,
        legalLength: 0,
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