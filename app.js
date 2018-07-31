//app.jsconst app = getApp()
const app = getApp()


App({
  onLaunch: function () {
    const host = 'http://localhost:3000/'
    console.log('processing to login')
    wx.login({
      success: (res) => {
        console.log(res)
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
                console.log(60, res1.data.userId)

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

