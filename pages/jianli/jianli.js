const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    universityClass:[
      {
        name:'大一',
        hiddena:true,
        job_history:{},
        project_experience: {},
        campus_experience:{},
        skill:{},
        prize: {}
      },
      {
        name: '大二',
        hiddena: true,
        job_history: {},
        project_experience: {},
        campus_experience: {},
        skill: {},
        prize: {}
      },
      {
        name: '大三',
        hiddena: true,
        job_history: {},
        project_experience: {},
        campus_experience: {},
        skill: {},
        prize: {}
      },
      {
        name: '大四',
        hiddena: true,
        job_history: {},
        project_experience: {},
        campus_experience: {},
        skill: {},
        prize: {}
      }
    ],
    deleteId:'',
    deleteText:'',
    deleteIndex:''
  },
  /**
   * 简历点击下拉函数
   */
  jianliDown: function(e){
    var that = this;
    var idx = e.currentTarget.id;
    var UniversityClass = that.data.universityClass;
    for (let i = 0; i < UniversityClass.length; i++) {
      if (idx == i) {
        UniversityClass[i].hiddena = !UniversityClass[i].hiddena;
      } else {
        UniversityClass[i].hiddena = true;
      }
    }
    this.setData({ universityClass: UniversityClass });
    return true; 
  },
  /**
   * 跳转工作经历添加页面
   */
  openJobHistory: function(e){
    console.log(e)
    wx.navigateTo({
      url: '../resume/job_history/job_history?type='+e.currentTarget.dataset.text+'&action=add',
    })
  },
  /**
   * 跳转工作经历修改页面
   */
  updateJobHistory:function(e){
    wx.navigateTo({
      url: '../resume/job_history/job_history?action=update&id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.text,
    })
  },
