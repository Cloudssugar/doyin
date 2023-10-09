<!-- 顶部栏 -->
<div class="tab">
  <img @click="tomessage" src="/src/assets/home/jiantou.png" alt="" />
  <span>我的粉丝</span>
</div>
<div class="ddd"></div>
<!-- 粉丝 -->
<div class="userlist">
  <div class="useritem" v-for="(item, index) in Fanslist" :key="item.id">
    <img  class="userimg"  :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
    <div class="cont">
      <p>{{ item.userNickname }}</p>
      <p>{{ item.userDesc }}</p>
    </div>
    <!-- <div class="guai isfollow" @click="follow(item)" v-show="item.isRead == 1">关注</div> -->
    <div class="guai isfollow" @click="follow(item)" v-show="item.bothStatus == 0">关注</div>
    <div class="guai follow" @click="follow(item)" v-show="item.bothStatus == 1">互相关注</div>
    <!-- <div class="guai isfollow" @click="follow(item)" v-show="item.myRelation == 'fan'">关注</div> -->
  </div>
</div>

 <!-- 顶部栏 -->
    <div class="tab">
      <img @click="tomessage" src="/src/assets/home/jiantou.png" alt="" />
      <span>粉丝</span>
    </div>
    <div class="ddd"></div>
    <!-- 粉丝 -->
    <div class="userlist">
      <div class="useritem" v-for="(item, index) in fansilist" :key="item.id">
        <img class="userimg" :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
        <div class="cont">
          <p>{{ item.userNickname }}</p>
          <p>{{ item.userDesc }}</p>
        </div>
        <div class="guai isfollow" @click="follow(item)" v-show="item.bothStatus == 0">关注</div>
        <div class="guai follow" @click="follow(item)" v-show="item.myRelation == 'follow'">已关注</div>
        <div class="guai follow" @click="follow(item)" v-show="item.bothStatus == 1">互相关注</div>
        
      </div>
    
    </div>