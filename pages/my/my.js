const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
  jumpOrder() {
    wx.navigateTo({
      url: '/pages/orders/orders'
    })
  },
  jumpGuide(){
    wx.navigateTo({
      url: '/pages/guide/guide'
    })
  }
})