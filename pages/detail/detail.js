// pages/detail/detail.js

import ProductDetail from '../../data/ProductDetail.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetailId: '',
    detailInfo: {},
    scrollHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      productDetailId: options.id || 0,
      detailInfo: ProductDetail.goods_details[0],
      scrollHeight: 500
    })
    wx.setBackgroundColor({
      backgroundColor: '#f7de62'
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
  jumpUrl() {
    wx.navigateTo({
      url: `/pages/openwebview/openwebview`
    })
  }
})