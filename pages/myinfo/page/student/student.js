const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note: [],
    student_audit: '',
    hasinfo: false,
    edu_bg: ['专科', '本科'],
    photo: '',
    content: '',
    title: '',
    index: 0,
    index1:0,
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
    start_time:'2016-09',
    data: '2016-09',
    nowtime: '2020-09',
    alertstatus: false
  },
  /**
   * 选中学历
   */
  bindEduBgChange:function(e){
    this.setData({
      index1: e.detail.value,
    })
  },
  /**
   * 选择学校
   */
  bindUniversityChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  /**
   * 选择入学时间
   */
  bindStartDateChange: function (e) {
    this.setData({
      start_time: e.detail.value
    })
  },
  closeAlertBtn1: function () {
    this.auditstudent();
    this.setData({
      alertstatus1: false,
      title: ''
    })
  },
  openAuditFailCause: function () {
    this.setData({
      alertstatus: true,
      title: '原因',
      content: this.data.note[0].cause
    })
  },
  openedit: function () {
    this.setData({
      alertstatus1: true,
      title: '学生认证'
    })
  },
  closeAlertBtn: function () {
    this.setData({
      alertstatus: false,
      title: '',
      content: ''
    })
  },
  auditstudent: function () {
    var that = this;
    var university = that.data.university;
    var edu_bg = that.data.edu_bg;
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/users/auditstudent/' + app.globalData.userId,
      method: 'POST',
      data: {
        university_id: university[that.data.index].id,
        edu_bg: edu_bg[that.data.index1],
        start_time: that.data.start_time
      },
      success: function (res) {
        if (res.data.statuscode == 201) {
          that.onLoad();
        }
        if (res.data.statuscode == 52305){
          that.setData({
            alertstatus: true,
            title: '错误',
            content: '请先进行实名认证'
          })
        }
      },
      fail: function () {
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
      data: {
        type: 'student'
      },
      success: function (res) {
        if (res.data.statuscode == 200) {
          that.setData({
            note: res.data.note,
            hasinfo: true
          })
        }
        if (res.data.statuscode == 404) {
          that.setData({
            hasinfo: false
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
    wx.request({
      url: "https://www.api.yyhelper.icu/1.0/universities",
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
      success: function (data) {
        that.setData({
          university: data.data.university,
        })
      },
      fail: function () {
        console.log("请求数据失败");
      }
    });
    that.setData({
      photo: app.globalData.userInfo.avatarUrl
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