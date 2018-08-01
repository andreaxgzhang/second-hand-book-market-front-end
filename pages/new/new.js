// pages/new/new.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  

  bindSubmit: function (e) {
    let page = this
    let form_textbook = e.detail.value
    console.log(page.data.photo)
    wx.request({
      url: 'http://localhost:3000/api/v1/posts',
      method: "post",
      data: { 
        title: form_textbook.title,
        description: form_textbook.description,
        course_number: form_textbook.description,
        professor: form_textbook.professor,
        price:form_textbook.price,
        photo:page.data.photo
       },
      success: function (res) {
      }
    })

    wx.reLaunch({
      url: '/pages/userhistory/userhistory',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
          that.setData({photo:res})

          
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