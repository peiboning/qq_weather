// pages/detailknowledge/detailknowledge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInfo:1,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var si = options.showInfo;
    console.log("showInfo is :" + si);
    this.setData({
      showInfo:si,
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
    return {
      title: "关注生活,关注天气",
      path: '/pages/detailknowledge/detailknowledge',
      imageUrl: "/img/share_info.jpg",
    }
  }
})