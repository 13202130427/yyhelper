
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '请输入',
    chooseIndustry:'请选择',
    department: '请输入',
    info: '请输入',
    achievement: '选填 请输入',
    chooseIndustryType:'请选择',
    job_id:'',
    industry_id:'',
    hasName: 0,
    hasIndustry: 0,
    hasDepartment: 0,
    hasInfo: 0,
    hasAchievement: 0,
    hasIndustryType:0,
    hasStartTime:0,
    hasEndTime:1,
    data:'2020-02-12',
    nowtime: '',
    start_time: '入职时间',
    end_time:'',
    type:'',
    userId:'',
    alertStatusOk:false,
    alertStatusError:false,
    hiddenError:true,
    saveError:'',
    action:'add',
    id:''
  },
  /**
   * 选择入职时间
   */
  bindStartDateChange:function(e){
    this.setData({
      start_time: e.detail.value,
      hasStartTime:1
    })

  },
  /**
   * 选择辞职时间
   */
  bindEndDateChange:function(e){
    this.setData({
      end_time: e.detail.value,
      hasEndTime:1
    })
  },
  /**
   * 保存工作经历
   */
  saveJobHistory:function(){
    var that = this;
    console.log(that.data.userId)
    if (that.data.name == '请输入'){
      that.setData({
        hiddenError:false,
        saveError:'请输入公司名称'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError:''
        })
      }, 1000)
      return false
    }
    if (that.data.chooseIndustry == '请选择') {
      that.setData({
        hiddenError: false,
        saveError: '请选择所在行业'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }
    if (that.data.start_time == '入职时间') {
      that.setData({
        hiddenError: false,
        saveError: '请填写入职时间'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }
    if (that.data.chooseIndustryType == '请选择') {
      that.setData({
        hiddenError: false,
        saveError: '请选择职业类型'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }
    if (that.data.department == '请输入') {
      that.setData({
        hiddenError: false,
        saveError: '请填写所属部门'
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
    if (that.data.achievement == '选填 请输入'){
      that.setData({
        achievement: ''
      })
    }
    if(that.data.action=='add'){
      wx.request({
        url: "https://www.api.yyhelper.icu/1.0/jobhistories",
        method: 'POST',
        data: {
          company_name: that.data.name,
          industry_id: that.data.industry_id,
          start_time: that.data.start_time,
          end_time: that.data.end_time,
          job_id: that.data.job_id,
          department: that.data.department,
          info: that.data.info,
          achievement: that.data.achievement,
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
    if (that.data.action == 'update'){
      wx.request({
        url: "https://www.api.yyhelper.icu/1.0/jobhistories/" + that.data.id,
        method: 'PUT',
        data: {
          company_name: that.data.name,
          industry_id: that.data.industry_id,
          start_time: that.data.start_time,
          end_time: that.data.end_time,
          job_id: that.data.job_id,
          department: that.data.department,
          info: that.data.info,
          achievement: that.data.achievement
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
  saveAlertBtn:function(){
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
    var that =this;
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var nowtime = Y + '-' + M;
    that.setData({
      nowtime: nowtime,
      end_time: nowtime,
      type:options.type,
      action:options.action,
      userId: app.globalData.userId
    })
    console.log(options)
    //判断是否有id传入
    if(options.id){
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/jobhistories/' + options.id,
        method:'GET',
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if(data.data.statuscode == 200){
            that.setData({
              name: data.data.jobhistory.company_name,
              chooseIndustry: data.data.jobhistory.industry,
              department: data.data.jobhistory.department,
              info: data.data.jobhistory.info,
              achievement: data.data.jobhistory.achievement,
              chooseIndustryType: data.data.jobhistory.chooseIndustryType,
              job_id: data.data.jobhistory.job_id,
              industry_id: data.data.jobhistory.industry_id,
              hasName: 1,
              hasIndustry: 1,
              hasDepartment: 1,
              hasInfo: 1,
              hasAchievement: 1,
              hasIndustryType: 1,
              hasStartTime: 1,
              hasEndTime: 1,
              start_time: data.data.jobhistory.start_time,
              end_time: data.data.jobhistory.end_time,
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