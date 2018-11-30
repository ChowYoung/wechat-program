// pages/detail/detail.js
const app = getApp()
import promisify from 'promisify.js'

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
    jumpUrl: {},
    canScroll: true,
    windowHeight: '',
    windowWidth: '',
    imgShow: false,
    qrcode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        // 高度,宽度 单位为px
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth:  res.windowWidth
        })
      }
    })
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
        wx.setNavigationBarTitle({
          title: this.data.detailInfo.goods_name 
        })

        this.getJumpUrl()
        this.getQrcode()
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
  onShareAppMessage(res) {
    return {
      title: this.data.detailInfo.goods_name,
      path: 'pages/home/home?detailId=' + this.data.productDetailId
    }
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
      animationData: animation.export(),
      canScroll: false
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
      animationData: animation.export(),
      canScroll: true,
      imgShow: false
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
  },
  creatImg() {
    let that = this;
    const wxGetImageInfo = promisify(wx.getImageInfo)
    Promise.all([
      wxGetImageInfo({
        src: that.data.goods_gallery_urls[0].replace('http', 'https')
      }),
      wxGetImageInfo({
        src: that.data.qrcode
      }),
      wxGetImageInfo({
        src: '../../asset/canvas-bg.png'
      })
    ]).then(res => {
      const ctx = wx.createCanvasContext('shareCanvas')
      ctx.drawImage(res[2].path, 0, 0, 500, 500)
      ctx.drawImage(res[0].path, 0, 0, that.data.windowWidth * 0.7, that.data.windowWidth * 0.7)
      ctx.setFillStyle('#f7de62')
      ctx.fillRect(10, that.data.windowWidth * 0.7 + 10, 50, 20)
      ctx.setFillStyle('#000000')
      ctx.setFontSize(12)
      ctx.fillText('劵后价', 17, that.data.windowWidth * 0.7 + 25);
      ctx.setFontSize(16)
      ctx.fillText(`￥${that.data.detailInfo.min_group_price}`, 60, that.data.windowWidth * 0.7 + 25);
      ctx.setTextAlign('left')
      ctx.setFillStyle('#000000')
      ctx.setFontSize(13)
      let title = that.data.detailInfo.goods_name
      let chr = title.split("")
      let temp = ""
      let row = []
      for (var a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < that.data.windowWidth * 0.7 * 0.4) {
          temp += chr[a];
        } else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);
      for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], 10, that.data.windowWidth * 0.7 + 50 + b * 20);
      }
      ctx.setFillStyle('red')
      ctx.setFontSize(13)
      ctx.fillText('5元优惠券', 10, that.data.windowWidth * 0.7 + 50 + row.length * 20)
      // 小程序码
      ctx.drawImage(res[1].path, that.data.windowWidth * 0.7 * 0.5, that.data.windowWidth * 0.7 + 20, that.data.windowWidth * 0.7 * 0.4, that.data.windowWidth * 0.7 * 0.4)
      ctx.stroke()
      ctx.draw()
      this.setData({
        imgShow: true,
        outBoxStatus: false
      })
    }).catch(function(reason) {
      wx.showModal({
        title: '提示',
        content: JSON.stringify(reason)
      })
    })
  },
  saveNow() {
    const wxCanvasToTempFilePath = promisify(wx.canvasToTempFilePath)
    const wxSaveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum)
    wxCanvasToTempFilePath({
      canvasId: 'shareCanvas'
    }, this).then(res => {
      return wxSaveImageToPhotosAlbum({
        filePath: res.tempFilePath
      })
    }).then(res => {
      wx.showToast({
        title: '已保存到相册'
      })
    })
  },
  getQrcode() {
    let _this = this
    wx.request({
      url: 'https://api.laituike.com/cps/api/product/getSharingUrl',
      data: {
        "goods_id_list": `[${_this.data.productDetailId}]`,
        "cps_token": app.globalData.cpsToken,
        "goods_gallery_urls0": _this.data.goods_gallery_urls[0],
        "after_coupon_price": _this.data.detailInfo.after_coupon_price,
        "min_group_price": _this.data.detailInfo.min_group_price,
        "share_type": "qrcode",
        "goods_name": _this.data.detailInfo.goods_name,
        "coupon_disconunt": _this.data.detailInfo.coupon_discount
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        _this.setData({
          qrcode: res.data.data.shareUrl
        })
      }
    })
  }
})