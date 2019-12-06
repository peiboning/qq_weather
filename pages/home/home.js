var integralUtils = require('../../utils/Integral.js') 
const app = getApp()
let globalData = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intregalNum: 0,
    version:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("success")
    let that = this;
    that.setData(
      {
        version: globalData.xcx_version
      }
    )
    let num = globalData.integral
    let i = 0;
    numDH();
    function numDH() {
      if (i <= 20) {
        setTimeout(function () {
          that.setData({
            intregalNum: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          intregalNum: num
        })
      }
    }
  },
  watchvideoAd() {
    // 在页面中定义激励视频广告
    let videoAd = null

    videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-62b7545cfcce8bfa'
    })
    videoAd.onLoad(() => { })
    videoAd.onError((err) => { })
    videoAd.onClose((res) => { })

    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },
  sigin(){
    var that = this
    integralUtils.sigin.call(that, 1)
    that.setData({
      intregalNum: globalData.integral
    })
  },

  coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
      current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
    })
  },
  showGameAd() {
    let appbox = qq.createAppBox({
              adUnitId: '8b592f47866d4754aabeb1e63f277847'
            })
            appbox.load().then(()=>{
              appbox.show()
            })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
