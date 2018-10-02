// pages/search/search.js
import searchKeyWords from '../../data/SearchKeyWords.js'
import productList from '../../data/ProductList.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKeyWords: [],
    productList: [],
    searchValue: '',
    searchType: [{
      type: 0,
      name: '最新'
    }, {
      type: 1,
      name: '优惠券'
    }, {
      type: 2,
      name: '销量'
    }, {
      type: 3,
      name: '价格'
    }],
    searchStatus: true,
    activeIndex: 0,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      searchKeyWords: searchKeyWords.search_default_list
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
  /**
   * 搜索钩子
   */
  handlerTapSearch(e) {
    const {
      code,
      name
    } = e.target.dataset
    this.setData({
      searchValue: name
    })
    this.handlerSearch()
  },
  handlerInputSearch(e) {
    this.setData({
      pageNum: 1,
      searchValue: e.detail.value,
      productList: []
    })
    this.handlerSearch()
  },
  getSearchType(el) {
    const {
      oid,
      index
    } = el.currentTarget.dataset
    this.setData({
      activeIndex: index
    })
  },
  handlerSearch() {
    wx.request({
      url: 'https://api.laituike.com/cps/api/home/getSearchGoodsList',
      data: {
        "keyword": this.data.searchValue,
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
          pageNum: this.data.pageNum + 1,
          searchStatus: false,
          productList: [...this.data.productList, ...res.data.data.duoduojinbao_goods_list]
        })
      }
    })
  },
  jumpUrl(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.gid}`
    })
  },
})