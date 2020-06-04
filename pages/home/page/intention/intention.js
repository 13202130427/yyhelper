
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    jobStatus:['离校-随时到岗','在校-月内到岗','在校-考虑机会','在校-暂不考虑'],
    region: ['广东省', '梅州市', '梅江区'],
    customItem:'不限',
    showMoneylist:'面议',
    moneylist: [
      ['面议', '1K', '2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K'],
      ['面议']
      ],
      moneyIndex:['0','0'],
    chooseIndustry: '请选择',
    chooseIndustryType: '请选择',
    job_id: 0,
    industry_id:0,
    hasIndustry: 0,
    hasIndustryType: 0,
    userId: '',
    alertStatusOk: false
  },
  /**
   * 选中求职状态
   */
  bindStatusChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  /**0
   * 选中城市
   */
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 薪酬选中
   */
  bindMoneyChange:function(e){
    var showMoneyList = '';
    console.log(this.data.moneylist[0][this.data.moneyIndex[0]]);
    if (this.data.moneylist[0][this.data.moneyIndex[0]]=='面议'){
      showMoneyList = '面议'
    }else{
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '1K'){
        showMoneyList = '1-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '2K') {
        showMoneyList = '2-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '3K') {
        showMoneyList = '3-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '4K') {
        showMoneyList = '4-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '5K') {
        showMoneyList = '5-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '6K') {
        showMoneyList = '6-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '7K') {
        showMoneyList = '7-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '8K') {
        showMoneyList = '8-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
      if (this.data.moneylist[0][this.data.moneyIndex[0]] == '9K') {
        showMoneyList = '9-' + this.data.moneylist[1][this.data.moneyIndex[1]]
      }
    }
    this.setData({
      showMoneylist: showMoneyList
    })
  },
  /**
   * 薪酬选择器效果
   */
  bindMoneyColumnChange:function(e){
    var data = this.data.moneylist;
    var index = this.data.moneyIndex;
    console.log(e)
    if (e.detail.column == 0 && index[0] != e.detail.value){
      switch (e.detail.value) {
        case 0: data[1] = ['面议']; break;
        case 1: data[1] = ['2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', '10K及以上']; break;
        case 2: data[1] = ['3K', '4K', '5K', '6K', '7K', '8K', '9K', '10K及以上']; break;
        case 3: data[1] = ['4K', '5K', '6K', '7K', '8K', '9K', '10K及以上']; break;
        case 4: data[1] = ['5K', '6K', '7K', '8K', '9K', '10K及以上']; break;
        case 5: data[1] = ['6K', '7K', '8K', '9K', '10K及以上']; break;
        case 6: data[1] = ['7K', '8K', '9K', '10K及以上']; break;
        case 7: data[1] = ['8K', '9K', '10K及以上']; break;
        case 8: data[1] = ['9K', '10K及以上']; break;
        case 9: data[1] = ['10K及以上']; break;
      }
      this.setData({
        moneyIndex: [e.detail.value, 0],
        moneylist: data
      })
    }
    if (e.detail.column == 1){
      this.setData({
        moneyIndex: [index[0], e.detail.value],
        moneylist: data
      })
    }
    
  },
  /**
   * 保存求职意向
   */
  saveJbIntention: function () {
    var that = this;
    console.log(that.data.userId)
      wx.request({
        url: "https://www.api.yyhelper.icu/1.0/jobintentions/" + that.data.userId,
        method: 'PUT',
        data: {
          status: that.data.index,
          industry_id: that.data.industry_id,
          job_id: that.data.job_id,
          region:that.data.region,
          moneyIndex: that.data.moneyIndex,
          showMoneylist: that.data.showMoneylist
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if(res.data.statuscode == 202){
            that.setData({
              alertStatusOk: true
            })
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      });
  },
  saveAlertBtn: function () {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = this.data.moneylist;
    console.log(list)
    var that = this;
    that.setData({
      userId: app.globalData.userId
    })
    wx.request({
      url: "https://www.api.yyhelper.icu/1.0/jobintentions/" + that.data.userId,
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.statuscode == '200'){
          var index = res.data.jobintention.moneyIndex[1];
          console.log(index)
          switch (index) {
            case '0': list[1] = ['面议']; break;
            case '1': list[1] = ['2K', '3K', '4K', '5K', '6K', '7K', '8K', '9K', '10K及以上']; break;
            case '2': list[1] = ['3K', '4K', '5K', '6K', '7K', '8K', '9K', '10K及以上']; break;
            case '3': list[1] = ['4K', '5K', '6K', '7K', '8K', '9K', '10K及以上']; break;
            case '4': list[1] = ['5K', '6K', '7K', '8K', '9K', '10K及以上']; break;
            case '5': list[1] = ['6K', '7K', '8K', '9K', '10K及以上']; break;
            case '6': list[1] = ['7K', '8K', '9K', '10K及以上']; break;
            case '7': list[1] = ['8K', '9K', '10K及以上']; break;
            case '8': list[1] = ['9K', '10K及以上']; break;
            case '9': list[1] = ['10K及以上']; break;
          }
          console.log(list[1])
          that.setData({
            index: res.data.jobintention.status,
            region: res.data.jobintention.region,
            chooseIndustry: res.data.jobintention.chooseIndustry,
            chooseIndustryType: res.data.jobintention.chooseIndustryType,
            hasIndustry: res.data.jobintention.hasIndustry,
            hasIndustryType: res.data.jobintention.hasIndustryType,
            job_id: res.data.jobintention.job_id,
            industry_id: res.data.jobintention.industry_id,
            moneyIndex: res.data.jobintention.moneyIndex,
            moneylist:list,
            showMoneylist: res.data.jobintention.showMoneylist
          })
        }
        
      },
      fail: function () {
        console.log("请求数据失败");
      }
    });
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