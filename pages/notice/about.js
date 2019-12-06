const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  onLoad: function () { },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  copyEmail() {
    wx.setClipboardData({
      data: 'peibnxcx@163.com',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log('clipboarddata: ' + res.data) // data
          }
        })
      }
    })
  }
});
