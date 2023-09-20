<template>
  <div>
    <div class="search">
      <img @click="tohome" src="/src/assets/home/jiantou.png" alt="" />
      <input v-model="videoval" @keydown.enter="serachinp" type="text" placeholder="输入关键词进行搜索(视频描述)" />
      <img class="search-img" src="/src/assets/home/search.png" alt="" />
    </div>
    <div class="tab">
      <div>视频</div>
      <div @click="toesarchuser">用户</div>
    </div>
  </div>
</template>

<script setup>
import { searchVideoAPI, searchUserAPI } from '../../api/home.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toesarchuser = () => {
  router.push('/search/user')
}
const tohome = () => {
  router.push('/home')
}

const videoval = ref('')
const serachinp = async () => {
  let res = await searchVideoAPI({
    key: videoval.value
  })
  console.log(res.data.data)
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 0.8rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  img {
    width: 0.4rem;
    height: 0.4rem;
  }
  input {
    padding-left: 0.6rem;
    width: 70%;
    height: 90%;
    border: none;
    color: white;
    background: rgb(27, 27, 27);
  }
  .search-img {
    position: absolute;
    top: 0.2rem;
    left: 1.4rem;
  }
}
.tab {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    width: 49%;
    height: 0.8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.tab :nth-child(1) {
  border-bottom: 2px solid rgb(240, 212, 2);
}
</style>
