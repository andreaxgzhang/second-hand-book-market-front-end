//app.jsconst app = getApp()
const app = getApp()
const AV = require('./utils/av-weapp-min.js')
const config = require('./key')
// Initialization of the app
AV.init({
  appId: config.appId,
  appKey: config.appSecret,
});

App({
  onLaunch: function () {
    const host = 'http://localhost:3000/'
    wx.login({
      success: (res) => {
        wx.request({
          url: host + 'api/v1/login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res1) => {
            this.globalData.userId = res1.data.userId
            const page = this
            console.log(11,res1)
            wx.getUserInfo({
              success: function (res2) {

                page.globalData.userInfo = res2.userInfo
                wx.request({
                  url: `http://localhost:3000/api/v1/users/${res1.data.userId}`,
                  method: 'put',
                  data: {
                    name: res2.userInfo.nickName,
                    gender: res2.userInfo.gender,
                    avatarUrl: res2.userInfo.avatarUrl
                  },
                  success: function () {
                    // set data on index page and show
                    // wx.redirectTo({
                    //   url: '/pages/main/main'
                    // });
                  }
                  // insert next code here
                })
              },
            })

          }
        })


      }
    })
  },
  globalData: {}

})

