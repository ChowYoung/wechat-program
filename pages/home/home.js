// pages/home/home.js

import productList from '../../data/ProductList.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsOptList: [],
    activeIndex: 0,
    productList: [],
    pageNum: 1,
    oid: 1
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
    wx.request({
      url: 'https://api.laituike.com/cps/api/home/getGoodsOpt',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          goodsOptList: res.data.data.goods_opt_list
        })
      }
    })
  },

  getGoodsOptType(el) {
    const {
      oid,
      index
    } = el.currentTarget.dataset
    this.setData({
      oid,
      productList: [],
      pageNum: 1
    })
    this.getProductList(() => {
      this.setData({
        activeIndex: index
      })
    })
  },

  getProductList(cb) {
    wx.request({
      url: 'https://api.laituike.com/cps/api/home/getSearchGoodsList',
      data: {
        "opt_id": this.data.oid,
        "sort_type": 0,
        "page": this.data.pageNum,
        "page_size": 10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          productList: [...this.data.productList, ...res.data.data.duoduojinbao_goods_list]
        })
        this.data.pageNum += 1
        if (cb) cb();
      }
    })
  },

  jumpUrl(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.gid}`
    })
  },

  handlerFocus() {
    wx.navigateTo({
      url: `/pages/search/search`
    })
  },
  handlerScrollTolower() {
    this.getProductList()
  }
})