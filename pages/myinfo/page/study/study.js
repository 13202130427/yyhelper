const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:1,
    homeurl:'/icons/imageadd.png',
    videourl:'/icons/video.png',
    homeurlstatus:false,
    name:'',
    uploadTask:'',
    videoname:[],
    video_id:'',
    videostatus: [],
    choosevideo:[],
    videopath:[],
    choosevideonum:0,
    hiddenError: true,
    saveError: '',
  },
  choosephoto:function(){
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop('album');//从相册中选择
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop('camera');//手机拍照
          }
        }
      }
    })
  },
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res)
        that.setData({
          homeurl: res.tempFilePaths[0],
          homeurlstatus:true
        })
      }
    })
  },
  changestep:function(){
    var that = this;
    if (!that.data.homeurlstatus){
      //console.log('没有上传封面')
      that.setData({
        hiddenError: false,
        saveError:'没有上传封面'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: true,
          saveError:''
        })
      }, 1000)
      return false
    }
    if (that.data.name.length == 0){
      //console.log('没有填写视频名称')
      that.setData({
        hiddenError: false,
        saveError: '没有填写视频名称'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: true,
          saveError: ''
        })
      }, 1000)
      return false
    }
    wx.uploadFile({
      url: 'https://www.api.yyhelper.icu/1.0/videos',
      name: 'image',
      filePath: that.data.homeurl,
      formData: {
        'name': that.data.name,
        'step': '1',
        'userId': app.globalData.userId
      },
      success(res) {
        console.log(res.data)
        //json字符串 需用JSON.parse 转
        var Res = JSON.parse(res.data)
        console.log(Res)
        if(Res.statuscode == 0){
          that.setData({
            step: 2,
            video_id: Res.video_id,
            homeurl:'/icons/imageadd.png'
          })
        }
      },
      fail:function(){
        console.log('调用接口失败')
      }

    })
    
  },
  savename:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  savepartname:function(e){
    var videoname = this.data.videoname;
    videoname[e.currentTarget.dataset.idx] = e.detail.value
  },
  uploadvideo:function(e){
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'video',
      success(res) {
        console.log(res.tempFiles)
        var videostatus = that.data.videostatus;
        var mode = ['0']
        var choosevideo = that.data.choosevideo.concat(res.tempFiles) 
        console.log(choosevideo)
        that.setData({
          choosevideo: choosevideo,
          choosevideonum: that.data.choosevideonum + 2-1,
          videostatus: videostatus.concat(mode)
        })
        //判断当前第一任务是否完成
        console.log('判断上传')
        var videostatus = that.data.videostatus;
        var choosevideo = that.data.choosevideo;
        for (let i = 0; i < that.data.choosevideonum; i++) {
          if (videostatus[i] == 0) {
            //还没开始
            console.log('开始执行')
            videostatus[i] = "1"
            that.setData({
              videostatus: videostatus
            })
            that.uploadvideogetpath(choosevideo[i].path,that.data.video_id,i)
            return true
          }
          if (videostatus[i] == 1) {
            //正在上传 不操作
            console.log('正在上传')
            return true
          }
          if (videostatus[i] == 2) {
            //上传完成 不操作
            console.log('上传成功')
          }
        }
      },
      fail(res) {
        console.log('错误')
      }
    })
  },
  uploadvideogetpath: function (path, video_id,index){
    var that = this;
    var videopath = that.data.videopath
    var choosevideo = that.data.choosevideo
    const uploadTask = wx.uploadFile({
      url: 'https://www.api.yyhelper.icu/1.0/videos',
      filePath: path,
      name: 'video',
      formData: {
        'step': '2',
        'video_id': video_id
      },
      success(res) {
        console.log(res)
        var Res = JSON.parse(res.data)
        console.log(Res)
        if(Res.statuscode == 0){
          //储存上传成功获取的path
          videopath[index] = Res.path
          //修改videostatus 为2
          var videostatus = that.data.videostatus
          console.log(videostatus)
          console.log(videostatus[index])
          videostatus[index] = "2"
          that.setData({
            videostatus: videostatus,
            videopath: videopath
          })
          for (let i = index; i < that.data.choosevideonum; i++) {
            console.log(index)
            console.log(i)
            console.log(that.data.choosevideonum)
            var videostatus = that.data.videostatus
            var choosevideo = that.data.choosevideo
            if (videostatus[i] == 0) {
              //还没开始
              console.log('开始执行')
              that.uploadvideogetpath(choosevideo[i].path, that.data.video_id, i)
              videostatus[i] = 1
              that.setData({
                videostatus: videostatus
              })
              return true
            }
            if (videostatus[i] == 1) {
              //正在上传 不操作
              console.log('正在上传')
              return true
            }
            if (videostatus[i] == 2) {
              //上传完成 不操作
              console.log('上传成功')
            }
          }
        }
      },
      fail: function () {
        console.log('调用失败')
      }
    })
    that.setData({
      uploadTask: uploadTask
    })
    uploadTask.onProgressUpdate((res1) => {
      //修改上传进度
      var choosevideo = that.data.choosevideo
      choosevideo[index]['progress'] = res1.progress
      that.setData({
        choosevideo: choosevideo
      })
      // console.log('上传进度', res.progress)
      //  console.log('已经上传的数据长度', res.totalBytesSent)
      //  console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
  },
  uploadvideolist:function(){
    var that = this;
    var videoname = that.data.videoname;
    var videopath = that.data.videopath;
    var videostatus = that.data.videostatus
    if (that.data.choosevideonum ==0) {
      //console.log('没有上传视频')
      that.setData({
        hiddenError: false,
        saveError: '没有上传视频'
      })
      setTimeout(function () {
        that.setData({
          hiddenError: true,
          saveError: ''
        })
      }, 1000)
      return false
    }
    for (let i = 0; i < that.data.choosevideonum;i++){
      if (videoname[i] == '') {
        //console.log('没有填写视频名称')
        that.setData({
          hiddenError: false,
          saveError: '没有填写视频名称'
        })
        setTimeout(function () {
          that.setData({
            hiddenError: true,
            saveError: ''
          })
        }, 1000)
        return false
      }
    }
    for (let i = 0; i < that.data.choosevideonum; i++){
      if (videostatus[i] == 2){
        //上传成功
      }else{
        //console.log('第'+i+'个视频还没上传完成')
        that.setData({
          hiddenError: false,
          saveError: '第' + i+2-1 + '个视频还没上传完成'
        })
        setTimeout(function () {
          that.setData({
            hiddenError: true,
            saveError: ''
          })
        }, 1000)
        return false
      }
    }
    var Data = JSON.stringify({
      video_id: that.data.video_id,
      name: videoname,
      path: videopath
    })
    console.log(Data)
    wx.request({
      url: 'https://www.api.yyhelper.icu/1.0/videos/videoinfo',
      method:'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        data: Data
      },
      success:function(res){
        if(res.data.statuscode == 201){
          wx.redirectTo({
            url: '/pages/myinfo/page/studylist/studylist',
          })
        }
      }
    })
   
  },
  deletevideo:function(e){
    var choosevideo = this.data.choosevideo
    var videostatus = this.data.videostatus
    var videoname = this.data.videoname
    var videopath = this.data.videopath
    var choosevideonum = this.data.choosevideonum
    for (let i = 0; i < choosevideonum;i++){
      if (i == e.currentTarget.dataset.idx){
        if (videostatus[i] == 0){
          //还没有上传
          choosevideonum = choosevideonum-1
          videoname.splice(e.currentTarget.dataset.idx, 1)
          videostatus.splice(e.currentTarget.dataset.idx, 1)
          choosevideo.splice(e.currentTarget.dataset.idx, 1)
          this.setData({
            choosevideonum: choosevideonum,
            videoname: videoname,
            videostatus: videostatus,
            choosevideo: choosevideo
          })
          return true
        }
        if (videostatus[i] == 1){
          //正在上传
          this.data.uploadTask.abort()
          choosevideonum = choosevideonum - 1
          videoname.splice(e.currentTarget.dataset.idx, 1)
          videostatus.splice(e.currentTarget.dataset.idx, 1)
          choosevideo.splice(e.currentTarget.dataset.idx, 1)
          this.setData({
            choosevideonum: choosevideonum,
            videoname: videoname,
            videostatus: videostatus,
            choosevideo: choosevideo
          })
          return true
        }
        if(videostatus[i] == 2){
          //上传完成
          choosevideonum = choosevideonum - 1
          videoname.splice(e.currentTarget.dataset.idx, 1)
          videopath.splice(e.currentTarget.dataset.idx, 1)
          videostatus.splice(e.currentTarget.dataset.idx, 1)
          choosevideo.splice(e.currentTarget.dataset.idx, 1)
          this.setData({
            choosevideonum: choosevideonum,
            videoname: videoname,
            videopath: videopath,
            videostatus: videostatus,
            choosevideo: choosevideo
          })
          return true
        }
      }
    }
  },
  listtop:function(e){
    var choosevideo = this.data.choosevideo
    var videostatus = this.data.videostatus
    var videopath = this.data.videopath
    //判断当前是否还有上传任务
    for(let i =0; i<this.data.choosevideonum;i++){
      if (videostatus[i] != 2){
        this.setData({
          hiddenError: false,
          saveError: '还有上传任务未完成'
        })
        setTimeout(function () {
          this.setData({
            hiddenError: true,
            saveError: ''
          })
        }, 1000)
        return false
      }
    }
    //移动位置
    if (e.currentTarget.dataset.idx-1 < 0){
      this.setData({
        hiddenError: false,
        saveError: '该视频已在最前列'
      })
      setTimeout(function () {
        this.setData({
          hiddenError: true,
          saveError: ''
        })
      }, 1000)
      return false
    }
    var a = videopath[e.currentTarget.dataset.idx - 1];
    var b = choosevideo[e.currentTarget.dataset.idx - 1];
    videopath[e.currentTarget.dataset.idx - 1] = videopath[e.currentTarget.dataset.idx];
    choosevideo[e.currentTarget.dataset.idx - 1] = choosevideo[e.currentTarget.dataset.idx];
    videopath[e.currentTarget.dataset.idx] = a;
    choosevideo[e.currentTarget.dataset.idx] = b;
    this.setData({
      videopath: videopath,
      choosevideo: choosevideo
    })
  },
  listdown: function (e) {
    var choosevideo = this.data.choosevideo
    var videostatus = this.data.videostatus
    var videopath = this.data.videopath
    //判断当前是否还有上传任务
    for (let i = 0; i < this.data.choosevideonum; i++) {
      if (videostatus[i] != 2) {
        this.setData({
          hiddenError: false,
          saveError: '还有上传任务未完成'
        })
        setTimeout(function () {
          this.setData({
            hiddenError: true,
            saveError: ''
          })
        }, 1000)
        return false
      }
    }
    //移动位置
    if (e.currentTarget.dataset.idx + 1 >= this.data.choosevideonum) {
      this.setData({
        hiddenError: false,
        saveError: '该视频已在最尾列'
      })
      setTimeout(function () {
        this.setData({
          hiddenError: true,
          saveError: ''
        })
      }, 1000)
      return false
    }
    var a = videopath[e.currentTarget.dataset.idx + 2-1];
    var b = choosevideo[e.currentTarget.dataset.idx + 2-1];
    videopath[e.currentTarget.dataset.idx + 2 - 1] = videopath[e.currentTarget.dataset.idx];
    choosevideo[e.currentTarget.dataset.idx + 2 - 1] = choosevideo[e.currentTarget.dataset.idx];
    videopath[e.currentTarget.dataset.idx] = a;
    choosevideo[e.currentTarget.dataset.idx] = b;
    this.setData({
      videopath: videopath,
      choosevideo: choosevideo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id != undefined){
      this.setData({
        video_id: options.id,
        step: 2
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