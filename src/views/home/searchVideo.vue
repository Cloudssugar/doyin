<template>
  <div>
    <div class="search">
      <img @click="tohome" src="/src/assets/home/jiantou.png" alt="" />
      <input v-focus v-model="videoval" @input="serachinp" type="text" placeholder="输入关键词进行搜索(视频描述)" />
      <img class="search-img" src="/src/assets/home/search.png" alt="" />
    </div>
    <div class="tab">
      <div>视频</div>
      <div @click="toesarchuser">用户</div>
    </div>
    <!-- 视频 -->
    <div class="videolist">
      <div class="videoiten" v-for="(item, index) in videolist" :key="item.id">
        <!-- <video style="width: 100%; height: 100%; object-fit: fill" :src="item.Video.videoPath"></video> -->
        <img style="width: 100%; height: 100%" :src="item.Video.videoCover" alt="" />
        <div class="contnet">
          <p>{{ item.Video.videoDesc }}</p>
        </div>
        <div class="cont">
          <img class="img1" :src="`http://43.138.15.137:3000` + item.Video.userAvatar" alt="" />
          <div>{{ item.Video.userNickname }}</div>
          <img class="img2" src="../../assets/message/love.png" alt="" />
          <span>{{ item.WSLCNum.likeNum }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Debounce } from '../../utils/debounce.js'
import { searchVideoAPI, searchUserAPI } from '../../api/home.js'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toesarchuser = () => {
  router.push('/search/user')
}
const tohome = () => {
  router.push('/home')
}

const videoval = ref('')
const videolist = ref([])
// 搜索
// 调用防抖的函数
const serachinp = Debounce(async (e) => {
  let res = await searchVideoAPI({
    key: videoval.value
  })
  console.log(res.data.data)
  videolist.value = res.data.data
}, 1000)
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
.videolist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  .videoiten {
    position: relative;

    padding-bottom: 5px;
    width: 49%;
    height: 4.4rem;
    .contnet {
      padding: 0;
      position: absolute;
      top: 2.8rem;
      left: 0.1rem;
      line-height: 15px;
      background: rgba(39, 39, 39, 0);
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      p {
        color: rgb(240, 240, 240);
      }
    }
    .cont {
      position: absolute;
      top: 3.8rem;
      left: 0.1rem;
      display: flex;
      align-items: center;
      width: 100%;
      height: 0.4rem;
      text-align: center;
      background: rgba(39, 39, 39, 0);
      .img1 {
        width: 0.4rem;
        height: 0.4rem;
        padding-right: 7px;
      }
      .img2 {
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 6px;
        right: 25px;
      }
      span {
        position: absolute;
        top: 0px;
        right: 10px;
      }
    }
  }
}
</style>
