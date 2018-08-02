var tabs = [

  {
    name: "Purchased"
  },
  {
    name: "Books Sold"
  },
  {
    name: "Userinfo"
  }

];

// pages/userhistory/userhistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    arr: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWDo9X3sHhw_G5JIbx7CIV3WCOG8hR_K8-SB7PXixf7GJ5v7dfHQ", "https://img-aws.ehowcdn.com/340x221p/photos.demandstudios.com/getty/article/171/62/87733314.jpg"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68
        });
      }
    });
    
  },
  homeTap: function () {
    wx.reLaunch({
      url: '../../pages/main/main'
    })
    // wx.navigateTo({
    //   url: `/pages/main/main`
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindChange: function (e) {
    let page = this
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    console.log("bindChange:" + current);
    console.log(getApp().globalData.userId)
    if(current == 1){
      wx.request({
        url: `https://second-hand-textbook.herokuapp.com/api/v1/sold?userId=${getApp().globalData.userId}`,
        method: 'get',
        success: function (res) {
          console.log(11, res.data.transactions)

          page.setData ({
            history: res.data.transactions
          }),
            console.log(1, page.data.history)
        }
      })
    }
    else{
      wx.request({
        url: `https://second-hand-textbook.herokuapp.com/api/v1/purchased?userId=${getApp().globalData.userId}`,
        method: 'get',
        success: function (res) {
          console.log(11, res)
        }
      })
    }

  },

  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
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