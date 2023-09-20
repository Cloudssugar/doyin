<template>
  <div>
    <div class="search">
      <img @click="tohome" src="/src/assets/home/jiantou.png" alt="" />
      <input @keydown.enter="userinp" v-model="userval" type="text" placeholder="输入关键词进行搜索(用户名称，id)" />
      <img class="search-img" src="/src/assets/home/search.png" alt="" />
    </div>
    <div class="tab">
      <div @click="toesarchvideo">视频</div>
      <div>用户</div>
    </div>
  </div>
</template>

<script setup>
import {searchVideoAPI,searchUserAPI} from '../../api/home.js'
import { useRouter} from 'vue-router'
import {ref} from 'vue'
const router = useRouter()
const toesarchvideo = () => {
  router.push('/search/video')
}
const tohome=()=>{
   router.push('/home')
}
const userval = ref('')
const userinp = async () => {
  let res = await searchUserAPI({
    key: userval.value
  })
  console.log(res.data.data)
}
</script>

<style lang="scss" scoped>
.search{
  width: 100%;
  height: 0.8rem;
 
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  img{
    widows: 0.4rem;
    height:0.4rem;
  }
  input{
     padding-left: 0.6rem;
    width: 70%;
    height: 90%;
    border: none;
     background: rgb(27, 27, 27);
  }
  .search-img{
    position: absolute;
    top: 0.2rem;
    left: 1.4rem;
  }
}
.tab{
  width: 100%;
  height: 1rem;
  display: flex;
   justify-content: space-around;
  align-items: center;
  div{
    width: 49%;
    height: 0.8rem;
    display: flex;
   justify-content: space-around;
  align-items: center;

  }
}
.tab :nth-child(2){
    border-bottom: 2px solid rgb(240, 212, 2);
}
</style>
