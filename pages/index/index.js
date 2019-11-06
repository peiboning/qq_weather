let utils = require('../../utils/util')
let globalData = getApp().globalData
const key = globalData.key
let SYSTEMINFO = globalData.systeminfo
var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
Page({
  data: {
    isShowLocationTips:false,
    showKnowledgeDot:1,
    backgroundImage:'',
    air:{}, 
    searchAlpha:1.0,
    searchHeight: 0,
    isShowSearch: true,
    isIPhoneX: globalData.isIPhoneX,
    message: '',
    cityDatas: {},
    hourlyDatas: [],
    weatherIconUrl: globalData.weatherIconUrl,
    detailsDic: {
      key: ['tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'vis', 'pres', 'cloud', ''],
      val: {
        tmp: '温度(℃)',
        fl: '体感温度(℃)',
        hum: '相对湿度(%)',
        pcpn: '降水量(mm)',
        wind_dir: '风向',
        wind_deg: '风向角度(deg)',
        wind_sc: '风力(级)',
        wind_spd: '风速(mk/h)',
        vis: '能见度(km)',
        pres: '气压(mb)',
        cloud: '云量',
      },
    },
    lifestyles: {
      'comf': '舒适度指数',
      'cw': '洗车指数',
      'drsg': '穿衣指数',
      'flu': '感冒指数',
      'sport': '运动指数',
      'trav': '旅游指数',
      'uv': '紫外线指数',
      'air': '空气污染扩散条件指数',
      'ac': '空调开启指数',
      'ag': '过敏指数',
      'gl': '太阳镜指数',
      'mu': '化妆指数',
      'airc': '晾晒指数',
      'ptfc': '交通指数',
      'fsh': '钓鱼指数',
      'spi': '防晒指数',
    },
    // 用来清空 input
    searchText: '',
    // 是否已经弹出
    hasPopped: false,
    animationMain: {},
    animationOne: {},
    animationTwo: {},
    animationThree: {},
    animationHiddenGuidView:{},
    // 是否切换了城市
    located: true,
    // 需要查询的城市
    searchCity: '',
    setting: {},
    richu:'/img/richu.png',
    riluo:'/img/rila.png',
    bcgImgIndex: 0,
    bcgImg: '',
    bcgImgAreaShow: false,
    bcgColor: '#2d2225',
    // 粗暴直接：移除后再创建，达到初始化组件的作用
    showHeartbeat: true,
    // heartbeat 时禁止搜索，防止动画执行
    enableSearch: true,
    openSettingButtonShow: false,
    shareInfo: {
      "title":"生活天气"
    },
  },
  success (data, location) {
    this.setData({
      openSettingButtonShow: false,
      searchCity: location,
    })
    wx.stopPullDownRefresh()
    //添加星期信息
    var daily_forecast = data.daily_forecast;
    for(var i =0;i<daily_forecast.length;i++){
      var temp = daily_forecast[i];
      var week = this.getWeek(temp.date);
      temp.week = week;
    }
    
    let now = new Date()
    // 存下来源数据
    data.updateTime = now.getTime()
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
    wx.setStorage({
      key: 'cityDatas',
      data,
    })
    this.setData({
      cityDatas: data,
    })
  },
  fail(res) {
    wx.stopPullDownRefresh()
    let errMsg = res.errMsg || ''
    // 拒绝授权地理位置权限
    if (errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1) {
      this.setData({
        isShowLocationTips:true
      })
      wx.showToast({
        title: '需要开启地理位置权限',
        icon: 'none',
        duration: 2500,
        success: (res) => {
          // if (this.canUseOpenSettingApi()) {
          //   // let timer = setTimeout(() => {
          //   //   clearTimeout(timer)
          //   //   wx.openSetting({
          //   //     success(res) {
          //   //       console.log("openSetting:"+res.authSetting)
          //   //       // res.authSetting = {
          //   //       //   "scope.userInfo": true,
          //   //       //   "scope.userLocation": true
          //   //       // }
          //   //     }
          //   //   })
          //   // }, 2500)
          // } else {
          //   this.setData({
          //     openSettingButtonShow: true,
          //   })
          // }
        },
      })
    } else {
      wx.showToast({
        title: '网络不给力，请稍后再试',
        icon: 'none',
      })
    }
  },
  commitSearch (res) {
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
    this.search(val)
  },
  dance() {
    this.setData({
      enableSearch: false,
    })
    let heartbeat = this.selectComponent('#heartbeat')
    heartbeat.dance(() => {
      this.setData({
        showHeartbeat: false,
        enableSearch: true,
      })
      this.setData({
        showHeartbeat: true,
      })
    })
  },
  clearInput () {
    this.setData({
      searchText: '',
    })
  },
  search (val, callback) {
    if (val === '520' || val === '521') {
      this.clearInput()
      this.dance()
      return
    }
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })
    if (val) {
      this.setData({
        located: false,
      })
      this.getWeather(val)
      this.getHourly(val)
    }
    callback && callback()
  },
  // wx.openSetting 要废弃，button open-type openSetting 2.0.7 后支持
  // 使用 wx.canIUse('openSetting') 都会返回 true，这里判断版本号区分
  canUseOpenSettingApi () {
    let systeminfo = getApp().globalData.systeminfo
    let SDKVersion = systeminfo.SDKVersion
    let version = utils.cmpVersion(SDKVersion, '2.0.7')
    if (version < 0) {
      return true
    } else {
      return false
    }
  },
  init(params, callback) {
    this.setData({
      located: true,
    })
    wx.getLocation({
      success: (res) => {
        console.log(res)
        this.getWeather(`${res.latitude},${res.longitude}`)
        this.getHourly(`${res.latitude},${res.longitude}`)
        callback && callback()
        

      },
      fail: (res) => {
        this.fail(res)
      }
    })
  },

  getAirInfo(data){
    var that = this;
    var location = data.basic.parent_city;
    wx.request({
      url: `${globalData.requestUrl.air}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0]
          if (data.status === 'ok') {
            that.setData({
              air: data.air_now_city}
            )
          }
        }
      },
      fail: () => {
      },
    })
  },

  getWeather (location) {
    wx.request({
      url: `${globalData.requestUrl.weather}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0]
          if (data.status === 'ok') {
            this.clearInput()
            this.success(data, location)
            this.getAirInfo(data)
          } else {
            wx.showToast({
              title: '查询失败',
              icon: 'none',
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
    })
  },
  getHourly(location) {
    wx.request({
      url: `${globalData.requestUrl.hourly}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0]
          if (data.status === 'ok') {
            this.setData({
              hourlyDatas: data.hourly || []
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
    })
  },
  onPullDownRefresh (res) {
    this.setBcgImg1();
    this.reloadPage();
  },
  getCityDatas() {
    let cityDatas = wx.getStorage({
      key: 'cityDatas',
      success: (res) => {
        this.setData({
          cityDatas: res.data,
        })
      },
    })
  },
  setBcgImg1(){
    var data = new Date();
    var hours = data.getHours();
    var date = data.getDate();
    var month = data.getMonth() + 1;
    var color;
    console.log('now hours is :' + hours);
    var path = "";
    if(hours >= 20 || hours<=5){
      path = '/img/yewan.jpg';
      color = '#061824';
    }else if(hours > 17){
      path = '/img/bangwan.jpg';
      color = '#383b3d';
    }else if(hours<7){
      path = '/img/zaochen.jpg';
      color = '#6c93bb';
    }else{
      color = '#3a96f5';
      path = '/img/baitian.jpg';
    }

    //国庆节背景
    console.log('month :' + month + ',date:' + date);
    if ((month == 9 && date > 1) || month == 10) {
      color = '#a72922';
      path = '/img/guoqing.png';
    }
    //中秋节背景
    if ((month == 9 && date > 10 && date<16)) {
      color = '#364362';
      path = '/img/zhongqiu.png';
    }
    console.log('path :' + path);
    this.setData({
      bcgImg: path,
      bcgColor: color,
    })
    this.setNavigationBarColor();
    
  },
   
  setNavigationBarColor (color) {
    let bcgColor = color || this.data.bcgColor
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.bcgColor,
    })
  },
  getBroadcast (callback) {
    wx.cloud.callFunction({
      name: 'getBroadcast',
      data: {
        hour: new Date().getHours(),
      },
    })
    .then(res => {
      let data = res.result.data
      if (data) {
        callback && callback(data[0].message)
      }
    })
  },
  reloadGetBroadcast () {
    this.getBroadcast((message) => {
      this.setData({
        message,
      })
    })
  },
  reloadWeather () {
    if (this.data.located) {
      this.init({})
    } else {
      this.search(this.data.searchCity)
      this.setData({
        searchCity: '',
      })
    }
  },
  onShow() {
    console.log("onShow..............");
    wx.getSystemInfo({
      success: function(res) {
        console.log("getSystemInfo.............." + res.SDKVersion);
      },
    })
    this.reloadKnowledgeDotStatus();
    var that = this;
    // 检查权限
    wx.getSetting({
      success: function (res){
        if (res.authSetting["scope.userLocation"] == true){
          if(that.data.isShowLocationTips){
            that.setData({
              isShowLocationTips: false
            })
            that.reloadPage()
          }
          
        }else{
          
          that.setData({
            isShowLocationTips: true
          })
          wx.showToast({
            title: '获取地理位置权限失败',
            icon: 'none',
          })
        }
      }
    })

    setTimeout(function(){
      that.hiddenGuidView();
    }, 6000)
  },
  onLoad () {
    var that = this;
    this.setBcgImg1();//按时间来定背景
    this.reloadPage();
    console.log('onloaded');
    var query = wx.createSelectorQuery();
    query.select("#search").boundingClientRect();
    query.exec(function (res) {
      that.data.searchHeight = res[0].height;
      console.log("search height is :" + that.data.searchHeight);
    })


  },
  reloadPage () {
    
    this.getCityDatas()
    this.reloadInitSetting()
    this.reloadWeather()
    
  },
  checkUpdate (setting) {
    // 兼容低版本
    if (!setting.forceUpdate || !wx.getUpdateManager) {
      return
    }
    let updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      console.error(res)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已下载完成，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  showBcgImgArea () {
    this.setData({
      bcgImgAreaShow: true,
    })
  },
  hideBcgImgArea () {
    this.setData({
      bcgImgAreaShow: false,
    })
  },
  chooseBcg (e) {
    let dataset = e.currentTarget.dataset
    let src = dataset.src
    let index = dataset.index
    wx.setStorage({
      key: 'bcgImgIndex',
      data: index,
    })
  },
  toCitychoose () {
    wx.navigateTo({
      url: '/pages/citychoose/citychoose',
    })
  },
  initSetting (successFunc) {
    wx.getStorage({
      key: 'setting',
      success: (res) => {
        let setting = res.data || {}
        this.setData({
          setting,
        })
        successFunc && successFunc(setting)
      },
      fail: () => {
        this.setData({
          setting: {},
        })
      },
    })
  },
  reloadInitSetting () {
    this.initSetting((setting) => {
      this.checkUpdate(setting)
    })
  },
  onShareAppMessage (res) {

    var data = new Date();
    var hours = data.getHours();
    var date = data.getDate();
    var month = data.getMonth() + 1;
    let shareInfo = this.data.shareInfo
    var shareTitle = '关注生活, 关注天气'

    //国庆节分享语
    console.log('month :' + month + ',date:' + date);
    if ((month == 9 && date > 20)) {
      shareTitle = '国庆佳节,关注出行天气';
    }
    //中秋节分享语
    if ((month == 9 && date > 10 && date < 16)) {
      shareTitle = '中秋佳节,关注出行天气';
    }

    return {
      title: shareTitle,
      path: shareInfo.path || '/pages/index/index',
      imageUrl: shareInfo.imageUrl,
    }
  },
  menuHide () {
    if (this.data.hasPopped) {
      this.takeback()
      this.setData({
        hasPopped: false,
      })
    }
  },
  menuMain () {
    if (!this.data.hasPopped) {
      this.popp()
      this.setData({
        hasPopped: true,
      })
    } else {
      this.takeback()
      this.setData({
        hasPopped: false,
      })
    }
  },
  menuToCitychoose () {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/citychoose/citychoose',
    })
  },
  menuToSetting () {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  menuToAbout () {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  popp() {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationThree = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationFour = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(180).step()
    animationOne.translate(0, -60).rotateZ(360).opacity(1).step()
    animationTwo.translate(-Math.sqrt(3600 - 400), -30).rotateZ(360).opacity(1).step()
    animationThree.translate(-Math.sqrt(3600 - 400), 30).rotateZ(360).opacity(1).step()
    animationFour.translate(0, 60).rotateZ(360).opacity(1).step()
    this.setData({
      animationMain: animationMain.export(),
      animationOne: animationOne.export(),
      animationTwo: animationTwo.export(),
      animationThree: animationThree.export(),
      animationFour: animationFour.export(),
    })
  },
  takeback() {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationThree = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationFour = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(0).step();
    animationOne.translate(0, 0).rotateZ(0).opacity(0).step()
    animationTwo.translate(0, 0).rotateZ(0).opacity(0).step()
    animationThree.translate(0, 0).rotateZ(0).opacity(0).step()
    animationFour.translate(0, 0).rotateZ(0).opacity(0).step()
    this.setData({
      animationMain: animationMain.export(),
      animationOne: animationOne.export(),
      animationTwo: animationTwo.export(),
      animationThree: animationThree.export(),
      animationFour: animationFour.export(),
    })
  },
  hiddenGuidView() {
    let animationHidden = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
    })
    animationHidden.opacity(0).step()
    this.setData({
      animationHiddenGuidView: animationHidden.export()
    })
  },

  onPageScroll: function (ev) {
    console.log("scroll top is " + ev.scrollTop)
    var scrollTop = ev.scrollTop;
    if (scrollTop > this.data.searchHeight){
      this.setData({
        searchAlpha:0
      })
    }else{
      var alph = (this.data.searchHeight - scrollTop) / this.data.searchHeight;
      console.log("scroll alph " + alph)
      this.setData({
        searchAlpha: alph
      })
    }

  },

  getWeek(date){
    var week = new Date(date).getDay();
    return weekArray[week];
  },

  shareApp(){
    console.log('share app');
    
  },
  gotoWeatherKnowledge(){
    console.log("gotoWeatherKnowledge")
    wx.navigateTo({
      url: '/pages/knowledge/knowledge',
    })
    wx.setStorage({
      key: 'showKnowledgeDot',
      data: 0,
    })
  },

  reloadKnowledgeDotStatus(){
    var that = this;
    wx.getStorage({
      key: 'showKnowledgeDot',
      success: function(res) {
        that.setData({
          showKnowledgeDot:res.data
        })
      },
    })
  },

  officialLoad(res){
    console.log("officialLoad status:" + res.detail.status + ", msg:" + res.detail.errMsg)
  },
  officialerror(res){
    console.log("officialerror status:" + res.detail.status + ", msg:" + res.detail.errMsg)
  },
  launchAppError(e) {
    console.log("app launch:"+e.detail.errMsg)
  },


})