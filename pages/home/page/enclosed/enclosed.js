const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:'',
    name:'',
    type:'',
    time:'',
    size:'',
    userId:'',
    resumelist:[],
    uploadfilealert:false
  },
  /**
   * 上传文件按钮点击
   */
  upLoadAction:function(e){
    var that = this;
    wx.chooseMessageFile({
      count:1,
      type:'file',
      success(res) {
        const path = res.tempFiles[0].path;
        const name = res.tempFiles[0].name;
        const type = res.tempFiles[0].type;
        const time = res.tempFiles[0].time;
        const size = res.tempFiles[0].size;
        that.setData({
          path: path,
          name: name,
          type: type,
          time: time,
          size: size,
          uploadfilealert:true,
        })
        console.log(res)
      },
      fail(res) {
        console.log('错误')
      }
    })
  },
  alertBtn:function(e){
    var that = this;
    console.log(e)
    if (e.detail.index == 0) {
      //取消
      that.setData({
        path: '',
        name: '',
        type: '',
        time: '',
        size: '',
        uploadfilealert: false
      })
    }
    if (e.detail.index == 1) {
      wx.uploadFile({
        url: 'https://www.api.yyhelper.icu/1.0/resumes', 
        filePath: that.data.path,
        formData: {
          'name': that.data.name,
          'time': that.data.time,
          'size': that.data.size,
          'userId':that.data.userId
        },
        name: 'file',
        success(res) {
          //json字符串 需用JSON.parse 转
          console.log
          that.setData({
            path: '',
            name: '',
            type: '',
            time: '',
            size: '',
            uploadfilealert: false
          })
        }
      })
    }
  },
  /* 打开文档
* @param fileUrl: 文件地址
* @param filetype: 文件类型
*/
  openDocument(fileUrl, filetype) {
    wx.downloadFile({
      url: fileUrl,
      success: res => {
        const filePath = res.tempFilePath;
        wx.openDocument({
          filePath: filePath,
          fileType: filetype,
          success: function (res) {
            // console.log("打开文档成功")
          },
          fail: function (res) {
            wx.showToast({ title: '打开文档失败', icon: 'none', duration: 2000 })
          },
        })
      },
      fail: res => {
        console.log(res);
      },
    });
  },
  /**
   * 打开简历
   */
  openResume: function(e){
    console.log(e)
    var path = e.currentTarget.dataset.path;
    var type = e.currentTarget.dataset.type;
    this.openDocument(path, type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userId: app.globalData.userId
    })
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/resumes/' + that.data.userId,
      method:'GET',
      success: function(res){
        if(res.data.statuscode == 200){
          that.setData({
            resumelist: res.data.resumelist
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
    this.onLoad()
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