const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddena:true,
    status:true,
    alertstatus:false,
    newslist:{},
    searchlist:[
      {
        name:'分类',
        key:0,
        type:[
          {
            name: '不限'
          },
          {
            name: '社团'
          },
          {
            name: '校方'
          },
          {
            name: '企业'
          }
        ]
      },
      {
        name:'发布时间',
        key: 0,
        type: [
          {
            name: '不限'
          },
          {
            name: '2020'
          },
          {
            name: '2019'
          },
          {
            name: '2018'
          },
          {
            name: '2017'
          },
          {
            name: '2016'
          }
        ]
      },
      {
        name: '院系',
        key: 0,
        id:'',
        type: []
      }
    ]
  },
  /**
   * 关闭友情提示弹窗
   */
  closeAlertBtn: function () {
    this.setData({
      alertstatus: false
    })
  },
  /**
   * 改变颜色
   */
  changColor: function (e) {
    var searchList = this.data.searchlist;
    var newsList = this.data.newslist;
    searchList[e.target.dataset.index].key = e.target.dataset.index1;
    if (e.target.dataset.index == 2){
      searchList[2].id = searchList[2].type[e.target.dataset.index1].id;
    }
    this.setData({
      searchlist: searchList
    })
    //隐藏不需要的新闻
    for (let i = 0; i < newsList.length; i++) {
      //先将全部设置为true
      newsList[i].hiddena = true;
      switch(searchList[0].key){
        case 0: 
          switch (searchList[1].key) {
            case 0: newsList[i].hiddena = false; break;
            case 1: if (newsList[i].time.substring(0, 4) == '2020') newsList[i].hiddena = false; break;
            case 2: if (newsList[i].time.substring(0, 4) == '2019') newsList[i].hiddena = false; break;
            case 3: if (newsList[i].time.substring(0, 4) == '2018') newsList[i].hiddena = false; break;
            case 4: if (newsList[i].time.substring(0, 4) == '2017') newsList[i].hiddena = false; break;
            case 5: if (newsList[i].time.substring(0, 4) == '2016') newsList[i].hiddena = false; break;
          }break;
        case 1: 
          if (newsList[i].type == '社团'){
            switch (searchList[1].key) {
              case 0: newsList[i].hiddena = false; console.log('1'); break;
              case 1: if (newsList[i].time.substring(0, 4) == '2020') newsList[i].hiddena = false; break;
              case 2: if (newsList[i].time.substring(0, 4) == '2019') newsList[i].hiddena = false; break;
              case 3: if (newsList[i].time.substring(0, 4) == '2018') newsList[i].hiddena = false; break;
              case 4: if (newsList[i].time.substring(0, 4) == '2017') newsList[i].hiddena = false; break;
              case 5: if (newsList[i].time.substring(0, 4) == '2016') newsList[i].hiddena = false; break;
            }
          } break;
          
        case 2:
          if (newsList[i].type == '校方') {
            switch (searchList[1].key) {
              case 0: newsList[i].hiddena = false; break;
              case 1: if (newsList[i].time.substring(0, 4) == '2020') newsList[i].hiddena = false; break;
              case 2: if (newsList[i].time.substring(0, 4) == '2019') newsList[i].hiddena = false; break;
              case 3: if (newsList[i].time.substring(0, 4) == '2018') newsList[i].hiddena = false; break;
              case 4: if (newsList[i].time.substring(0, 4) == '2017') newsList[i].hiddena = false; break;
              case 5: if (newsList[i].time.substring(0, 4) == '2016') newsList[i].hiddena = false; break;
            }
          } break;

        case 3:
          if (newsList[i].type == '企业') {
            switch (searchList[1].key) {
              case 0: newsList[i].hiddena = false; break;
              case 1: if (newsList[i].time.substring(0, 4) == '2020') newsList[i].hiddena = false; break;
              case 2: if (newsList[i].time.substring(0, 4) == '2019') newsList[i].hiddena = false; break;
              case 3: if (newsList[i].time.substring(0, 4) == '2018') newsList[i].hiddena = false; break;
              case 4: if (newsList[i].time.substring(0, 4) == '2017') newsList[i].hiddena = false; break;
              case 5: if (newsList[i].time.substring(0, 4) == '2016') newsList[i].hiddena = false; break;
            }
          } break;
      }
      //为false筛选下来的数据，判断院系ID是否一致,不一致就改true
      if(searchList[2].id != newsList[i].colleges_id){
        newsList[i].hiddena = true;
      }
      
    }
    this.setData({
      newslist:newsList
    })
  },
  /**
   * 改变下拉框状态
   */
  changeSearch: function(){
    var that = this;
    that.setData({
      hiddena:!that.data.hiddena
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if (app.globalData.dataStatus == false){
      //不提供服务
      console.log('不提供')
      that.setData({
        status: app.globalData.dataStatus,
        alertstatus:true
      })
    }else{
      console.log('提供')
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/news',
        method: 'GET',
        data: {
          desc:true,
          universityId: app.globalData.universityId
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (res) {
          if(res.data.statuscode == 200){
            var newslist = res.data.newslist;
            for (let i = 0; i < newslist.length; i++) {
              newslist[i]['hiddena'] = false
            }
            that.setData({
              newslist: newslist,
              status: app.globalData.dataStatus,
              alertstatus: false
            })
          }
        },
        fail: function () {
          console.log("请求数据失败");
        }
      })
      //改变院系数据
      wx.request({
        url: 'https://www.api.yyhelper.icu/1.0/colleges',
        method: 'GET',
        data: {
          universityId: app.globalData.universityId
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: function (res) {
          if(res.data.statuscode == 200){
            var colleges = res.data.colleges;
            var searchlist = that.data.searchlist;
            searchlist[2].type[0] = { id: 0, name: '不限' };
            for (let i = 1; i <= colleges.length; i++) {
              searchlist[2].type[i] = colleges[i];
            }

            that.setData({
              searchlist: searchlist
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
    console.log('在下拉')
    var that = this;
    that.setData({
      hiddena:false
    })
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