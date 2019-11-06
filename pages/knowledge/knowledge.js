

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