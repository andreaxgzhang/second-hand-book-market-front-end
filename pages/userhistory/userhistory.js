var tabs = [

  {
    name: "Purchasing"
  },
  {
    name: "Selling"
  },
  {
    name: "Transactions"
  }

];
var app = getApp()
// pages/userhistory/userhistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transactions:[],
    nav: 0,
    hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    history: [],
    userinfo: { wechat_id: "", email: "" },
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    arr: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWDo9X3sHhw_G5JIbx7CIV3WCOG8hR_K8-SB7PXixf7GJ5v7dfHQ", "https://img-aws.ehowcdn.com/340x221p/photos.demandstudios.com/getty/article/171/62/87733314.jpg"],
    modalHidden: true
  },
  checkboxChange: function (e) {
    let page = this;
    let newtransactions = this.data.transactions.map((item) => {
      item.post.disabled = item.post.disabled || e.detail.value.indexOf(item.post.title) > -1;
      item.post.checked = item.post.disabled;
      if(item.post.checked){
        wx.request({
          url: `https://second-hand-textbook.herokuapp.com/api/v1/posts/${item.post.id}/transactions/${item.id}`,
          method: 'put',
          data: {
            completed: true
          },
          success: function () {

          }
        })
      }

      return item;
    });
    page.setData({
      transactions: newtransactions
    })

  },
  modalTap: function (e) {
    this.setData({
      modalHidden: false,
      e:e
    })
    
  },
  cancel: function () {
    this.setData({
      modalHidden: true
    });
  },

  confirm: function (e) {
    this.setData({
      modalHidden: true
    })
    this.deletePost(this.data.e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  deletePost: function (e) {
    let postId = e.currentTarget.dataset.id;
    console.log(postId);

    wx.request({
      url: `https://second-hand-textbook.herokuapp.com/api/v1/posts/${postId}`,
      method: 'DELETE',
      success: function (res) {
        wx.reLaunch({
          url: '/pages/userinfo/userinfo',
        })
      }
    })
  },

  editPost: function (e) {
    console.log(1294, e)
    let postId = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: `/pages/edit/edit?id=${postId}`,
    })
  },
  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
    let page = this
    var current = e.currentTarget.id;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    if (current === '1') {
      wx.request({
        url: `https://second-hand-textbook.herokuapp.com/api/v1/sold?userId=${getApp().globalData.userId}`,
        method: 'get',
        success: function (res) {
          page.setData({
            transactions: res.data.transactions,
            posts: res.data.posts,
            nav: current
          })
        }
      })
    }
    if (current === '0') {
      wx.request({
        url: `https://second-hand-textbook.herokuapp.com/api/v1/users/${getApp().globalData.userId}/purchased?userId=${getApp().globalData.userId}`,
        method: 'get',
        success: function (res) {
          page.setData({
            transactions: res.data.transactions,
            nav: current
          })
        }
      })
    }
    console.log('test', current)
    if (current === '2') {
      console.log('test transactions')
      wx.request({
        url: `https://second-hand-textbook.herokuapp.com/api/v1/transactions?userId=${getApp().globalData.userId}`,
        method: 'get',
        success: function (res) {
          page.setData({
            transactions: res.data.transactions,
            nav: current
          })
        }
      })
    }
  },
  onLoad: function (options) {
      let page = this
      page.setData({
        activeIndex: options.index
      })

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68
        });
      }
    });

    this.navTabClick({currentTarget:{id:options.index}})
    
  },


  homeTap: function () {
    wx.reLaunch({
      url: '../../pages/main/main'
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
    this.setData({ transactions: this.data.transactions })
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