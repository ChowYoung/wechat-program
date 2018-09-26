// pages/home/home.js

import getHomeTagData from '../../data/GetHomeTag.js'
import productList from '../../data/ProductList.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsOptList: [],
    activeIndex: 0,
    productList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getGoodsOptList();
    this.getProductList();
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

  getGoodsOptList() {
    const {
      data
    } = getHomeTagData;
    this.setData({
      goodsOptList: data.goods_opt_list
    })
  },

  getGoodsOptType(el) {
    const {
      oid,
      index
    } = el.currentTarget.dataset
    this.setData({
      activeIndex: index
    })
  },

  getProductList() {
    const {
      goods_search_response
    } = productList;
    this.setData({
      productList: goods_search_response.goods_list
    })
  }
})