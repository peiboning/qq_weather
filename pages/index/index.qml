<view class="container {{isIPhoneX ? 'iphonex-padding' : ''}}" catchtap='menuHide'>
  <heartbeat id='heartbeat' wx:if='{{showHeartbeat}}'></heartbeat>
  <view class='bcg' wx:if='{{!bcgImg}}' style='background: {{bcgColor}}'></view>
  <image class='bcg' wx:if='{{bcgImg}}' src='{{bcgImg}}' mode='aspectFill'></image>
  
  <!--搜索 start-->
  <view id='search' class='search' wx:if='{{isShowSearch && !bcgImgAreaShow}}' style='background:rgba(255, 255, 255, 0);opacity:{{searchAlpha}}'>
    <view class='wrapper'>
      <image src='/img/search.png'></image>
      <input placeholder-class='placeholderClass' confirm-type='search' placeholder='请输入城市名，快速查询天气信息' maxlength='20' bindconfirm='commitSearch' value='{{searchText}}' disabled='{{!enableSearch}}'></input>
    </view>
  </view>
  <!--搜索 end-->

  <!--tips-->
  <view wx:if='{{!isShowLocationTips}}'> 
    <view class='small_tips' catchtap='gotoWeatherKnowledge'>
      <text>天气小知识</text>
    </view>
    <view class='dot' wx:if='{{showKnowledgeDot == 1}}'></view>
  </view>

  <view wx:if='{{!isShowLocationTips}}'> 
    <view class='small_tips_ad' catchtap='seeAdPage'>
      <text>看视频AD</text>
    </view>
    <view class='dot' wx:if='{{showKnowledgeDot == 1}}'></view>
  </view>

  <!--引导-->
   <view class='guid'  animation="{{animationHiddenGuidView}}">
    <text>点击添加到我的桌面，下次使用更方便</text>
   </view>
  

  <!--背景选择 start-->
  <view class='chooseBcg' wx:if='{{bcgImgAreaShow}}'>
    <view class='top'>
      <view class='title'>更换背景</view>
      <view class='bcgs'>
        <view class='border {{bcgImgIndex === index ? "active" : ""}}' wx:for='{{bcgImgList}}' wx:key='{{index}}'>
          <image src='{{item.src}}' catchtap='chooseBcg' data-index='{{index}}' data-src='{{item.src}}'></image>
        </view>
      </view>
    </view>
    <view class='close' catchtap='hideBcgImgArea'>
      <image src='/img/up-arrow.png'></image>
    </view>
  </view>
  <!--背景选择 end-->

  <!--内容-->
  <view id="mainView" class='content' wx:if='{{!bcgImgAreaShow}}' style='margin-top: {{setting.hiddenSearch ? 20 : 60}}px'>
    <!--头像start-->
    <view class='avatarInfo' catchtap='showBcgImgArea' wx:if='{{1 == 0}}'>
      <open-data class='avatar' type='userAvatarUrl'></open-data>
      <open-data class='name' type='userNickName'></open-data>
      <image class='downArrow' src='/img/down.png'></image>
    </view>
    <!--头像end-->
    <!--权限引导start-->
    <view class='recommend' wx:if='{{isShowLocationTips}}'>
        <view class='tips'>
          需要使用定位权限，否则无法正常查看天气信息
        </view>
        <button class='btn' open-type="openSetting">
          <image src='/img/location_s_w.png'></image>
          <view>前往设置，开启定位权限</view>
        </button>
        
    </view>
    <!--权限引导end-->

    <!--天气信息 start-->
    <view class='info'>
      <view class='city'>
        <view class='name' bindtap='toCitychoose'>
          <image wx:if='{{located}}' class='icon' src='/img/location_s_w.png'></image>
          <view class='val'>{{cityDatas.basic.location || '定位中'}}</view>
          <image class='down' src='/img/down.png'></image>
        </view>
        <text class='time' wx:if='{{cityDatas.updateTimeFormat}}'>{{cityDatas.updateTimeFormat}} 更新</text>
      </view>
      <view class='message'>{{message}}</view>
      <view class='temp num' decode='true'>{{cityDatas.now.tmp || '-'}}
        <text style='font-size:50rpx;position:relative;top:-20px;'>℃</text>
      </view>
      <view class='weather'>{{cityDatas.now.cond_txt || '--'}}</view>
      <view class='pm'>
        <text>PM2.5 {{air.pm25}}{{air.qlty}}</text>
      </view>
    </view>

    <view class='todayAndTowmorr'>
      <view class='detail' wx:for='{{cityDatas.daily_forecast}}' wx:key='{{index}}' wx:if='{{index<2}}'>
        <view wx:if='{{index == 0}}'>
          <text>今天</text>
        </view>
        <view wx:else>
          <text>明天</text>
        </view>
        <view class='weather'>
          <text>{{item.tmp_min}}~{{item.tmp_max}}℃</text>
          <text style='margin-left: 10rpx'>{{item.cond_txt_d}}</text>
          <image mode='widthFix' src='{{weatherIconUrl}}{{item.cond_code_d}}.png'></image>
        </view>
      </view>
    </view>

    <!--详细温度 start-->
    <view class='weather_detail title' wx:for='{{cityDatas.daily_forecast}}' wx:key='{{index}}' wx:if='{{index<1}}'>
    <text>实时详细预报</text>
    </view>
    <view class='details'>
      <view class='detail' wx:for='{{detailsDic.key}}' wx:key='{{index}}'>
        <view>{{detailsDic.val[item]}}</view>
        <view>{{cityDatas.now[item]}}</view>
      </view>
    </view>
    <!--详细温度 end-->

    <!--分时温度 start-->
    <view class='hourly' wx:if='{{hourlyDatas.length}}'>
      <view class='title'>24 小时逐 3 小时预报</view>
      <view class='hours'>
        <swiper style='height:360rpx;' indicator-dots="{{false}}" autoplay="{{false}}" circular="{{false}}" duration="300" next-margin="50rpx">
          <block wx:for="{{hourlyDatas}}" wx:key="{{index}}">
            <swiper-item>
              <view class='hour'>
                <view class='detail'>
                  <view>温度(℃)</view>
                  <view>{{item.tmp}}</view>
                </view>
                <view class='detail'>
                  <view>天气</view>
                  <view class='weather'>
                    <text>{{item.cond_txt}}</text>
                    <image mode='widthFix' src='{{weatherIconUrl}}{{item.cond_code}}.png'></image>
                  </view>
                </view>
                <view class='detail'>
                  <view>相对湿度(%)</view>
                  <view>{{item.hum}}</view>
                </view>
                <view class='detail'>
                  <view>露点温度(℃)</view>
                  <view>{{item.dew}}</view>
                </view>
                <view class='detail'>
                  <view>降水概率</view>
                  <view>{{item.pop}}</view>
                </view>
                <view class='detail'>
                  <view>风向</view>
                  <view>{{item.wind_dir}}</view>
                </view>
                <view class='detail'>
                  <view>风向角度(deg)</view>
                  <view>{{item.wind_deg}}</view>
                </view>
                <view class='detail'>
                  <view>风力(级)</view>
                  <view>{{item.wind_sc}}</view>
                </view>
                <view class='detail'>
                  <view>风速(mk/h)</view>
                  <view>{{item.wind_spd}}</view>
                </view>
                <view class='detail'>
                  <view>气压(mb)</view>
                  <view>{{item.pres}}</view>
                </view>
                <view class='detail'>
                  <view>云量</view>
                  <view>{{item.cloud}}</view>
                </view>
              </view>
              <view class='time'>{{item.time}}</view>
            </swiper-item>
          </block>
        </swiper>
      </view>
    </view>
    <!--分时温度 end-->

    <ad unit-id="707d6be104ac90b432bc4f01641b1218"></ad>

    <!--7预报start-->
    <view class='guide' wx:if='{{cityDatas.daily_forecast}}'>
      <view class='title'>7 天预报</view>
      <view class='guides'>
        <view class='item' wx:for='{{cityDatas.daily_forecast}}' wx:key='{{index}}'>
          
          <view class='date i' wx:if='{{index == 0}}'>今天</view>
          <view class='date i' wx:else>{{item.date}}</view>
          <view class='week i'>星期{{item.week}}</view>
          <view class='temperature i'>{{item.tmp_min}}~{{item.tmp_max}}℃</view>
          <view class='weather i'>
            <text>{{item.cond_txt_d}}</text>
            <image mode='widthFix' src='{{weatherIconUrl}}{{item.cond_code_d}}.png'></image>
          </view>
          <view class='wind i'>{{item.wind_dir}}{{item.wind_sc}}级</view>
          <view class='weather i'>
            <image mode='widthFix' src='{{richu}}'></image>
            <text>{{item.sr}}</text>
          </view>
          <view class='weather i'>
          <image mode='widthFix' src='{{riluo}}'></image>
            <text>{{item.ss}}</text>
          </view>
        </view>
      </view>
    </view>
    <!--7预报end-->

    <!--推荐start-->
    <view class='recommend'>
        <view class='tips'>
          提醒朋友注意天气变化，更贴心
        </view>
        <button class='btn' open-type="share">
          <image src='/img/share.png'></image>
          <view>分享给朋友</view>
        </button>
        
    </view>
    <!--推荐end-->

    <!--生活指数-->
    <view class='livingIndex'>
      <view class='item' wx:for='{{cityDatas.lifestyle}}' wx:key='{{index}}'>
        <image class='icon' src='/img/lifestyle_{{item.type}}.png'></image>
        <view class='right'>
          <view class='key'>{{lifestyles[item.type]}} {{item.brf}}</view>
          <view class='value'>{{item.txt}}</view>
        </view>
      </view> 
    </view>
    <ad unit-id="bc51a1b92c097a1b1c24615c4f81db69"></ad>
    <view class='footer'>到底了</view>

    <!--公众号start-->
    <official-account class='offical_font' bindload='officialLoad' binderror='officialerror'></official-account>
    <!--公众号end-->
  </view>
  <!--天气信息 end-->
  
  
  
  <view wx:if='{{openSettingButtonShow}}' class='openSettingButton'>
    <image src='/img/unlock.png'></image>
    <button open-type='openSetting'></button>
  </view>
  <!-- 悬浮菜单 -->
  <view class='menus' wx:if='{{!bcgImgAreaShow}}'>
    <!-- <image src="/img/share_circle.png" animation="{{animationOne}}" class="menu"></image> -->
    <!-- <button plain='true' open-type='share' animation="{{animationOne}}" class='menu share'></button> -->
    <image src="/img/setting.png" animation="{{animationTwo}}" class="menu" catchtap="menuToSetting"></image>
    <image src="/img/location.png" animation="{{animationThree}}" class="menu" catchtap="menuToCitychoose"></image>
    <!-- <image src="/img/info.png" animation="{{animationFour}}" class="menu" catchtap="menuToAbout"></image> -->
    <image src="/img/menu.png" animation="{{animationMain}}" class="menu main" catchtap="menuMain"></image>
  </view>
</view>