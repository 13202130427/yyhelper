const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routelist:[
    ],
    hiddenError: true,
    saveError: '该任务点未完成',
    deleteText:'学习路线',
    deletealert:false,
  },
  openMystudy:function(e){
    var that = this;
    if(e.currentTarget.dataset.end){
      wx.navigateTo({
        url: '/pages/mystudy/mystudy?id='+e.currentTarget.dataset.id,
      })
    }else{
      that.setData({
        hiddenError: false,
      })
      setTimeout(function () {
        that.setData({
          hiddenError: true
        })
      }, 1000)
      return false
    }
  },
  /**
   * 退出学习路线弹窗
   */
  deleteAlreat:function(){
    this.setData({
      deletealert:true
    })
  },
  /**
   * 退出学习路线
   */
  deleteRoute: function (e){
    var that = this;
    console.log(e)
    if (e.detail.index == 0) {
      //取消
      that.setData({
        deletealert:false
      })
    }
    if (e.detail.index == 1){
      //退出学习路线
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/users/route/' + app.globalData.userId,
        method:'DELETE',
        success:function(res){
          if(res.data.statuscode == 200){
            that.setData({
              deletealert: false
            })
            that.onShow();
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.hasUserInfo) {
      wx.navigateTo({
        url: "/pages/login/login"
      })
      return false
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
    var that = this;
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/route/more/' + app.globalData.userId,
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.statuscode == 200) {
          that.setData({
            routelist: res.data.study
          })
          return true
        }
        if (res.data.statuscode == 52201) {
          wx.navigateTo({
            url: '/pages/home/page/route/route',
          })
        }
      },
      fail: function () {
        console.log('调用接口失败')
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