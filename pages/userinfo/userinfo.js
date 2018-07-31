// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  bindSubmit: function (e) {
    const that = this;
    // console.log(e)
    let wechatId, email, note;
    // that.setData({
    //   wechatId: e.detail.value.wechatId,
    //   email: e.detail.value.email,
    //   note: e.detail.value.note
    // })
    wx.request({
      url: `http://localhost:3000/api/v1/users/${getApp().globalData.userId}`,
      method: 'put',
      data: {
        wechat_id: e.detail.value.wechatId,
        email: e.detail.value.email,
        // note: e.detail.value.note
      },
      success: function () {
      }
    })

    
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