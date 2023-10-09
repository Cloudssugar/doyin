<template>
  <div>
    <div class="tabbat">
      <router-link to="/home">首页</router-link>
      <router-link to="/attention">关注</router-link>
      <router-link class="shool" to="/shoot">
        <img src="/src/assets/home/jia.png" alt="" />
      </router-link>
      <router-link to="/message">消息</router-link>
      <router-link to="/my/video">我</router-link>
      <div class="info" ></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.tabbat {
  border-top: 1px solid rgb(172, 172, 172);
  z-index: 99;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: black;
  color: rgb(255, 255, 255);
  font-size: 16px;
  .shool {
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 40px;
    background: white;
    border-radius: 10px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}

.ac {
  color: white;
}
.router-link-active router-link-exact-active {
  color: rgb(203, 203, 203);
}
.router-link-exact-active {
  color: rgb(255, 255, 255);
}
a {
  color: rgb(157, 157, 157);
}
.info {
  position: absolute;
  top: 0.2rem;
  left: 76%;
  width: 0.2rem;
  height: 0.2rem;
  background: orange;
  display: block;
  margin-left: 0.1rem;
  border-radius: 50px;
}
</style>
