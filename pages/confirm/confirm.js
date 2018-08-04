// pages/confirm/confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // console.log(45, options.id)

    let page = this;
    wx.request({
      url: `https://second-hand-textbook.herokuapp.com/api/v1/users/${getApp().globalData.userId}`,
      method: 'get',
      success: function (res) {
        const users = res.data;
        page.setData(users)
        console.log(users)
      }
    })
    // page.setData({users: getApp().globalData})

  },
  homeTap: function(){
    wx.reLaunch({
      url: '/pages/userinfo/userinfo',
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