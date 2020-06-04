const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note:[],
    person_audit:'',
    hasinfo:false,
    photo:'',
    content:'',
    title:'',
    name:'',
    idcard:'',
    alertstatus:false
  },
  savename:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  saveidcard: function (e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  closeAlertBtn1:function(){
    this.auditperson();
    this.setData({
      alertstatus1: false,
      title: ''
    })
  },
  openAuditFailCause:function(){
    this.setData({
      alertstatus: true,
      title:'原因',
      content:this.data.note[0].cause
    })
  },
  openedit:function(){
    this.setData({
      alertstatus1: true,
      title: '实名认证'
    })
  },
  closeAlertBtn:function(){
    this.setData({
      alertstatus:false,
      title:'',
      content:''
    })
  },
  auditperson:function(){
    var that = this;
    if(that.data.name.length<2){
      that.setData({
        alertstatus: true,
        title: '错误',
        content: '请输入正确的姓名'
      })
      return false;
    }
    if(that.data.idcard.length != 18){
      that.setData({
        alertstatus: true,
        title: '错误',
        content: '请输入正确的身份证号码'
      })
      return false;
    }
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/auditperson/'+ app.globalData.userId,
      method:'POST',
      data:{
        name: that.data.name,
        idcard: that.data.idcard
      },
      success:function(res){
        if(res.data.statuscode == 201){
          that.onLoad();
        }
      },
      fail:function(){
        console.log('调用接口错误');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/auditnote/' + app.globalData.userId,
      method: 'GET',
      data:{
        type:'person'
      },
      success: function (res) {
        if (res.data.statuscode == 200) {
          that.setData({
            note: res.data.note,
            hasinfo:true
          })
        }
        if(res.data.statuscode == 404){
          that.setData({
            hasinfo: false
          })
        }
      }
    })
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/auditperson/' + app.globalData.userId,
      method: 'GET',
      success: function (res) {
        if (res.data.statuscode == 200) {
          that.setData({
            person_audit: res.data.audit
          })
        }
      }
    })
    that.setData({
      photo:app.globalData.userInfo.avatarUrl
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