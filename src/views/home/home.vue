<template>
  <div class="home">
    <!-- 搜索按钮 -->
    <div class="search" @click="tosearch">
      <div class="search-o"></div>
      <div class="search-i"></div>
    </div>
    <!-- <img class="search-img" @click="tosearch" src="/src/assets/home/search.png" alt="" /> -->
    <!-- 首页视频 -->
    <div :class="{ animsteClass: flag }" :style="{ transform: `translateY(${y}px)` }">
      <div class="box" v-for="(item, index) in videolist" :key="item.id" @touchstart="start" @touchmove="move" @touchend="end($event, index)">
        <div class="top">
          <!-- 一个空的 -->
          <!-- <img @click="tosearch" src="/src/assets/home/search.png" alt="" /> -->
        </div>
        <!-- 视频盒子 -->
        <div class="middle" @click="changeVideoplay">
          <video autoplay="autoplay" muted cless="video" ref="videos" style="width: 100%; height: 100%; object-fit: fill" loop @click="bofang($event, item.Video.videoId)">
            <source :src="item.Video.videoPath" type="video/mp4" />
            //视频地址
          </video>
          <!-- 暂停按钮 -->
          <img class="kaishi" @click="bofang($event, item.Video.videoId)" v-show="item.videoIsPlay" src="/src/assets/home/kaishi.png" alt="" />
        </div>
        <div class="bottom">
          <div class="content">
            <div><img class="weizhi" src="/src/assets/home/weizhi.png" alt="" /> 北京市</div>
            <div>@{{ item.Video.userNickname }}</div>
            <div>{{ item.Video.videoDesc }}</div>
          </div>
        </div>
        <!-- 用户头像 -->
        <div class="avatar">
          <img :src="`http://43.138.15.137:3000` + item.Video.userAvatar" alt="" />
        </div>
        <!-- 点赞的爱心 -->
        <div class="icon" @click="getlike(item)">
          <img v-if="item.isshowlike == false" src="/src/assets/home/like.png" alt="" />
          <img v-else src="/src/assets/home/likered.png" alt="" />
          <span>{{ item.WSLCNum.likeNum }}</span>
        </div>
        <!-- 评论 -->
        <div class="icon2">
          <img @click="getreview(item)" src="/src/assets/home/message.png" alt="" />
          <span>{{ item.WSLCNum.commentNum }}</span>
        </div>
        <!-- 分享 -->
        <div class="icon3">
          <img src="/src/assets/home/share.png" alt="" />
          <span>{{ item.WSLCNum.shareNum }}</span>
        </div>
      </div>
    </div>
    <!-- 评论的弹出框 -->
    <commentBbox :isreview="isreview" @getreviews="getreviews" :reviewlist="reviewlist" @getreview="getreview" :reviewval="reviewval" @reviewinp="reviewinp"> </commentBbox>
    <!-- <div class="review" v-show="isreview" @touchmove.prevent> -->
    <!-- <div class="box" @touchmove.prevent>
        <div class="review-top">
          <span></span>
          <span>{{ reviewlist.length }}条评论</span>
          <img @click="getreviews" src="/src/assets/home/cross.png" alt="" />
        </div>
        <div class="reviewlist">
          <div class="reviewitem" v-for="(item, index) in reviewlist" :key="item.id">
            <img :src="`http://43.138.15.137:3000` + item.Comment.userAvatar" alt="" />
            <div class="content">
              <span>@{{ item.Comment.userNickname }}</span>
              <span>{{ item.Comment.commentContent }}</span>
              <span>{{ date }}</span>
            </div>
            <div class="like" @click="getpllike(item)">
              <img v-if="!item.ispllike" src="/src/assets/home/like.png" alt="" />
              <img v-else src="/src/assets/home/likered.png" alt="" />

              <span>{{ item.likeNum }}</span>
            </div> -->

    <!-- <div class="publish">
              <input v-model="reviewval" @keydown.enter="reviewinp" type="text" placeholder="多一次评论，多一份理解" />
              <div>
                <span>@</span>
                <img src="/src/assets/home/tick.png" alt="" />
              </div>
            </div>
          </div>
        </div> -->
    <!-- </div> -->
    <!-- </div> -->

    <tabbar></tabbar>
  </div>
</template>

