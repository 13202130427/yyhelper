const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasroute:false,
    allroute:{},
    myroute:{},
    chooseroute:'recommend',
    recommendroute:{},
    hasrecommend:true
  },
  changeroute:function(){
    if(this.data.chooseroute == 'recommend'){
      var Chooseroute = 'all'
    }else{
      var Chooseroute = 'recommend'
    }
    this.setData({
      chooseroute:Chooseroute
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('我要加载所有路线')
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/routes',
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          allroute: res.data.routeList
        })
      },
      fail: function () {
        console.log('调用接口错误')
      }
    })
    console.log('我要查询用户的路线')
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/route/' + app.globalData.userId,
      method:'GET',
      success:function(res){
        console.log(res)
        if (res.data.statuscode == 52201){
          //未选择路线
          that.setData({
            hasroute: false
          })
          //推荐路线
          console.log('我要推荐路线')
          wx.request({
            url: 'https://www.api.yyhelper.icu/1.0/routes',
            method: 'GET',
            data:{
              userId: app.globalData.userId
            },
            success: function (res1) {
              console.log(res1)
              if (res1.data.statuscode == 51003){
                //没有可以推荐的
                console.log('没有可以推荐的路线')
                that.setData({
                  hasrecommend:false
                })
              }
              if (res1.data.statuscode == 200){
                that.setData({
                  recommendroute: res1.data.routeList,
                  hasrecommend:true
                })
              }
            },
            fail: function () {
              console.log('调用接口错误')
            }
          })
        }
        if(res.data.statuscode == 200){
          //已选择路线
          that.setData({
            hasroute: true,
            myroute: res.data.userRoute
          })
        }
      },
      fail:function(){
        console.log('调用接口错误')
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