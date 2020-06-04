import tool from "../../static/js/tool.js";
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    p:0,
    page:0,
    length:'',
    options:{},
    study_speed:{},
    info:{},
    hiddena: false,
    videolist:'',
    hiddenError: true,
    saveError: '请勿超前学习',
  },
  /**
   * 开始学习
   */
  startStudy:function(){
    var that = this;
    that.setData({
      hiddena:true
    })
  },
  /**
   * 改变集数
   */
  changepage:function(e){
    this.setData({
      p: e.currentTarget.id,
      page: e.currentTarget.id - 1 + 2,
    })
  },
  /**
   * 改变集数错误
   */
  changeerror:function(){
    var that = this;
    that.setData({
      hiddenError: false,
    })
    setTimeout(function () {
      that.setData({
        hiddenError: true
      })
    }, 1000)
    return false
  },
  /**
   * 进度记载
   */
  changeSpeed: tool.debounce(function (e) {
    var that = this;
    var Videolist = that.data.videolist;
    for (let i = 0; i < Videolist.length; i++) {
      if (i == that.data.p) {
        Videolist[i]['speed'] = e['0'].detail.currentTime;
      }
    }
    that.setData({
      videolist: Videolist
    })
    console.log(e['0'].detail.currentTime)
    if (that.data.page == that.data.study_speed.page && that.data.study_speed.study_id == that.data.info.study_id) {
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/studies/' + app.globalData.userId,
        method: 'PUT',
        data: {
          speed: e['0'].detail.currentTime
        },
        success: function (res) {
          if(res.data.statuscode == 202){
            console.log(res)
          }
        },
        fail: function () {
          console.log('调用接口失败')
        }
      })
    }
  }, 1000),
  endvideo: tool.debounce(function (e) {
    var that = this;
    console.log('0')
    var Videolist = that.data.videolist;
    if (that.data.page == that.data.study_speed.page && that.data.study_speed.study_id == that.data.info.study_id){
      console.log('1')
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/studies/' + app.globalData.userId,
        method: 'PUT',
        data: {
          from: 'end'
        },
        success: function (res) {
          if(res.data.statuscode == 202){
            console.log(res)
            that.onLoad(that.data.options);
          }
        },
        fail: function () {
          console.log('调用接口失败')
        }
      })
    }else{
      for (let i = 0; i < Videolist.length; i++) {
        if (i == that.data.p) {
          Videolist[i]['speed'] = 0;
        }
      }
      that.setData({
        videolist: Videolist
      })
      if (that.data.length <= that.data.page){
        //最后一个分集播放结束
      }else{
        that.setData({
          p: that.data.p +2-1,
          page: that.data.page + 2-1
        })
      }
      
    }
    if (that.data.page >= that.data.length) {
      //最后一个分集播放结束
      that.setData({
        hiddena: false
      })
      return false
    }
  }, 1000),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.id != undefined){
      console.log(options.id)
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/studies/' + app.globalData.userId,
        method: 'GET',
        data: {
          studyId: options.id
        },
        success: function (res) {
          if (res.data.statuscode == 200) {
            that.setData({
              p: 0,
              page: 1,
              options: options,
              study_speed: res.data.study_speed,
              info: res.data.info
            })
            //获取视频信息
            wx.request({
              url: 'https://www.api.yyhelper.icu/1.0/videos/' + res.data.info.video_id,
              method: 'GET',
              success: function (res) {
                console.log(res)
                var Videolist = res.data.videolist;
                for (let i = 0; i < Videolist.length; i++) {
                  Videolist[i]['speed'] = 0;
                }
                that.setData({
                  videolist: Videolist,
                  length: res.data.videolist.length
                })
              },
              fail: function () {
                console.log('调用接口失败')
              }
            })
          }
        }
      })
    }else{
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/studies/' + app.globalData.userId,
        method: 'GET',
        success: function (res) {
          if (res.data.statuscode == 200) {
            that.setData({
              p: res.data.study_speed.page - 2 + 1,
              page: res.data.study_speed.page,
              study_speed: res.data.study_speed,
              info: res.data.info
            })
            //获取视频信息
            wx.request({
              url: 'https://www.api.yyhelper.icu/1.0/videos/' + res.data.info.video_id,
              method: 'GET',
              success: function (res) {
                if(res.data.statuscode == 200){
                  console.log(res)
                  var Videolist = res.data.videolist;
                  for (let i = 0; i < Videolist.length; i++) {
                    Videolist[i]['speed'] = 0;
                  }
                  that.setData({
                    videolist: Videolist,
                    length: res.data.videolist.length
                  })
                }
              },
              fail: function () {
                console.log('调用接口失败')
              }
            })
          }
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
    var that = this;
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