const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
Page({
  data: {
    items: []
  },
  onLoad: function () {
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
          let url = `/pages/show/show?leanCloudImage=${res}`
          wx.navigateTo({ url })
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
  }
})