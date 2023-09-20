<template>
  <div>
    <div class="bg">
      <img src="/src/assets/wallpaper1668603987563.jpg" alt="" />
      <img src="/src/assets/my/more.png" alt="" />
    </div>
    <div class="avatar">
      <img src="/src/assets/c75ae7128274356b4033ab6464338b67.jpg" alt="" />
    </div>
    <div class="my-message">
      <div class="ddd"></div>
      <div class="message">
        <span>不是白雪</span>
        <span>抖音号:15665432456876543</span>
      </div>
      <div class="signature">
        <span>树叶开始掉落了</span>
        <div class="female"><img src="/src/assets/my/female.png" alt="" /> 12</div>
        <div class="zan"><span>22获赞</span><span>22关注</span><span>22粉丝</span></div>
      </div>
    </div>
    <div class="warp">
      <div class="tab">
        <router-link class="active" to="/my/video">作品1</router-link>
        <router-link to="/my/videoAndDesc">动态1</router-link>
        <router-link to="/my/likes">喜欢1</router-link>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import tabbar from '../../components/comcom/tabbar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 3rem;
  position: relative;
}
.bg :nth-child(1) {
  width: 100%;
  height: 3rem;
}
.bg :nth-child(2) {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
}
.avatar {
  position: absolute;
  top: 2.8rem;
  left: 0.3rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: rgb(29, 29, 29);
  img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50px;
  }
}
.my-message {
  width: 100%;
  .ddd {
    height: 1.8rem;
  }
  .message {
    display: flex;
    flex-direction: column;
    margin-left: 0.4rem;
  }
  .message :nth-child(2) {
    font-size: 14px;
  }
  .signature {
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    margin-left: 0.3rem;
    color: rgb(164, 164, 164);
    font-size: 14px;
    .female {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 0.4rem;
      margin-top: 0.1rem;
      margin-bottom: 0.1rem;
      border-radius: 0.1rem;
      background: rgba(65, 65, 65, 0.722);
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .zan {
      width: 60%;
      font-size: 16px;
      display: flex;
      color: rgb(226, 226, 226);
      justify-content: space-between;
    }
  }
}
.warp {
  .tab {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 40px;
    position: sticky; /*兼容*/
    top: 0;
    left: 0;
    z-index: 99;
    span {
      width: 33%;
      height: 30px;
      text-align: center;
      color: rgb(192, 192, 192);
      font-size: 18px;
    }
  }

  .router-link-active router-link-exact-active {
    color: rgb(203, 203, 203);
  }
  .router-link-exact-active {
    color: rgb(255, 255, 255);
    border-bottom: 2px solid rgb(255, 247, 0);
  }
  a {
    color: rgb(157, 157, 157);
  }
}
</style>
