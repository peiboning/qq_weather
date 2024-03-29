//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = qq.getStorageSync('logs') || []
    logs.unshift(Date.now())
    qq.setStorageSync('logs', logs)

    // 登录
    qq.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    qq.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          qq.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    // 是否保持常亮，离开小程序失效
    integral: 100,
    xcx_version:'1.0.7',
    keepscreenon:false,
    systeminfo: {},
    isIPhoneX: false,
    key: '5b69e94aa9b041a9b8393b14360f188b',
    weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
    requestUrl: {
      weather: 'https://free-api.heweather.com/s6/weather',
      hourly: 'https://free-api.heweather.com/s6/weather/hourly',
      air:'https://free-api.heweather.net/s6/air/now'
    },
    cityDatas: {},
  }
})
