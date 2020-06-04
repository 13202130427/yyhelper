import tool from "../../static/js/tool.js";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    industry_type: '',
    job_id:'',
    chooseIndustryType:'',
    result:{},
    searchStatus:false,
    searchInfo: ''
  },
  /**
   * 搜索框
   */
  searchInput: tool.debounce(function (e) {
    var that = this;
    if (e['0'].detail.value.length > 0) {
      console.log('002')
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/posts/three',
        method: 'GET',
        data: {
          key: e['0'].detail.value
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          that.setData({
            result: data.data.result,
            searchStatus: true,
            searchInfo: e['0'].detail.value
          })
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
    }else{
      that.setData({
        searchStatus:false
      })
    }
  },1500),
  /**
   * 保存搜索框的值
   */
  saveInfo:function(e){
    console.log(e)
    this.setData({
      searchInfo: e.detail.value
    })
  },
  /**
   * 清楚搜索框内容
   */
  closeSearchInfo:function(){
    this.setData({
      searchInfo:'',
      result:{},
      searchStatus:false
    })
  },
  /**
   * 选中第一级职位 显示第二级第三级列表
   * 
   */
  openIndustryList:function(e){
    var that = this;
    var idx = e.currentTarget.id;
    var Industry_type = that.data.industry_type;
    for (let i = 0; i < Industry_type.length; i++) {
      if (idx == i) {
        Industry_type[i].hiddena = !Industry_type[i].hiddena;
        //默认第一个为选中状态
        Industry_type[i]['sec_name'][0].hiddenb = false;
      } else {
        Industry_type[i].hiddena = true;
      }
    }
    this.setData({ industry_type: Industry_type });
    console.log(that.data.industry_type);
    return true; 
  },
  
  /**
   * 选中第二级职位 更新第三级列表
   */
  openIndustryList1:function(e){
    var that = this;
    var idx = e.currentTarget.id;
    var Industry_type = that.data.industry_type;
    for (let i = 0; i < Industry_type.length; i++) {
      if (!Industry_type[i].hiddena){
        for (let j = 0; j < Industry_type[i]['sec_name'].length;j++){
          if (idx == j) {
            Industry_type[i]['sec_name'][j].hiddenb = false;
          } else {
            Industry_type[i]['sec_name'][j].hiddenb = true;
          }
        }
      }
    }
    this.setData({ industry_type: Industry_type });
    console.log(that.data.industry_type);
    return true; 
  },
  /**
   * 点击蒙版退出选中
   */
  backhiddena: function(){
    var that = this;
    var Industry_type = that.data.industry_type;
    for (let i = 0; i < Industry_type.length; i++) {
        Industry_type[i].hiddena = true;
      var sec_name = Industry_type[i]['sec_name'];
      for (let j = 0; j < sec_name.length;j++){
        Industry_type[i]['sec_name'][j].hiddenb = true;
      }
    }
    this.setData({ industry_type: Industry_type });
    console.log(Industry_type)
    return true; 
  },
  /**
   * 选中职位 返回
   */
  chooseIndustryType: function(e){
    var that = this;
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      job_id: e.currentTarget.dataset.id,
      chooseIndustryType: e.currentTarget.dataset.text,
      hasIndustryType: 1
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
      url: 'https://www.api.yyhelper.icu/1.0/posts',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
      success: function (data) {
        
        let industry_type = data.data.industry_type;
        for (var i = 0; i<industry_type.length;i++){
          industry_type[i]['hiddena'] = true;
          var sec_name = industry_type[i]['sec_name'];
          for (var j = 0; j < sec_name.length;j++){
            industry_type[i]['sec_name'][j]['hiddenb'] = true;
          }
        }
        console.log(industry_type);
        that.setData({
          industry_type: industry_type
        })
      },
      fail: function () {
        console.log("请求数据失败");
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