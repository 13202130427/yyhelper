//app.js
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key
var USER_ID = ''//储存获取到的userId
const app = getApp()
App({
  onLaunch: function (options) {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            url: 'https://www.api.yyhelper.icu/1.0/weixin/getopenid',
            method:'GET',
            data:{
              code: res.code,
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              var Res = JSON.parse(res.data);
              OPEN_ID = Res.openid;//获取到的openid  
              SESSION_KEY = Res.session_key;//获取到session_key
              that.globalData.openId = OPEN_ID;
              wx.request({
                url: "https://www.api.yyhelper.icu/1.0/users",
                method: 'POST',
                data: {
                  open_id: OPEN_ID,
                  session_key: SESSION_KEY
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function (data) {
                  console.log(data.data)
                  USER_ID = data.data['userId'];
                  that.globalData.userId = USER_ID;
                  that.globalData.rdSession = data.data['3rd_session'];
                  if (data.data['user_status'] == '1') {
                    that.globalData.status = false;
                  }
                  if (data.data['status'] == '1') {
                    //已注册 从数据库取出userinfo
                    wx.request({
                      url: 'https://www.api.yyhelper.icu/1.0/users/' + USER_ID,
                      method: 'GET',
                      header: {
                        'Content-Type': 'application/json',
                      },
                      success: function (userinfo) {
                        that.globalData.userInfo = userinfo.data.userInfo;
                        that.globalData.hasUserInfo = true;
                      },
                      fail: function () {
                        console.log("请求数据失败");
                      }
                    })
                    
                  } else {
                    that.globalData.hasUserInfo = false;
                  }
                },
                fail: function () {
                  console.log("请求数据失败");
                }
              });
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo;
          //     this.globalData.hasUserInfo = true;
          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: {},
    hasUserInfo:false,
    status:true,
    openId:null,
    userId:null,
    rdSession:null,
    universityId:1,
    dataStatus:true
  }
})