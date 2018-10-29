// pages/orders/orders.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
      goods_thumbnail_url: "http://xcxcdn.yangkeduo.com/duobaoSpread/2543453159/1000098_11919498/2.jpg",
      goods_name: "儿童衣服衣服衣服衣服衣服",
      order_title: "【小程序】自主订单",
      order_pay_time: "2018-10-03 21:09:23",
      order_create_time: "2018-10-03 21:08:23",
      order_receive_time: "2018-10-06 10:09:22",
      order_sn: "19820-72342389423894",
      order_amount: 9.80,
      order_status_desc: "待结算",
    }, {
      goods_thumbnail_url: "http://xcxcdn.yangkeduo.com/duobaoSpread/2543453159/1000098_11919498/2.jpg",
      goods_name: "儿童衣服衣服衣服衣服衣服",
      order_title: "【小程序】自主订单",
      order_pay_time: "2018-10-03 21:09:23",
      order_create_time: "2018-10-03 21:08:23",
      order_receive_time: "2018-10-06 10:09:22",
      order_sn: "19820-72342389423894",
      order_amount: 9.80,
      order_status_desc: "待结算",
    }, {
      goods_thumbnail_url: "http://xcxcdn.yangkeduo.com/duobaoSpread/2543453159/1000098_11919498/2.jpg",
      goods_name: "儿童衣服衣服衣服衣服衣服",
      order_title: "【小程序】自主订单",
      order_pay_time: "2018-10-03 21:09:23",
      order_create_time: "2018-10-03 21:08:23",
      order_receive_time: "2018-10-06 10:09:22",
      order_sn: "19820-72342389423894",
      order_amount: 9.80,
      order_status_desc: "待结算",
    }, {
      goods_thumbnail_url: "http://xcxcdn.yangkeduo.com/duobaoSpread/2543453159/1000098_11919498/2.jpg",
      goods_name: "儿童衣服衣服衣服衣服衣服",
      order_title: "【小程序】自主订单",
      order_pay_time: "2018-10-03 21:09:23",
      order_create_time: "2018-10-03 21:08:23",
      order_receive_time: "2018-10-06 10:09:22",
      order_sn: "19820-72342389423894",
      order_amount: 9.80,
      order_status_desc: "待结算",
    }, {
      goods_thumbnail_url: "http://xcxcdn.yangkeduo.com/duobaoSpread/2543453159/1000098_11919498/2.jpg",
      goods_name: "儿童衣服衣服衣服衣服衣服",
      order_title: "【小程序】自主订单",
      order_pay_time: "2018-10-03 21:09:23",
      order_create_time: "2018-10-03 21:08:23",
      order_receive_time: "2018-10-06 10:09:22",
      order_sn: "19820-72342389423894",
      order_amount: 9.80,
      order_status_desc: "待结算",
    }]

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

  },
  getOrderList() {
    wx.request({
      url: 'https://api.laituike.com/cps/api/order/getOrderList',
      data: {
        "time_type": "this_month",
        "cps_token": app.globalData.cpsToken,
        "page": 1,
        "page_size": 10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          goodsOptList: res.data.data.goods_opt_list
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
})