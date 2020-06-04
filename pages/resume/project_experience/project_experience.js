
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '请输入',
    role: '请输入',
    info: '请输入',
    achievement:'选填 请输入',
    url:'选填 请输入',
    hasName: 0,
    hasRole: 0,
    hasInfo: 0,
    hasAchievement:0,
    hasUrl:0,
    hasStartTime: 0,
    hasEndTime: 0,
    data: '2020-02-12',
    nowtime: '',
    start_time: '开始时间',
    end_time: '结束时间',
    type: '',
    userId: '',
    alertStatusOk: false,
    alertStatusError: false,
    hiddenError: true,
    saveError: '',
    action: 'add',
    id: ''
  },
  /**
   * 选择开始时间
   */
  bindStartDateChange: function (e) {
    this.setData({
      start_time: e.detail.value,
      hasStartTime: 1
    })

  },
  /**
   * 选择结束时间
   */
  bindEndDateChange: function (e) {
    this.setData({
      end_time: e.detail.value,
      hasEndTime: 1
    })
  },
  /**
   * 保存项目经历
   */
  saveCampusExperience: function () {
    var that = this;
    console.log(that.data.userId)
    if (that.data.name == '请输入') {
      that.setData({
        hiddenError: false,
        saveError: '请输入项目名称'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }

    if (that.data.start_time == '开始时间') {
      that.setData({
        hiddenError: false,
        saveError: '请填写开始时间'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }
    if (that.data.end_time == '结束时间') {
      that.setData({
        hiddenError: false,
        saveError: '请填写结束时间'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }
    if (that.data.role == '请输入') {
      that.setData({
        hiddenError: false,
        saveError: '请填写担任角色'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }
    if (that.data.info == '请输入') {
      that.setData({
        hiddenError: false,
        saveError: '请填写工作内容'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }
    if (that.data.action == 'add') {
      wx.request({
        url: "https://www.api.yyhelper.icu/1.0/projectexperiences",
        method: 'POST',
        data: {
          project_name: that.data.name,
          start_time: that.data.start_time,
          end_time: that.data.end_time,
          role: that.data.role,
          info: that.data.info,
          achievement: that.data.achievement,
          url: that.data.url,
          type: that.data.type,
          userId: that.data.userId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if(res.data.statuscode == 201){
            that.setData({
              alertStatusOk: true
            })
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      });
    }
    if (that.data.action == 'update') {
      wx.request({
        url: "https://www.api.yyhelper.icu/1.0/projectexperiences/" + that.data.id,
        method: 'PUT',
        data: {
          project_name: that.data.name,
          start_time: that.data.start_time,
          end_time: that.data.end_time,
          role: that.data.role,
          info: that.data.info,
          achievement: that.data.achievement,
          url: that.data.url
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
    }

  },
  saveAlertBtn: function () {
    wx.switchTab({
      url: '/pages/jianli/jianli',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var nowtime = Y + '-' + M;
    that.setData({
      nowtime: nowtime,
      type: options.type,
      action: options.action,
      userId: app.globalData.userId
    })
    console.log(options)
    //判断是否有id传入
    if (options.id) {
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/projectexperiences/' + options.id,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if(data.data.statuscode == 200){
            that.setData({
              name: data.data.projectexperience.project_name,
              role: data.data.projectexperience.role,
              info: data.data.projectexperience.info,
              achievement: data.data.projectexperience.achievement,
              url: data.data.projectexperience.url,
              hasName: 1,
              hasRole: 1,
              hasInfo: 1,
              hasAchievement: 1,
              hasUrl: 1,
              hasStartTime: 1,
              hasEndTime: 1,
              start_time: data.data.projectexperience.start_time,
              end_time: data.data.projectexperience.end_time,
              id: options.id
            })
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }

      })
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