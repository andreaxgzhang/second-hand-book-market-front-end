// pages/userinfo/userinfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: [
      { navimg: '/images/package-2.png', navtext: 'purchase' },
      { navimg: '/images/sold.png', navtext: 'selling' },
      { navimg: '/images/paid.png', navtext: 'transact' }
    ],
    hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    userinfo: { wechat_id: "", email: "", university: "" },
    tempData: {},
    avatarUrl: ""

  },

  getUserInfo: function(e) {
    let page = this;
    app.globalData.userInfo = e.detail.userInfo
    wx.request({
      url: `https://second-hand-textbook.herokuapp.com/api/v1/users/${app.globalData.userId}`,
      method: 'get',
      // data: {
      //   name: e.detail.userInfo.nickName,
      //   gender: e.detail.userInfo.gender,
      //   avatarUrl: e.detail.userInfo.avatarUrl
      // },
      success: function (res) {
        // set data on index page and show
        // wx.redirectTo({
        //   url: '/pages/main/main'
        // });
        page.setData({
          avatarUrl: res.data.users.avatarUrl,
          userInfo: res.data.users
        })
      }
      // insert next code here
    })
  },

  modalinput: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
    }),
      console.log(233, e)
  },

  wechatId: function (e) {
    this.setData({
      'tempData.wechat_id': e.detail.value
    })
  },
  email: function (e) {
    this.setData({
      'tempData.email': e.detail.value
    })
  },
  university: function (e) {
    console.log(e)
    this.setData({
      'tempData.university': e.detail.value
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function (e) {
    let page = this
    page.setData({
      'userinfo.wechat_id': this.data.tempData.wechat_id,
      'userinfo.email': this.data.tempData.email,
      'userinfo.university': this.data.tempData.university,
      hiddenmodalput: true
    })
    if (this.data.tempData.wechat_id != null)
      app.globalData.wechat_id = this.data.tempData.wechat_id
    if (this.data.tempData.email != null || this.data.tempData.email != "")  
      app.globalData.email = this.data.tempData.email
    if (this.data.tempData.university != null)
      app.globalData.school = this.data.tempData.university
    wx.request({
      url: `https://second-hand-textbook.herokuapp.com/api/v1/users/${getApp().globalData.userId}`,
      method: 'put',
      data: {
        wechat_id: app.globalData.wechat_id,
        email: app.globalData.email,
        school: app.globalData.school
      },
      success: function () {
        // wx.redirectTo({
        //   url: 'pages/user.userhistory',
        // })
      }
    })
  },
  linkPurchase: function () {
    wx.navigateTo({
      url: '/pages/userhistory/userhistory?index=0',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  linkSell: function () {
    wx.navigateTo({
      url: '/pages/userhistory/userhistory?index=1'
    })
  },
  linkTransact: function () {
    wx.navigateTo({
      url: '/pages/userhistory/userhistory?index=2'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    page.setData({
      'userinfo.wechat_id': app.globalData.wechat_id,
      'userinfo.email': app.globalData.email,
      'userinfo.university': app.globalData.school,
      'avatarUrl': app.globalData.userInfo.avatarUrl,
      hiddenmodalput: true
    })
    if (options.redirect === 'true'){
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    console.log(111, app.globalData)
    if (app.globalData.userinfo) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    }
    console.log(22222222, options)
    // if (options.redirect === 'true') {
    //   a()
    // }

  },

    // bindSubmit: function (e) {
    //   const that = this;
    //   let wechatId, email;
    //   wx.request({
    //     url: `https://second-hand-textbook.herokuapp.com/api/v1/users/${getApp().globalData.userId}`,
    //     method: 'put',
    //     data: {
    //       wechat_id: e.detail.value.wechatId,
    //       email: e.detail.value.email,
    //     },
    //     success: function () {
    //       wx.redirectTo({
    //         url: 'pages/userhistory.userhistory',
    //       })
    //     }
    //   })
    // },

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