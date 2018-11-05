// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetailId: '',
    detailInfo: {},
    scrollHeight: '',
    jumpUrl: '',
    movableX: 0,
    movableY: 0,
    animationData: {},
    outBoxStatus: false,
    jumpUrl: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: 'https://api.laituike.com/cps/api/product/getGoodsDetail',
      data: {
        "goods_id_list": `[${options.id}]`
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          productDetailId: options.id || 0,
          detailInfo: res.data.data.goods_details[0],
          scrollHeight: 500,
          goods_gallery_urls: JSON.parse(res.data.data.goods_details[0].goods_gallery_urls)
        })
        wx.setBackgroundColor({
          backgroundColor: '#f7de62'
        })
        this.getJumpUrl()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getJumpUrl() {
    wx.request({
      url: 'https://api.laituike.com/cps/api/product/getGoodsPromotionUrl',
      data: {
        "goods_id_list": `[${this.data.productDetailId}]`,
        "cps_token": app.globalData.cpsToken
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          jumpUrl: res.data.data
        })
      }
    })
  },
  jumpUrl() {
    wx.navigateToMiniProgram({
      appId: this.data.jumpUrl.goods_promotion_url_list[0].app_id,
      path: this.data.jumpUrl.goods_promotion_url_list[0].page_path
    });
  },
  outBox() {
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.translateY(-300).step()
    this.setData({
      outBoxStatus: true,
      animationData: animation.export()
    })
  },
  outBoxHide() {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.translateY(300).step()
    this.setData({
      outBoxStatus: false,
      animationData: animation.export()
    })
  },
  copyWord() {
    wx.setClipboardData({
      data: `${this.data.detailInfo.goods_name}\n原价：¥${this.data.detailInfo.min_group_price}\n劵后价：¥${this.data.detailInfo.after_coupon_price}\n下单地址：${this.data.jumpUrl.goods_promotion_url_list[0].short_url}`,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  }
})