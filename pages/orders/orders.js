// pages/orders/orders.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    orderType: [{
      name: "本月订单",
      time_type: 'this_month'
    }, {
      name: "上月订单",
      time_type: 'last_month'
    }, {
      name: "上上月订单",
      time_type: 'last_last_month'
    }],
    orderTypeActiveIndex: 0,
    orderTimeType: "this_month",
    searchType: 'all',
    searchStatusType: '',
    statusType: [{
      name: "全部",
      search_type: 'all',
      status: -1
    }, {
      name: "待支付",
      search_type: 'status',
      status: 0
    }, {
      name: "已支付",
      search_type: 'status',
      status: 1
    }, {
      name: "已失效",
      search_type: 'status',
      status: 4
    }],
    statusTypeActiveIndex: 0,
    pageNum: 1,
    searchValue: '',
    searchStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrderList()
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
    return {
      // title: this.data.detailInfo.goods_name,
      title: '拼多多内部券平台，领券下单享内部折扣',
      path: 'pages/home/home',
      imageUrl: 'https://image.laituike.com/wxapp/share.png'
    }
  },
  getOrderList() {
    let data = {
      "time_type": this.data.orderTimeType,
      "cps_token": app.globalData.cpsToken,
      "page": this.data.pageNum,
      "page_size": 10,
      "search_type": this.data.searchType,
    }
    if (this.data.searchValue) {
      Object.assign(data, {
        "order_sn": this.data.searchValue,
      })
    }
    if (this.data.searchStatusType > -1) {
      Object.assign(data, {
        "status": this.data.searchStatusType
      })
    }
    wx.request({
      url: 'https://api.laituike.com/cps/api/order/getOrderList',
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          orderList: [...this.data.orderList, ...res.data.data.order_list]
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  getOrderByType(el) {
    const {
      index,
      ordertype
    } = el.currentTarget.dataset
    this.setData({
      orderTypeActiveIndex: index,
      orderTimeType: ordertype,
      orderList: [],
      pageNum: 1
    })
    this.getOrderList()
  },
  getOrderByStatus(el) {
    const {
      index,
      statustype,
      searchtype
    } = el.currentTarget.dataset
    this.setData({
      statusTypeActiveIndex: index,
      searchType: searchtype,
      searchStatusType: statustype,
      orderList: [],
      pageNum: 1
    })
    this.getOrderList()
  },
  scrollViewHandler() {
    this.data.pageNum += 1
    this.getOrderList();
  },
  handlerInput(e) {
    const {
      value
    } = e.detail
    this.setData({
      searchValue: value,
      searchStatus: true,
      orderList: [],
    })
    if (this.data.searchValue === '') {
      this.setData({
        searchStatus: false,
        searchType: 'all',
        orderTimeType: 'this_month',
        orderTypeActiveIndex: 0,
        statusTypeActiveIndex: 0,
        pageNum: 1
      })
      this.getOrderList()
    }
  },
  // 搜索按钮钩子
  handlerBtnSearch() {
    this.setData({
      pageNum: 1,
      searchType: 'order_sn',
      orderTimeType: '',
    })
    this.getOrderList()
  },
  handlerInputSearch(e) {
    this.setData({
      pageNum: 1,
      searchValue: e.detail.value,
      searchType: 'order_sn',
      orderTimeType: '',
    })
    this.getOrderList()
  },
})