<script setup>
// 引入评论弹框组件
import commentBbox from '../../components/comcom/comment-box.vue'
//
import tabbar from '../../components/comcom/tabbar.vue'
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { getPopularVideoAPI, triggerLikeAPI, getVideoCommentAPI, commentVideoAPI, triggerLikeCommentAPI } from '../../api/home.js'
import { onMounted, ref, reactive, renderList, computed, defineComponent, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const videolist = reactive([])
//
onMounted(() => {
  video()
})

// 获取视频
const video = async () => {
  let res = await getPopularVideoAPI()
  res.data.data.forEach((item) => {
    videolist.push(JSON.parse(item))
  })
  // 动态添加 isshowlike
  for (let i = 0; i < videolist.length; i++) {
    videolist[i].isshowlike = false
    videolist[i].muted = false
    videolist[i].videoIsPlay = false
  }
  console.log(videolist, 'videolist')
  // console.log(videolist.slice(0, 1))
}

// //

// 点赞
const getlike = async (item) => {
  item.isshowlike = !item.isshowlike
  const videoId = item.Video.videoId
  let res = await triggerLikeAPI(videoId)
  MessageMainVue({ type: 'success', text: res.data.data })
  if (videoId == item.Video.videoId) {
    if (res.data.data == '喜欢成功') {
      item.WSLCNum.likeNum++
    } else {
      item.WSLCNum.likeNum--
    }
    if (res.data.data == '取消喜欢成功') {
      MessageMainVue({ type: 'success', text: '取消喜欢成功' })
    }
  }
}

//  const box=ref(null)
//  console.log(box);
// 视频的上下滑动
// 获取到屏幕的高度
let clientY = document.body.clientHeight || document.documentElement.clientHeight
// 用来控制向上移动的距离
let y = ref(0)
const startY = ref()
const startMoveY = ref()
const flag = ref(false)
const videos = ref(null)
console.log(videos)

const start = (e) => {
  console.log(y)
  // 判断手指在页面的位置
  // e.touches  获取当前手指在页面位置
  startY.value = e.touches[0].pageY
  // 已经移动多少
  startMoveY.value = y.value
  flag.value = false
}
const move = (e) => {
  // 移动的距离
  const moveY = e.touches[0].pageY - startY.value
  y.value = moveY + startMoveY.value
}
const end = (e, index) => {
  // 松手时 移动的距离
  let endY = e.changedTouches[0].pageY - startY.value
  console.log(endY, clientY / 4)
  // 判断滑动的距离是不是屏幕的4/1
  if (Math.abs(endY) < clientY / 4) {
    y.value = startMoveY.value
  } else {
    videolist.forEach((item) => (item.videoIsPlay = false))
    if (endY < 0) {
      // 下一屏
      if (videolist[index + 1]) {
        y.value = startMoveY.value - clientY
        videos.value[index].pause()
        videos.value[index + 1].play()
      } else {
        y.value = startMoveY.value
        // 没有了
      }
    } else {
      // 上一屏
      if (videolist[index - 1]) {
        y.value = startMoveY.value + clientY
        videos.value[index].pause()
        videos.value[index - 1].play()
        // videoIsPlay.value = false
      } else {
        y.value = startMoveY.value
        // 没有了
      }
    }
  }
  flag.value = true
}

// 视频开始暂停
const bofang = (e, id) => {
  const reslutObj = videolist.find((item) => item.Video.videoId === id)
  reslutObj.videoIsPlay = !reslutObj.videoIsPlay
  !reslutObj.videoIsPlay ? e.target.play() : e.target.pause()
}

//评论列表
const isreview = ref(false)
const reviewlist = ref([])
const reviewval = ref('')
const ispllike = ref(true)
const plvideoId = ref('')
const getreview = async (item) => {
  console.log(item)
  isreview.value = true
  plvideoId.value = item.Video.videoId
  let res = await getVideoCommentAPI(plvideoId.value)
  console.log(res)
  reviewlist.value = res.data.data
  for (let i = 0; i < reviewlist.value.length; i++) {
    reviewlist.value[i].ispllike = false
  }
}

// 关闭弹框
const getreviews = () => {
  isreview.value = !isreview.value
}

// 发表评论
const reviewinp = async (reviewval) => {
  const userId = localStorage.getItem('userId')
  let res = await commentVideoAPI({
    fromUserId: userId,
    replyId: '',
    content: reviewval,
    toVideoId: plvideoId.value
  })
  console.log(res)
  // reviewval.value = ''
  // 重新调用接口
  let ress = await getVideoCommentAPI(plvideoId.value)
  console.log(ress)
  // getreview()
  reviewlist.value = ress.data.data
  MessageMainVue({ type: 'success', text: '我评论啦' })
}

// // 评论里边的点赞
// const videoId = ref('')
// const commentId = ref('')
// const getpllike = async (item) => {
//   console.log(item)
//   item.ispllike = !item.ispllike
//   commentId.value = item.Comment.commentId
//   videoId.value = item.Comment.videoId
//   let res = await triggerLikeCommentAPI({
//     videoId: videoId.value,
//     commentId: commentId.value
//   })
//   console.log(res)
//   MessageMainVue({ type: 'success', text: res.data.data })
//   if (commentId.value == item.Comment.commentId) {
//     if (res.data.data == '喜欢评论成功') {
//       item.likeNum++
//     } else {
//       item.likeNum--
//     }
//   }
// }

// 搜索
const tosearch = () => {
  router.push('/search/video')
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
/* 隐藏video 全屏按钮 */
video::-webkit-media-controls-fullscreen-button {
  display: none;
}
/* 隐藏video 播放按钮 */

/* 隐藏video 进度条 */
video::-webkit-media-controls-timeline {
  display: none;
}
/* 隐藏video 观看的当前时间 */
video::-webkit-media-controls-current-time-display {
  display: none;
}
/* 隐藏video 剩余时间 */
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
/* 隐藏video 音量按钮 */
video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
}
/* 隐藏video 音量的控制条 */
video::-webkit-media-controls-volume-slider {
  display: none;
}

.home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.search {
  z-index: 10;
  position: fixed;
  top: 0.4rem;
  right: 0.4rem;

  width: 0.6rem;
  height: 0.6rem;
  .search-o {
    width: 0.3rem;
    height: 0.3rem;
    border: 0.04rem solid white;
    border-radius: 50px;
  }
  .search-i {
    position: fixed;
    top: 0.67rem;
    right: 0.65rem;
    width: 0.001rem;
    height: 0.1rem;
    background: white;
    border: 0.025rem solid white;
    // 旋转
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

.animsteClass {
  transition: transform 0.6s;
}
.box {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(93, 93, 93);
  position: relative;
  width: 100%;
  height: 100vh;
  .review-top {
    position: fixed;
    left: 0;
    top: 190px;
    border-bottom: 0.01rem solid rgb(51, 51, 51);
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: black;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .top {
    width: 100%;
    height: 3.8rem;
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

    img {
      position: absolute;
      top: 40%;
      right: 40%;

      width: 1rem;
      height: 1rem;
    }
  }
  .bottom {
    width: 100%;
    height: 4rem;

    .content {
      margin-left: 0.4rem;
      margin-top: 0.6rem;
      width: 70%;
      font-size: 0.3rem;

      div {
        margin-top: 0.2rem;
      }
    }
    .content :nth-child(1) {
      width: 40%;
      height: 0.6rem;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(79, 79, 79, 0.678);
      img {
        width: 0.4rem;
        height: 0.4rem;
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
    top: 400px;
    right: 20px;
    @include icon();
  }
  .icon2 {
    position: absolute;
    top: 470px;
    right: 20px;
    @include icon();
  }
  .icon3 {
    position: absolute;
    top: 540px;
    right: 20px;
    @include icon();
  }
}

.review {
  overflow: scroll;
  z-index: 999;
  width: 100%;
  height: 70%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: black;
}

.reviewlist {
  width: 100%;
  overflow-y: auto;
  overflow: hidden;

  .reviewitem {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.2rem;
    border-bottom: 0.01rem solid rgb(51, 51, 51);
    img {
      border-radius: 50px;
      width: 0.8rem;
      height: 0.8rem;
      margin-left: 0.4rem;
    }
    .content {
      margin-left: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 60%;
      font-size: 15px;
    }
    .like {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      span {
        margin-left: 0.4rem;
        text-align: center;
      }
    }
  }
}

.publish {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 0.7rem;
  background: rgb(41, 41, 41);
  input {
    padding-left: 0.4rem;
    background: rgb(41, 41, 41);
    color: white;
    width: 70%;
    height: 96%;
    border: none;
  }
  div {
    width: 23%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
}
</style>
