// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  modalcnt: function (e) {
    let page = this

    wx.showModal({
      title: 'Confirmation',
      content: 'Are you sure you want to proceed?',
      success: function (res) {
        if (res.confirm) {
          const data = getApp().globalData
          if (data.email === null || data.wechat_id === null || data.school === null) {
            console.log('aaa')
            wx.reLaunch({
              url: `/pages/userinfo/userinfo?redirect=${true}`,
            })
          }
          console.log(1111, page.data)
          wx.request({
            url: `https://second-hand-textbook.herokuapp.com/api/v1/posts/${page.data.postId}`,
            method: 'put',
            data: {
              confirmed: true
            },
            success: function () {
            }
          })
          wx.request({
            url: `https://second-hand-textbook.herokuapp.com/api/v1/posts/${page.data.postId}/transactions`,
            method: 'post',
            data: {
              // title: page.data.title,
              // photo: page.data.photo,
              // description: page.data.description,
              user_id: getApp().globalData.userId,
              post_id: page.data.postId
            },
            success: function () {
            }
          })
          wx.navigateTo({

            url: '/pages/confirm/confirm',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  editRestaurant: function (e) {
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log(1234, options);
    this.setData({postId: options.id})
    let that = this;
    // Get api data
    wx.request({
      url: `https://second-hand-textbook.herokuapp.com/api/v1/posts/${options.id}`,
      method: 'GET',
      success(pos) {
        const post = pos.data.posts;
        const user = post.user
        // Update local data
        that.setData(
          post
        );
        that.setData(
          user
        );
        wx.hideToast();
      }
    });


  },

  // onClick: function (e) {
  //   const id = e.target.dataset.id;
  //   let page = this
  //   console.log(1111,this.data)
  //   wx.request({
  //     url: `http://localhost:3000/api/v1/posts/${this.data.postId}`,
  //     method: 'put',
  //     data: {
  //       confirmed: true
  //     },
  //     success: function () {
  //     }
  //   })
  //   wx.request({
  //     url: `http://localhost:3000/api/v1/transactions`,
  //     method: 'post',
  //     data: {
  //       title:  this.data.title,
  //       photo: this.data.photo,
  //       description: this.data.description,
  //       user_id: this.data.user_id,
  //       post_id: this.data.postId
  //     },
  //     success: function () {
  //       wx.navigateTo({
  //         url: `/pages/confirm/confirm?id=${id}`
  //       })
  //     }
  //   })

  // },

  // deleteRestaurant: function (e) {
  //   let page = this
  //   const id = e.currentTarget.dataset.id
  //   console.log(id)
  //   wx.request({
  //     url: `http://localhost:3000/api/v1/posts/${id}`,
  //     method: 'DELETE',
  //   })
  // },



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