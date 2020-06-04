const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    person_audit:'',
    student_audit:''
  },
  upShopLogo:function(){
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album');//从相册中选择
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera');//手机拍照
          }
        }
      }
    })
  },
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res)
        that.upload_file(res.tempFilePaths[0])
      }
    })

  },
  upload_file: function (filePath) {
    var that = this;
    wx.uploadFile({
      url: 'https://www.api.yyhelper.icu/1.0/users/photo/' + app.globalData.userId,
      filePath: filePath,
      name: 'file',
      success(res) {
        //json字符串 需用JSON.parse 转
        console.log(res)
        that.onLoad();
      }
    })
  },
  openNameEdit:function(){
    wx.navigateTo({
      url: '/pages/myinfo/page/name/name',
    })
  },
  openPhoneEdit: function () {
    if (this.data.userInfo.phone == 0){
      wx.navigateTo({
        url: '/pages/myinfo/page/phone/phone?status=0',
      })
    }else{
      wx.navigateTo({
        url: '/pages/myinfo/page/phone/phone?status=1&mobile=' + this.data.userInfo.phone,
      })
    }
    
  },
  openCreartStudy:function(){
    wx.navigateTo({
      url: '/pages/myinfo/page/study/study',
    })
  },
  openStudyList: function () {
    wx.navigateTo({
      url: '/pages/myinfo/page/studylist/studylist',
    })
  },
  openAuditPerson:function(){
    wx.navigateTo({
      url: '/pages/myinfo/page/person/person',
    })
  },
  openAuditStudent:function(){
    wx.navigateTo({
      url: '/pages/myinfo/page/student/student',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/'+app.globalData.userId,
      method:'GET',
      data:{
        phone:true
      },
      success:function(res){
        if(res.data.statuscode == 200){
          that.setData({
            userInfo: res.data.userInfo
          })
          app.globalData.userInfo = res.data.userInfo;
        }
      },
      fail:function(){
        console.log('调用接口错误')
      }
    })
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/auditperson/' + app.globalData.userId,
      method:'GET',
      success:function(res){
        if(res.data.statuscode == 200){
          that.setData({
            person_audit: res.data.audit
          })
        }
      }
    })
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/auditstudent/' + app.globalData.userId,
      method: 'GET',
      success: function (res) {
        if (res.data.statuscode == 200) {
          that.setData({
            student_audit: res.data.audit
          })
        }
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
    var that = this;
    if (that.data.userInfo != app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    }
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