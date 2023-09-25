<template>
  <div>
    <div class="dynamic-state" :FollowerVideolist="FollowerVideolist">
      <!-- 动态 -->
      <div class="stateitem" v-for="(item, index) in FollowerVideolist" :key="item.id">
        <div class="top">
          <img :src="`http://43.138.15.137:3000` + item.Video.userAvatar" alt="" />

          <span>@{{ item.Video.userNickname }}</span>
        </div>
        <div class="cont">{{ item.Video.videoDesc }}</div>
        <div class="video">
          <!-- <video style="width: 100%; height: 100%; object-fit: fill"></video> -->
          <video style="width: 100%; height: 100%; object-fit: fill" :src="item.Video.videoPath"></video>
        </div>
        <div class="interaction">
          <!-- <div class="zan" @click="getzan(item)">
            <img v-if="!item.iszanlike" src="../../assets/home/like.png" alt="" />
            <img v-else src="../../assets/home/likered.png" alt="" />
            <span>{{ item.WSLCNum.likeNum }}</span>
          </div> -->
          <!-- 爱心的分装 -->
          <mylove :iszanlike='iszanlike' :item='item'></mylove>
          <div class="pin">
            <img @click="getreview(item)" src="../../assets/home/message.png" alt="" />
            <span>{{ item.WSLCNum.commentNum }}</span>
          </div>
          <div class="fen">
            <img src="../../assets/home/share.png" alt="" />
            <span>{{ item.WSLCNum.shareNum }}</span>
          </div>
        </div>
        <div class="date">
          <span>{{ formatTime(item.Video.createdAt) }}</span>
        </div>
      </div>
    </div>

    <!-- 评论的弹出框 -->
    <commentBbox :isreview="isreview" @getreviews="getreviews" :reviewlist="reviewlist" @getreview="getreview" :reviewval="reviewval" @reviewinp="reviewinp"> </commentBbox>
  </div>
</template>

<script setup>
import mylove from '../../components/comcom/love.vue'
import { formatTime } from '../../utils/formatTime'
// 引入评论弹框组件
import commentBbox from '../../components/comcom/comment-box.vue'
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { getVideoCommentAPI, commentVideoAPI } from '../../api/home.js'
import { getFollowerVideoAPI, getFollowerVideotriggerLikeAPI } from '../../api/attention.js'
import { ref, onMounted, reactive, defineProps } from 'vue'
const props = defineProps({
  FollowerVideolist: Array
})

onMounted(() => {
  // getFollowerVideo()
  let iszanlike = localStorage.getItem('iszanlike')
  // getreview()
})
// // 获取数据
// const FollowerVideolist = ref([])
// const getFollowerVideo = async () => {
//   let res = await getFollowerVideoAPI()
//   console.log(res.data.data)
//   FollowerVideolist.value = res.data.data
//   for (var i = 0; i < FollowerVideolist.value.length; i++) {
//     FollowerVideolist.value[i].iszanlike = false
//   }
// }

// 动态点赞
// const iszanlike = ref(false)
const attvideoId = ref('')
const getzan = async (item) => {
  console.log(item)
  attvideoId.value = item.Video.videoId
  let res = await getFollowerVideotriggerLikeAPI(attvideoId.value)
  console.log(res)
  MessageMainVue({ type: 'success', text: res.data.data })
  if (attvideoId.value == item.Video.videoId) {
    if (res.data.data == '喜欢成功') {
      item.WSLCNum.likeNum++
      item.iszanlike = true
      localStorage.setItem('iszanlike', item.iszanlike)
      console.log(item.WSLCNum.likeNum)
    } else {
      item.WSLCNum.likeNum--
      item.iszanlike = false
      localStorage.setItem('iszanlike', item.iszanlike)
      console.log(item.WSLCNum.likeNum)
    }
  }
}

//评论列表
const isreview = ref(false)
const reviewlist = ref([])
const reviewval = ref('')
const ispllike = ref(true)
const zanvideoId = ref('')
const getreview = async (item) => {
  console.log(item)
  isreview.value = true
  zanvideoId.value = item.Video.videoId
  let res = await getVideoCommentAPI(zanvideoId.value)
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
  // const videoId = localStorage.getItem('videoId')
  let res = await commentVideoAPI({
    fromUserId: userId,
    replyId: '',
    content: reviewval,
    toVideoId: zanvideoId.value
  })
  console.log(res)
  // reviewval.value = ''
  // 重新调用接口
  let ress = await getVideoCommentAPI(zanvideoId.value)
  reviewlist.value = ress.data.data
  MessageMainVue({ type: 'success', text: '我评论啦' })
}
</script>

<style lang="scss" scoped>
@mixin img {
  img {
    vertical-align: top;
    margin-right: 0.1rem;
    width: 0.4rem;
    height: 0.4rem;
  }
}

div {
  background: rgb(30, 30, 30);
  color: white;
}
.dynamic-state {
  padding-bottom: 0.8rem;
  width: 100%;
  color: white;
  .stateitem {
    width: 95%;
    padding-left: 0.3rem;
    padding-bottom: 0.4rem;
    padding-top: 0.4rem;
    .top {
      width: 100%;
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 1rem;
        vertical-align: middle;
      }
      span {
        padding-left: 0.2rem;
        font-size: 0.3rem;
      }
    }
    .cont {
      font-size: 0.28rem;
      margin-top: 0.2rem;
    }
    .video {
      margin-left: 0.2rem;
      margin-top: 0.2rem;
      width: 4rem;
      height: 5rem;
    }
    .interaction {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      height: 1rem;
      .zan {
        @include img;
      }
      .pin {
        @include img;
      }
      .fen {
        @include img;
      }
    }
    .date {
      font-size: 0.24rem;
      color: #d2d2d2;
    }
  }
}
</style>
