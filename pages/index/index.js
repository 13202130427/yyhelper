const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '梅州市', '梅江区'],
    index: 0,
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
    cardCur: 0,
    swiperList:[
    ],
    status:false
  },
  /**0
   * 省市区
   */
  bindRegionChange: function (e) {
    var that = this;
    wx.request({
      url: "https://www.api.yyhelper.icu/1.0/universities",
      method: 'GET',
      data: {
        region: e.detail.value[2],
        city: e.detail.value[1]
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function (data) {
        console.log(data.data.university);
        that.setData({
          region: e.detail.value,
          university: data.data.university,
        })
      },
      fail: function () {
        console.log("请求数据失败");
      }
    });
  },
  /**
   * 选择学校
   */
  bindUniversityChange: function (e) {
    console.log(e.detail.value)
    if (this.data.university[e.detail.value].status == 0) {
      console.log('当前学校暂时不提供服务');
      app.globalData.dataStatus = false;
    }else{
      console.log('当前学校提供服务');
      app.globalData.dataStatus = true;
    }
    this.setData({
      index: e.detail.value,
    })
    app.globalData.universityId = this.data.university[e.detail.value].id;
    this.onShow();
    console.log(app.globalData.universityId)
  },
  /**
   * 关闭友情提示弹窗
   */
  closeAlertBtn:function(){
    this.setData({
      status:false
    })
  },
  onLoad(options) {
    console.log(app.globalData)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (app.globalData.dataStatus == false) {
      //不提供资讯服务
      var swiperList = [
        {
          id: 0,
          title: '',
          url: '/icons/imagecache.jpg'
        },
        {
          id: 0,
          title: '',
          url: '/icons/imagecache.jpg'
        },
        {
          id: 0,
          title: '',
          url: '/icons/imagecache.jpg'
        },
        {
          id: 0,
          title: '',
          url: '/icons/imagecache.jpg'
        },
        {
          id: 0,
          title: '',
          url: '/icons/imagecache.jpg'
        },
      ]
      that.setData({
        swiperList: swiperList,
        status: true
      })
    } else {
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/news',
        method: 'GET',
        data: {
          limit: 5,
          sort: 'times',
          desc: true,
          universityId:app.globalData.universityId
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (res) {
          that.setData({
            swiperList: res.data.newslist,
            status: false
          })
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
    }
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})