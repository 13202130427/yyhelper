Page({

  /**
   * 页面的初始数据
   */
  data: {
    p:0,
    page:1,
    length:1,
    video_id:0,
    url:'',
    videolist:''
  },
  changepage:function(e){
    console.log(e.currentTarget)
    this.setData({
      p:e.currentTarget.id,
      page: e.currentTarget.id-1+2,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    that.setData({
      url:options.url,
      video_id: options.video_id
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
    var that = this;

    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/videos/' + this.data.video_id,
      method: 'GET',
      success: function (res) {
        if(res.data.statuscode == 200){
          that.setData({
            videolist: res.data.videolist,
            length: res.data.videolist.length
          })
        }
      }
    })
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