const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseIndustry: '',
    industry:[]  
  },
  /**
   * 实现所在行业折叠菜单功能
   */
  openIndustryList: function(e){
    var that = this;
    var idx = e.currentTarget.id;
    var Industry = that.data.industry;
    for (let i = 0; i < Industry.length; i++) {
      if (idx == i) {
        Industry[i].hiddena = !Industry[i].hiddena;
      } else {
        Industry[i].hiddena = true;
      }
    }
    this.setData({ industry: Industry });
    return true; 
  },
  /**
   * 选中行业提交 跳转
   */
  chooseIndustry: function(e){
    var that = this;
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      chooseIndustry: e.currentTarget.dataset.text,
      industry_id: e.currentTarget.dataset.id,
      hasIndustry: 1
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
      url: 'https://www.api.yyhelper.icu/1.0/industries',
      method:"GET",
      success: function(res){
        var Industry = res.data.industry;
        for (let i = 0; i < Industry.length;i++){
          Industry[i]['hiddena'] = true;
          that.setData({
            industry: Industry
          })
        }
      },
      fail: function(res){
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