

Page({

  data:{
    showInfo:1,
  },
  onLoad(){

  },

  onShow(){
    
  },

  gotoPm(){
    this.gotoDetailPage(1)
  },
  gotoSnow(){
    this.gotoDetailPage(2)
  },
  gotoWind(){
    this.gotoDetailPage(3)
  },
  rewardAd() {
    let videoAd = qq.createRewardedVideoAd({
              adUnitId: '8d78c829902780cb55a6e8d124ec6dee'
            })

            videoAd.onError(function(res){
              console.log('videoAd onError',res)
            })
            videoAd.onLoad(function(res){
              console.log('videoAd onLoad',res)
            })
            videoAd.onClose(function(res){
              console.log('videoAd onClose',res)
            })
            
            videoAd.load()
              .then(() => {
                console.log('激励视频加载成功');
                videoAd.show().then(() => {
                  console.log('激励视频 广告显示成功')
                })
                .catch(err => {
                  console.log('激励视频 广告显示失败')
                })
              })
              .catch(err => {
                console.log('激励视频加载失败');
              })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "关注生活,关注天气",
      path: '/pages/knowledge/knowledge',
      imageUrl: "/img/share_info.jpg",
    }
  },

  gotoDetailPage(source){
    
    wx.navigateTo({
      url: '/pages/detailknowledge/detailknowledge?showInfo=' + source,
    })
  }

}
)