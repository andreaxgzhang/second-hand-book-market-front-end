
const app = getApp()

Page({
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo
  //   })
  // },

  // onLoad: function(options){
  //   const page = this
  //   wx.getUserInfo({
  //     success: function (res) {
  //       app.globalData.userInfo = res.userInfo
  //       const id = getApp().globalData.userId
  //       console.log(getApp().globalData.userId)
  //       // page.setData({
  //       //   userInfo: res.userInfo
  //       // })
  //       wx.request({
  //         url: `http://localhost:3000/api/v1/users/${id}`,
  //         method: 'put',
  //         data: {
  //           name: res.userInfo.nickName,
  //           gender: res.userInfo.gender,
  //           avatarUrl: res.userInfo.avatarUrl
  //         },
  //         success: function () {
  //           // set data on index page and show
  //           wx.redirectTo({
  //             url: '/pages/main/main'
  //           });
  //         }
  //         // insert next code here
  //       })
  //     },
  //   })
  // }
})