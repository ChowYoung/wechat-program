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
    pageNum: 1,
    sortUrl: '../../asset/sort-common.png',
    salesType: 0,
    sortType: 12
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
  // 输入框钩子
  handlerInput(e) {
    const {
      value
    } = e.detail
    this.setData({
      searchValue: value
    })
    if (this.data.searchValue === '') {
      this.setData({
        searchStatus: true,
        activeIndex: 0,
        pageNum: 1,
        sortUrl: '../../asset/sort-common.png',
        salesType: 0,
        sortType: 12,
        productList: [],
      })
    }
  },
  // 搜索按钮钩子
  handlerBtnSearch() {
    this.setData({
      pageNum: 1,
      productList: []
    })
    this.handlerSearch()
  },
  // 标签点击搜索钩子
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
  // 键盘搜索按钮钩子
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
    switch (index) {
      case 0:
        this.setData({
          sortUrl: '../../asset/sort-common.png',
          activeIndex: index,
          sortType: 12,
          pageNum: 1,
          productList: [],
          salesType: 0
        })
        break;
      case 1:
        this.setData({
          sortUrl: '../../asset/sort-common.png',
          activeIndex: index,
          sortType: 8,
          pageNum: 1,
          productList: [],
          salesType: 0
        })
        break;
      case 2:
        this.setData({
          sortUrl: '../../asset/sort-common.png',
          activeIndex: index,
          sortType: 6,
          pageNum: 1,
          productList: [],
          salesType: 0
        })
        break;
      case 3:
        this.setData({
          sortUrl: this.data.salesType > 0 ? '../../asset/sort-down.png' : '../../asset/sort-up.png',
          activeIndex: index,
          salesType: this.data.salesType > 0 ? 0 : 1,
          sortType: this.data.salesType > 0 ? 4 : 3,
          pageNum: 1,
          productList: []
        })
        break;
    }
    this.handlerSearch()
  },
  handlerSearch() {
    wx.request({
      url: 'https://api.laituike.com/cps/api/home/getSearchGoodsList',
      data: {
        "keyword": this.data.searchValue,
        "sort_type": this.data.sortType,
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
  }
})