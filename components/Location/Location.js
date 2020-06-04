const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '梅州市', '梅江区'],
    index: 0,
    university: [
      {
        id: 1,
        name: '嘉应学院(江北校区)',
        status: 1
      },
      {
        id: 7,
        name: '嘉应学院(江南校区)',
        status: 0
      },
    ],
  },
  /**0
   * 省市区
   */
  bindRegionChange: function (e) {
    var that = this;
    wx.request({
      url:"https://www.api.yyhelper.icu/1.0/universities",
      method: 'GET',
      data: { 
        region: e.detail.value[2], 
        city: e.detail.value[1]
        },
      header: {
        'Content-Type': 'application/json',
      },
      success:function(data){
        console.log(data.data.university);
        that.setData({
          region: e.detail.value,
          university: data.data.university,
        })
      },
      fail:function(){
        console.log("请求数据失败");
      }
    });  
  },
  /**
   * 选择学校
   */
  bindUniversityChange: function (e) {
    if (this.data.university[e.detail.value].status == 0){
      console.log('当前学校暂时不提供服务');
      app.globalData.dataStatus = false;
    }
    this.setData({
      index: e.detail.value,
    })
    app.globalData.universityId = this.data.university[e.detail.value].id;
    console.log(app.globalData.universityId)
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