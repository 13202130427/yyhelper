const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    error: false,
    name: '',
    legalLength: 1
  },
  /**
   * 计算输入框值的长度 大于2小于20
   */
  length: function (e) {
    let length = e.detail.value.length
    // console.log(length)
    this.setData({
      length: length,
      name: e.detail.value
    })
    if (length > 20 || length < 2) {
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
   * 获取输入的name
   */
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  /**
   * 保存昵称
   */
  saveName: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/name/' + app.globalData.userId,
      method:'PUT',
      data:{
        name:that.data.name
      },
      success:function(res){
        if(res.data.statuscode == 202){
          var Userinfo = app.globalData.userInfo;
          Userinfo.nickName = that.data.name
          app.globalData.userInfo = Userinfo;
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            userInfo: Userinfo,
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      },
      fail:function(res){
        console.log('调用接口失败')
      }
    })
     
    

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