/**
 * 删除判断弹窗
 */
  deleteAlreat:function(e){
    this.setData({
      deleteId: e.currentTarget.dataset.id,
      deleteText:e.currentTarget.dataset.text 
    })
    if (e.currentTarget.dataset.text == '掌握技能' || e.currentTarget.dataset.text == '个人奖项'){
      this.setData({
        deleteIndex: e.currentTarget.dataset.index
      })
    }
  },
  /**
   * 简历信息删除
   */
  deleteNews:function(e){
    var that = this;
    console.log(e)
    if(e.detail.index == 0){
      //取消
      that.setData({
        deleteId:'',
        deleteText:'',
        deleteIndex: ''
      })
    }
    if(e.detail.index == 1){
      //确认
      if (that.data.deleteText == '工作经历'){
        wx.request({
          url: 'https://www.api.yyhelper.icu/1.0/jobhistories/' + that.data.deleteId,
          method: 'DELETE',
          data: {
            userId: app.globalData.userId
          },
          success: function (data) {
            console.log(data)
            that.setData({
              deleteId: '',
              deleteText: '',
            })
            //更新数据
            that.onShow()
          },
          fail: function () {
            console.log("请求数据失败");
            that.setData({
              deleteId: '',
              deleteText: '',
            })
          }
        })
      }
      if (that.data.deleteText == '校园经历') {
        wx.request({
          url: 'https://www.api.yyhelper.icu/1.0/campusexperiences/' + that.data.deleteId,
          method: 'DELETE',
          data: {
            userId: app.globalData.userId
          },
          success: function (data) {
            console.log(data)
            that.setData({
              deleteId: '',
              deleteText: '',
            })
            //更新数据
            that.onShow()
          },
          fail: function () {
            console.log("请求数据失败");
            that.setData({
              deleteId: '',
              deleteText: '',
            })
          }
        })
      }
      if (that.data.deleteText == '项目经历') {
        wx.request({
          url: 'https://www.api.yyhelper.icu/1.0/projectexperiences/' + that.data.deleteId,
          method: 'DELETE',
          data: {
            userId: app.globalData.userId
          },
          success: function (data) {
            console.log(data)
            that.setData({
              deleteId: '',
              deleteText: '',
            })
            //更新数据
            that.onShow()
          },
          fail: function () {
            console.log("请求数据失败");
            that.setData({
              deleteId: '',
              deleteText: '',
            })
          }
        })
      }
      if (that.data.deleteText == '掌握技能') {
        wx.request({
          url: 'https://www.api.yyhelper.icu/1.0/skills/' + that.data.deleteId,
          method: 'DELETE',
          data: {
            userId: app.globalData.userId,
            index:that.data.deleteIndex
          },
          success: function (data) {
            console.log(data)
            that.setData({
              deleteId: '',
              deleteText: '',
              deleteIndex:''
            })
            //更新数据
            that.onShow()
          },
          fail: function () {
            console.log("请求数据失败");
            that.setData({
              deleteId: '',
              deleteText: '',
              deleteIndex: ''
            })
          }
        })
      }
      if (that.data.deleteText == '个人奖项') {
        wx.request({
          url: 'https://www.api.yyhelper.icu/1.0/prizes/' + that.data.deleteId,
          method: 'DELETE',
          data: {
            userId: app.globalData.userId,
            index: that.data.deleteIndex
          },
          success: function (data) {
            console.log(data)
            that.setData({
              deleteId: '',
              deleteText: '',
              deleteIndex: ''
            })
            //更新数据
            that.onShow()
          },
          fail: function () {
            console.log("请求数据失败");
            that.setData({
              deleteId: '',
              deleteText: '',
              deleteIndex: ''
            })
          }
        })
      }
    }
},
  /**
   * 跳转校园经历添加页面
   */
  openCampusExperience: function (e) {
    wx.navigateTo({
      url: '../resume/campus_experience/campus_experience?type=' + e.currentTarget.dataset.text + '&action=add',
    })
  },
  /**
   * 跳转校园经历修改页面
   */
  updateCampusExperience: function(e){
    wx.navigateTo({
      url: '../resume/campus_experience/campus_experience?action=update&id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.text,
    })
  },
  /**
   * 跳转项目经验添加页面
   */
  openProjectExperience: function(e){
    wx.navigateTo({
      url: '../resume/project_experience/project_experience?type=' + e.currentTarget.dataset.text + '&action=add',
    })
  },
  /**
   * 跳转项目经历修改页面
   */
  updateProjectExperience: function (e) {
    wx.navigateTo({
      url: '../resume/project_experience/project_experience?action=update&id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.text,
    })
  },
  /**
   * 跳转技能掌握添加页面
   */
  openSkill: function (e) {
    wx.navigateTo({
      url: '../resume/skill/skill?type=' + e.currentTarget.dataset.text + '&action=add',
    })
  },
  /**
  * 跳转技能掌握修改页面
  */
  updateSkill: function (e) {
    wx.navigateTo({
      url: '../resume/skill/skill?action=update&id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.text,
    })
  },
  /**
   * 跳转个人奖项添加页面
   */
  openPrize: function (e) {
    wx.navigateTo({
      url: '../resume/prize/prize?type=' + e.currentTarget.dataset.text + '&action=add',
    })
  },
  /**
  * 跳转个人奖项修改页面
  */
  updatePrize: function (e) {
    wx.navigateTo({
      url: '../resume/prize/prize?action=update&id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.text,
    })
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
    console.log(app.globalData.userId)
    var that = this;
    var resume = that.data.universityClass;
    //从数据库获取简历信息
    //获取jobhistory
    for (let i = 0; i < 4; i++) {
      var type = that.data.universityClass[i].name;
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/jobhistories',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          console.log(data.data.jobhistory)
          if (data.data.statuscode == '200') {
            resume[i].job_history = data.data.jobhistory;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/campusexperiences',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].campus_experience = data.data.campusexperience;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/projectexperiences',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].project_experience = data.data.projectexperience;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/skills',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].skill = data.data.skill;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/prizes',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].prize = data.data.prize;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
    }
    console.log(resume)
    that.setData({
      universityClass: resume
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
    var resume = that.data.universityClass;
    //从数据库获取简历信息
    //获取jobhistory
    for (let i = 0; i < 4; i++) {
      var type = that.data.universityClass[i].name;
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/jobhistories',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].job_history = data.data.jobhistory;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/campusexperiences',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].campus_experience = data.data.campusexperience;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/projectexperiences',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].project_experience = data.data.projectexperience;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/skills',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].skill = data.data.skill;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/prizes',
        method: 'GET',
        data: {
          userId: app.globalData.userId,
          type: type
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if (data.data.statuscode == '200') {
            resume[i].prize = data.data.prize;
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
    }
    console.log(resume)
    that.setData({
      universityClass: resume
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