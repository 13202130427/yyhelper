
const app = getApp()
var INFO = {}
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    info:[
      {
        idx:0,
        value:'请输入',
        hiddena:true
      },
      {
        idx: 1,
        value: '请输入',
        hiddena: true
      },
      {
        idx: 2,
        value: '请输入',
        hiddena: true
      },
      {
        idx: 3,
        value: '请输入',
        hiddena: true
      },
      {
        idx: 4,
        value: '请输入',
        hiddena: true
      },
      {
        idx: 5,
        value: '请输入',
        hiddena: true
      },
      {
        idx: 6,
        value: '请输入',
        hiddena: true
      },
      {
        idx: 7,
        value: '请输入',
        hiddena: true
      },
      {
        idx: 8,
        value: '请输入',
        hiddena: true
      },
      {
        idx: 9,
        value: '请输入',
        hiddena: true
      },
    ],
    cacheInfo:'',
    cacheIdx:'',
    type: '',
    userId: '',
    alertStatusOk: false,
    alertStatusError: false,
    hiddenError: true,
    saveError: '',
    action: 'add',
    id: '',
  },
  /**
   * 保存掌握技能
   */
  saveSkill: function () {
    var that = this;
    console.log(that.data.userId)
    if (that.data.info[0].value == '请输入') {
      that.setData({
        hiddenError: false,
        saveError: '请输入技能掌握描述'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: !that.data.hiddena,
          saveError: ''
        })
      }, 1000)
      return false
    }
    var str = '';
    for(let i=0;i<10;i++){
      if (INFO[i].value != '请输入' && INFO[i].hiddena != true){
        //有数据的
        str = str + INFO[i].value + '</br>';
      }
    }
   str =  str.substring(0, str.lastIndexOf('</br>'));
    console.log(str)
    if (that.data.action == 'add') {
      wx.request({
        url: "https://www.api.yyhelper.icu/1.0/skills",
        method: 'POST',
        data: {
          info: str,
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
        url: "https://www.api.yyhelper.icu/1.0/skills/" + that.data.id,
        method: 'PUT',
        data: {
          info: str
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
    INFO = that.data.info;
    that.setData({
      type: options.type,
      action: options.action,
      userId: app.globalData.userId
    })
    console.log(options)
    //判断是否有id传入
    if (options.id) {
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/skills/' + options.id,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        success: function (data) {
          if(data.data.statuscode == 200){
            console.log(data)
            var IDX = '';
            //循环赋值
            for (let i = 0; i < 10; i++) {
              if (data.data.skill.info[i] != undefined) {
                //赋值
                INFO[i] = {
                  idx: i,
                  value: data.data.skill.info[i],
                  hiddena: false
                }
              } else {
                if (data.data.skill.info[i - 1] != undefined) {
                  IDX = i;
                }
                INFO[i] = {
                  idx: i,
                  value: '请输入',
                  hiddena: true
                }
              }
            }
            INFO[IDX].hiddena = false;
            that.setData({
              info: INFO,
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
    if(this.data.cacheInfo != ''){
      console.log(this.data.cacheInfo);
      INFO[this.data.cacheIdx].value = this.data.cacheInfo;
      this.setData({
        info:INFO,
        cacheIdx:'',
        cacheInfo:''
      })
    }
    //填一行新增一行
    for(let i=0;i<10;i++){
      if (INFO[i].value == "请输入"){
        if (!INFO[i].hiddena){
          break;
        }else{
          INFO[i].hiddena =false;
          this.setData({
            info:INFO
          });
          break;
        }
      }
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