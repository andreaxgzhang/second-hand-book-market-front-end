// pages/browse/browse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: "scaleToFill",
    arr: ["https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e598fb9aae16b97aa5459be719c0f945&auto=format&fit=crop&w=1650&q=80", "https://images.unsplash.com/photo-1484554918040-b5453ec67ccc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3275106e7ca706619d17629d4825f073&auto=format&fit=crop&w=1650&q=80",
      "https://images.unsplash.com/photo-1525720171842-a4992f22f70d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=341e6e623106ecfbacabc65ae4bc9b67&auto=format&fit=crop&w=1650&q=80"],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let page = this;
    // Get api data
    wx.request({
      url: `https://second-hand-textbook.herokuapp.com/api/v1/posts?query=${options.value}`,
      method: 'get',
      success: function (res) {
        console.log(res)
        const posts = res.data;
        page.setData(posts)
        console.log(posts)
        // wx.redirectTo({
        //   url: `../browse/browse?value=${e.detail.value.course}`
        // });
      }
    })

  },
  onClick: function (e) {
    console.log(e)
    const id = e.currentTarget.dataset.post.id
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
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
  
  },
})