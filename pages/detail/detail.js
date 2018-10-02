// pages/detail/detail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetailId: '',
    detailInfo: {},
    scrollHeight: '',
    jumpUrl: ''
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
    console.log(this)
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
  jumpUrl() {
    wx.request({
      url: 'https://api.laituike.com/cps/api/product/getGoodsPromotionUrl',
      data: {
        "goods_id_list": `[${this.data.productDetailId}]`
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        wx.navigateTo({
          url: `/pages/openwebview/openwebview?url=${res.data.data.goods_promotion_url_list[0].we_app_web_view_url}`
        })
      }
    })
  }
})