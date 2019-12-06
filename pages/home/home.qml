<scroll-view scroll-y class="scrollPage">
  <view class="UCenter-bg">
    <image src="/img/logo.png" class="png" mode="widthFix"></image>
    <view class="text-xl">欢迎使用生活天气
      <text class="text-df">v{{version}}</text>
    </view>
    <image src="https://7765-weather-id-1300796844.tcb.qcloud.la/images/wave.gif?sign=b2e67b912389b4238bf7498d90646424&t=1575429303" mode="scaleToFill" class="gif-wave"></image>
  </view>
  <view class="padding flex text-center text-grey bg-white shadow-warp">
    
    <view class="flex flex-sub flex-direction solid-right">
      <view class="text-xxl text-blue">
        <!-- {{intregalNum}} -->
        100
      </view>
      <view class="margin-top-sm">
        <text class="cuIcon-favorfill"></text> 积分</view>
    </view>
    
  </view>
  <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius" >
    <ad unit-id="2c1e5c1e317c8b6e5dc141fc4cd33dd8"></ad>
    <view class="cu-item arrow" catchtap="sigin" wx:if='{{1==0}}'>
      <view class="content" hover-class="none">
        <text class="cuIcon-notice text-green"></text>
        <text class="text-grey">签到</text>
      </view>
    </view>
    <view class="cu-item arrow"  wx:if='{{1==0}}'>
      <view class="content" hover-class="none">
        <text class="cuIcon-share text-green"></text>
        <text class="text-grey">分享</text>
      </view>
    </view>
    <view class="cu-item arrow" catchtap="watchvideoAd"  wx:if='{{1==0}}'>
      <view class="content" bindtap="showQrcode">
        <text class="cuIcon-video text-green"></text>
        <text class="text-grey">看视频，领积分</text>
      </view>
    </view>
  </view>

  <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius" >
    <view class="cu-item arrow" >
      <navigator class="content" url="/pages/notice/about" hover-class="none">
        <text class="cuIcon-notice text-green"></text>
        <text class="text-grey">免责声明</text>
      </navigator>
    </view>
    <view class="cu-item arrow" catchtap='showGameAd'>
      <view class="content" hover-class="none">
        <text class="cuIcon-game text-green"></text>
        <text class="text-grey">玩个游戏</text>
      </view>
    </view>
  </view>
  <ad unit-id="acaf829134475a402c15faf2371ab5f5"></ad>
  <view class="cu-tabbar-height"></view>
</scroll-view>