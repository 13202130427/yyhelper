const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,
    editalert:false,
    step:0,
    phone:'',
    code:'',
    codeshow:'获取验证码',
    codestatus:0,
    sendColor: '#363636',
    snsMsgWait: 60,
    smsFlag:false,
    mobile:'',
    error:''
  },
  openphoneupdate:function(){
    this.setData({
      editalert:true
    })
  },
  savephone:function(e){
    var that = this;
    that.setData({
      phone: e.detail.value,
    })
  },
  savecode: function (e) {
    var that = this;
    that.setData({
      code: e.detail.value,
    })
  },
  sendcode:function(){
    var that = this;
    if(that.data.phone.length == 11){
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/sms/' + app.globalData.userId +'/'+that.data.phone,
        method:'PUT',
        data:{
          type:'bind'
        },
        success:function(res){
          if(res.data.statuscode == 200){
            that.setData({
              step: 2,
              error: ''
            })
            return true
          }
          if (res.data.statuscode == 52103){
            that.setData({
              error: '当前手机号已绑定'
            })
          }else{
            if (res.data.statuscode == 52104){
              that.setData({
                error: '请勿绑定相同手机号'
              })
            }else{
              that.setData({
                error: '未知错误'
              })
            }
          }
        }
      })
      
    }else{
      that.setData({
        error:'手机号码格式错误'
      })
    }
  },
  testcode:function(){
    var that = this;
    //验证验证码是否正确
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/sms/' + app.globalData.userId + '/' + that.data.code,
      method:'GET',
      success:function(res){
        if(res.data.statuscode == 200){
          //验证码正确
          //修改手机号
          wx.request({
            url: 'https://www.api.yyhelper.icu/1.0/users/phone/' + app.globalData.userId,
            method:'PUT',
            data:{
              phone:that.data.phone
            },
            success:function(res){
              if(res.data.statuscode == 202){
                //修改成功
                //修改userinfo
                var Userinfo = app.globalData.userInfo;
                Userinfo.phone = that.data.phone;
                app.globalData.userinfo = Userinfo;
                let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                let prevPage = pages[pages.length - 2];
                //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                prevPage.setData({
                  userInfo: Userinfo,
                })
                that.setData({
                  editalert: false,
                  mobile:that.data.phone,
                  status:1,
                  step: 0,
                  phone:'',
                  error:''
                })
                
              }
            }
          })
        }
        if(res.data.statuscode == 400){
          //验证码错误
          that.setData({
            error: '验证码错误'
          })
        }
      }
    })
  },
  getcode:function(){
    var that = this;
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/sms/' + app.globalData.userId + '/' + that.data.mobile,
        method: 'PUT',
        success: function (res) {
          if (res.data.statuscode == 200) {
            var inter = setInterval(function () {
              that.setData({
                smsFlag: true,
                sendColor: '#cccccc',
                codeshow: that.data.snsMsgWait + 's后重发',
                snsMsgWait: that.data.snsMsgWait - 1
              });
              if (that.data.snsMsgWait < 0) {
                clearInterval(inter)
                this.setData({
                  sendColor: '#363636',
                  codeshow: '获取验证码',
                  snsMsgWait: 60,
                  error: '',
                  smsFlag: false
                });
              }
            }.bind(that), 1000);
            return true
          }else{
            that.setData({
              error: '未知错误'
            })
          }
        }
      })
  },
  testbindcode:function(){
    var that = this;
    if(that.data.code == ''){
      that.setData({
        error: '请填写验证码'
      })
      return false
    }
    if (that.data.code.length != 4) {
      that.setData({
        error: '请填写正确的格式'
      })
      return false
    }
    //验证验证码是否正确
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/sms/' + app.globalData.userId + '/' + that.data.code,
      method: 'GET',
      success: function (res) {
        if (res.data.statuscode == 200) {
          //验证码正确
          that.setData({
            step: 1,
            code:'',
            error: ''
          })
        }
        if (res.data.statuscode == 400) {
          //验证码错误
          that.setData({
            error: '验证码错误'
          })
        }
      }
    })
  },
  backstep:function(){
    var that = this;
    that.setData({
      step: 1,
      error:''
    })
  },
  closestep:function(){
    var that = this;
    if(that.data.status == 0){
      that.setData({
        editalert: false,
        step: 1,
        phone: '',
        error: ''
      })
    }
    if (that.data.status == 0) {
      that.setData({
        editalert: false,
        step: 0,
        phone: '',
        error: ''
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.status == 0){
      that.setData({
        status: 0,
        step:1
      })
    }else{
      that.setData({
        status: 1,
        mobile: options.mobile,
        step: 0
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