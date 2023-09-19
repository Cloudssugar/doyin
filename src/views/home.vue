<template>
  <div>
    <div class="box" v-for="(item, index) in videolist" :key="item.id">
      <div class="top">
        <img src="../assets/home/search.png" alt="" />
      </div>
      <div class="middle">
        <!-- <video cless="video" :src="item.Video.videoPath"  style="width: 100%; height: 100%; object-fit: fill" autoplay muted></video> -->
      </div>
      <div class="bottom">
        <div class="content">
          <div>北京市</div>
          <div>@{{ item.Video.userNickname }}</div>
          <div>{{ item.Video.videoDesc }}</div>
        </div>
      </div>
      <div class="avatar">
        <img :src="`http://43.138.15.137:3000` + item.Video.userAvatar" alt="" />
      </div>
      <div class="icon" @click="getlike(item)">
        <img v-if="!item.isshowlike" src="../assets/home/like.png" alt="" />
        <img v-else src="../assets/home/likered.png" alt="" />
        <span>{{ item.WSLCNum.likeNum }}</span>
      </div>
      <div class="icon2">
        <img src="../assets/home/message.png" alt="" />
        <span>{{ item.WSLCNum.commentNum }}</span>
      </div>
      <div class="icon3">
        <img src="../assets/home/share.png" alt="" />
        <span>{{ item.WSLCNum.shareNum }}</span>
      </div>
    </div>

    <!-- 评论的弹出框 -->
    <div class="review">
    
    </div>

    <!-- <div>home</div> -->
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import tabbar from '../components/comcom/tabbar.vue'
// 引入消息 文件
import MessageMainVue from '../components/js/message.js'
import { getPopularVideoAPI, triggerLikeAPI } from '../api/home.js'
import { onMounted, ref, reactive } from 'vue'
const videolist = reactive([])
onMounted(() => {
  video()
})
const video = async () => {
  let res = await getPopularVideoAPI()
  // console.log(res.data.data);
  res.data.data.forEach((item) => {
    videolist.push(JSON.parse(item))
  })
  // 动态添加 isshowlike
  for (let i = 0; i < videolist.length; i++) {
    videolist[i].isshowlike = false
  }
  console.log(videolist)
}
const islike = ref(true)
const islikered = ref(false)
// 点赞
const getlike = async (item) => {
  console.log(item)
  item.isshowlike = !item.isshowlike
  const videoId = item.Video.videoId
  let res = await triggerLikeAPI(videoId)
  console.log(res)
  MessageMainVue({ type: 'success', text: res.data.data })
  if (videoId == item.Video.videoId) {
    if (res.data.data == '喜欢成功') {
      item.WSLCNum.likeNum++
    } else {
      item.WSLCNum.likeNum--
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  img {
    width: 0.6rem;
    height: 0.6rem;
  }
}
.box {
  border-bottom: 1px solid rgb(93, 93, 93);
  position: relative;
  .top {
    width: 100%;
    height: 3.6rem;
    position: relative;
    img {
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .middle {
    width: 100%;
    height: 4rem;
    background: pink;
  }
  .bottom {
    width: 100%;
    height: 4rem;
    position: relative;
    .content {
      margin-left: 10px;
      margin-top: 40px;
      width: 70%;
      font-size: 15px;
      div {
        margin-top: 10px;
      }
    }
  }
  .avatar {
    position: absolute;
    top: 330px;
    right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
    border: 1px solid rgb(130, 130, 130);
    border-radius: 50%;
    overflow: hidden;
  }
  .icon {
    position: absolute;
    top: 390px;
    right: 20px;
    @include icon();
  }
  .icon2 {
    position: absolute;
    top: 455px;
    right: 20px;
    @include icon();
  }
  .icon3 {
    position: absolute;
    top: 525px;
    right: 20px;
    @include icon();
  }
}
</style>
