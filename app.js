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
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userinfo']) {
          wx.authorize({
            scope: 'scope.userinfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })

    const host = 'https://second-hand-textbook.herokuapp.com/'
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
            wx.getUserInfo({
              
              success: function (res2) {

                page.globalData.userInfo = res2.userInfo
                wx.request({
                  url: `https://second-hand-textbook.herokuapp.com/api/v1/users/${res1.data.userId}`,
                  method: 'put',
                  data: {
                    name: res2.userInfo.nickName,
                    gender: res2.userInfo.gender,
                    avatarUrl: res2.userInfo.avatarUrl
                  },
                  success: function (res) {
                    // set data on index page and show
                    // wx.redirectTo({
                    //   url: '/pages/main/main'
                    // });
                  }
                  // insert next code here
                })
              },
            }),
              console.log(page)
            wx.request({
              url: `https://second-hand-textbook.herokuapp.com/api/v1/users/${res1.data.userId}`,
              metohd: 'get',
              success: function (res) {
                console.log(res)
                page.globalData.email = res.data.users.email;
                page.globalData.wechat_id = res.data.users.wechat_id;
                page.globalData.school = res.data.users.school
              }
            })

          }
        })


      }
    })
  },
  globalData: {}

})

