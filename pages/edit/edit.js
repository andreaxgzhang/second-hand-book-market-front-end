// pages/edit/edit.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
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
    let page = this;

    wx.showToast({
      title: 'Loading...',
      icon: 'loading',
      duration: 1500
    });


    // Get post data from server (to show in form)
    wx.request({
      url: `https://second-hand-textbook.herokuapp.com/api/v1/posts/${options.id}`,
      method: 'GET',
      success(pos) {
        var post = pos.data;

        // Update local data
        page.setData(
          post
        );

        wx.hideToast();
      }
    });
  },
  takePhoto: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0];
        that.uploadPromise(tempFilePath).then(res => {
          console.log('You can execute anything here')
          return res
        }).then(res => {
          console.log('Or .. execute more')
          return res
        }).then(res => {
          console.log(res)
          that.setData({ photo: res })


        })
      }
    });
  },
  uploadPromise: function (tempFilePath) {
    return new Promise((resolve, reject) => {
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save()
        .then(file => resolve(file.url()))
        .catch(e => reject(e));
    })
  },
  bindSubmit: function (e) {

    //...
    console.log(e)
    let title = e.detail.value.title;
    let description = e.detail.value.description;
    let professor = e.detail.value.professor;
    let course_number = e.detail.value.course_number;
    let id = this.data.posts.id;
    let photo = e.detail.value.photo

    let post = {
      title: title,
      description: description,
      professor: professor,
      course_number: course_number
    }
    let form_post = e.detail.value

    // Update api data
    wx.request({
      url: `https://second-hand-textbook.herokuapp.com/api/v1/posts/${id}`,
      method: 'PUT',
      data: { post: form_post },
      success: function (pos) {
        // set data on index page and show
        wx.reLaunch({
          url: '/pages/userinfo/userinfo',
        })
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