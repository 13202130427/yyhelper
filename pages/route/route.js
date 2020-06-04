const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    route:{},
    routeId:'',
    hover:0,
  },
  /**
   * 选中该路线
   */
  chooseRoute: function(){
    var that = this;
    that.setData({
      hover: 0
    })
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/route/' + app.globalData.userId,
      method:'PUT',
      data:{
        routeId: that.data.routeId
      },
      success: function(res){
        if(res.data.statuscode == 202){
          console.log(res)
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            myroute: that.data.route,
            hasroute: true
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      },
      fail: function(){
        console.log('调用接口失败')
      }
    })
  },
  /**
   * 返回管理学习路线界面
   */
  backRoute:function(){
    this.setData({
      hover:1
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/routes/' + options.id,
      method:'GET',
      success: function(res){
        console.log(res)
        if(res.data.statuscode == 200){
          that.setData({
            route:res.data.route,
            routeId: options.id
          })
        }
      },
      fail: function () {
        console.log('调用接口失败')
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