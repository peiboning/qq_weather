<view class='container'>
  <view class='pm' wx:if="{{showInfo == 1}}">
    <view class='title'>什么是PM2.5？</view>
    <view class='divLine'></view>
    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;很多时候，真的分不清是雾？是霾？还是PM2.5?</text>
    </view>
    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;雾和霾，本来就没关系。</text>
    </view>
    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;那是什么原因让霾和雾 “本来是匆匆而过，却要藕断丝连”？下面从雾和霾出身说起</text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;雾，是一种自然现象，是大量微细水滴或冰晶的可见集合体。</text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;霾，身份比较复杂，一部分来自人类活动，如烧煤烧炭、汽车尾气、建筑扬尘等；一部分来自大自然，例如自然火灾、火山爆发等。</text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;主要有以下几点差异：</text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;1、相对湿度不同。雾是湿的，霾是干的；一个是“水货”，一个是“干货”。雾的相对湿度大于90%，霾的相对湿度小于80％,相对湿度介于80-90%是霾和雾的混合物，但其主要成分是霾。   </text>
    </view>

    

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;2、能见度不一样。雾的水平能见度小于1公里，霾的水平能见度小于10公里。</text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;3、厚度不同。雾的厚度只有几十米至200米左右，霾的厚度可达1－3公里左右。  </text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;4、颜色不同。雾的颜色是乳白色、青白色；霾则是黄色、橙灰色。</text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;尽管有以上区别，但出现灰蒙蒙的天气时，我们还是很难严格区分哪是雾，哪是霾。因为往往会发生雾、霾交替或雾、霾混杂的天气，并且在一天中，雾和霾有时还会“角色互换”，相互转化。</text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;最后，跟大家说说PM2.5吧。PM2.5只是构成霾的主要“原材料”之一，直径小于等于 2.5 微米的颗粒物。</text>
    </view>

    <view class='content_p'>
      <text decode='{{true}}'>&nbsp;&nbsp;PM2.5粒径小，活性强，易附带有毒、有害物质，被吸入人体后可以直接进入支气管，干扰肺部的气体交换，可能引发哮喘、支气管炎和心血管病等疾病。</text>
    </view>
  </view>

  <view class='pm' wx:if="{{showInfo == 2}}">
    <view class='title'>雨雪等级判断标准</view>
    <view class='divLine'></view>
    <view class='table_snow_title'>雨的判断标准：一天内的降雨量</view>
    <view class='table_snow'>
      <view class='detail'>0~10毫米</view><view class='detail'>小雨</view>
      <view class='detail'>10~25毫米</view><view class='detail'>中雨</view>
      <view class='detail'>25~50毫米</view><view class='detail'>大雨</view>
      <view class='detail'>50~75毫米</view><view class='detail'>暴雨</view>
      <view class='detail'>75~250毫米</view><view class='detail'>大暴雨</view>
      <view class='detail'>>250毫米</view><view class='detail'>特大暴雨</view>
    </view>

    <view class='table_snow_title'>雪的判断标准1：一天内的降雪融化后的雨水量</view>
    <view class='table_snow'>
      <view class='detail'>0~2.5毫米</view><view class='detail'>小雪</view>
      <view class='detail'>2.5~5毫米</view><view class='detail'>中雪</view>
      <view class='detail'>5~10毫米</view><view class='detail'>大雪</view>
      <view class='detail'>>10毫米</view><view class='detail'>暴雪</view>
    </view>

    <view class='table_snow_title'>雪的判断标准2：一天内的积雪深度</view>
    <view class='table_snow'>
      <view class='detail'>0~30毫米</view><view class='detail'>小雪</view>
      <view class='detail'>30~50毫米</view><view class='detail'>中雪</view>
      <view class='detail'>50~80毫米</view><view class='detail'>大雪</view>
      <view class='detail'>>80毫米</view><view class='detail'>暴雪</view>
    </view>
  </view>

  <view class='pm' wx:if="{{showInfo == 3}}">
    <view class='title'>风力等级判断标准</view>
    <view class='divLine'></view>
    <view class='table_wind'>
      <view class='head'>风级</view><view class='head'>名称</view><view class='head'>风速(公里/小时)</view><view class='head'>地面现象</view>
      <view class='detail'>0</view><view class='detail'>无风</view><view class='detail'> 小于1 </view><view class='detail'>烟直上</view>
      <view class='detail'>1</view><view class='detail'>软风</view><view class='detail'>1~5</view><view class='detail'>烟示风向</view>
      <view class='detail'>2</view><view class='detail'>轻风</view><view class='detail'>6~11</view><view class='detail'>感觉有风</view>
      <view class='detail'>3</view><view class='detail'>微风</view><view class='detail'>12~19</view><view class='detail'>红旗展开</view>
      <view class='detail'>4</view><view class='detail'>和风</view><view class='detail'>20~28</view><view class='detail'>吹起尘土</view>
      <view class='detail'>5</view><view class='detail'>劲风</view><view class='detail'>29~38</view><view class='detail'>小数摇摆</view>
      <view class='detail'>6</view><view class='detail'>强风</view><view class='detail'>39~49</view><view class='detail'>电线有声</view>
      <view class='detail'>7</view><view class='detail'>疾风</view><view class='detail'>50~61</view><view class='detail'>步行困难</view>
      <view class='detail'>8</view><view class='detail'>大风</view><view class='detail'>62~74</view><view class='detail'>折毁树枝</view>
      <view class='detail'>9</view><view class='detail'>烈风</view><view class='detail'>75~88</view><view class='detail'>小损房屋</view>
      <view class='detail'>10</view><view class='detail'>狂风</view><view class='detail'>89~102</view><view class='detail'>拔起树木</view>
      <view class='detail'>11</view><view class='detail'>暴风</view><view class='detail'>103~117</view><view class='detail'>损毁重大</view>
      <view class='detail'>12</view><view class='detail'>飓风</view><view class='detail'>118~133</view><view class='detail'>摧毁极大</view>
      <view class='detail'>13</view><view class='detail'>--</view><view class='detail'>134~149</view><view class='detail'>--</view>
      <view class='detail'>14</view><view class='detail'>--</view><view class='detail'>150~166</view><view class='detail'>--</view>
      <view class='detail'>15</view><view class='detail'>--</view><view class='detail'>167~183</view><view class='detail'>--</view>
      <view class='detail'>16</view><view class='detail'>--</view><view class='detail'>184~201</view><view class='detail'>--</view>
      <view class='detail'>17</view><view class='detail'>--</view><view class='detail'>202~220</view><view class='detail'>--</view>
      <view class='detail'>17级以上</view><view class='detail'>--</view><view class='detail'>>221</view><view class='detail'>--</view>

    </view>
  </view>

  <!--推荐start-->
  <view class='divLine'></view>
  <view class='recommend'>
      <view class='tips'>
        分享给朋友，让朋友一起了解天气知识
      </view>
      <button class='btn' open-type="share">
        <image src='/img/share.png'></image>
        <view>分享给朋友</view>
      </button>  
  </view>
    <!--推荐end-->
</view>