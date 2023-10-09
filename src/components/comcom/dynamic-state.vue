<template>
  <div>
    <div class="weui-pull-refresh" :style="style" id="dynamic-state" @touchstart="keepTouchStartY" @touchmove="keepTouchMoveY" @touchend="keepTouchEndY" ref="dynamicState" :FollowerVideolist="FollowerVideolist">
      <div class="weui-pull-refreshing-box">
        <div v-if="moveState < 2">{{ moveState === 0 ? '下拉即可刷新...' : '释放即可刷新...' }}</div>
        <div v-else><i class="weui-loading" /> 加载中...</div>
      </div>
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
          <div class="zan" @click="getzan(item)">
            <img v-if="!item.iszanlike" src="../../assets/home/like.png" alt="" />
            <img v-else src="../../assets/home/likered.png" alt="" />
            <span>{{ item.WSLCNum.likeNum }}</span>
          </div>
          <!-- 爱心的分装 -->
          <!-- <mylove :iszanlike='iszanlike' :item='item'></mylove> -->
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
      <div class="weui-down-refreshing-box" v-if="durationDown">加载中...</div>
      <!-- <div class="weui-down-refreshing-box" v-show="durationDown">没有数据啦</div> -->
    </div>

    <!-- 评论的弹出框 -->
    <commentBbox :isreview="isreview" @getreviews="getreviews" :reviewlist="reviewlist" @getreview="getreview" :reviewval="reviewval" @reviewinp="reviewinp"> </commentBbox>
  </div>
</template>

<script setup>
import tool from '../../lib/tool.js'
import mylove from '../../components/comcom/love.vue'
import { formatTime } from '../../utils/formatTime'
// 引入评论弹框组件
import commentBbox from '../../components/comcom/comment-box.vue'
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { getVideoCommentAPI, commentVideoAPI } from '../../api/home.js'
import { getFollowerVideoAPI, getFollowerVideotriggerLikeAPI } from '../../api/attention.js'
import { ref, onMounted, reactive, defineProps, onUnmounted, computed, watch, defineEmits, registerRuntimeCompiler } from 'vue'
const props = defineProps({
  FollowerVideolist: Array,
  loadlist: Array
})

onMounted(() => {
  // getFollowerVideo()
  let iszanlike = localStorage.getItem('iszanlike')
  window.addEventListener('scroll', setTimer)
  // getreview()
  // fun()
  // console.log(props.loadlist);
})
const startY = ref(0)
const moveDistance = ref(0)
const moveState = ref(0)
const duration = ref(0)
const valid = ref(true)
const durationDown = ref(false)
const isload = ref(false)
const setTimer = () => {
  if (!valid.value) {
    return false
  } else {
    valid.value = false
    setTimeout(() => {
      getMore()
      valid.value = true
    }, 500)
  }
}
const getMore = () => {
  return tool.getMoreOfScroll(getDataList)
}

// 上拉加载更多数据请求
const emits = defineEmits(['changeFollowerVideo'])
const getDataList = () => {
  // 请求方法
  durationDown.value = true
  emits('changeFollowerVideo', 2, {
    bool: true,
    fn: () => {
      durationDown.value = false
    }
  })
}

const keepTouchStartY = (e) => {
  duration.value = 0
  moveDistance.value = 0
  startY.value = e.targetTouches[0].pageY
}
watch(moveState, (state, oldValue) => {
  if (state === 0 && duration.value === 300) {
    moveDistance.value = 0
  }
})

const keepTouchMoveY = (e) => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //首先判断有没有滚动条，如果有，下拉刷新就不能启用。
  if (scrollTop > 0) return

  let move = e.targetTouches[0].clientY - startY.value
  //判断手指滑动的距离，只有为正数才代表用户下拉了。
  if (move > 0) {
    //阻止默认事件，在微信浏览器中尤为有用。
    e.preventDefault()
    //增加滑动阻力的感觉
    moveDistance.value = Math.pow(move, 0.8)
    if (moveDistance.value > 50) {
      //如果滑动距离大于50 就告诉你，释放即可刷新
      if (moveState.value === 1) return
      moveState.value = 1
    } else {
      //否则 恢复原样
      if (moveState.value === 0) return
      moveState.value = 0
    }
  }
}
const refresh = reactive((done) => {
  setTimeout(() => {
    done()
  }, 500)
})

// const isload = reactive(() => {
//   setTimeout(() => {}, 500)
// })
const style = computed(() => ({
  transition: `${duration.value}ms`,
  transform: `translate3d(0,${moveDistance.value}px, 0)`
}))
const keepTouchEndY = (e) => {
  duration.value = 300
  if (moveDistance.value > 50) {
    moveState.value = 2
    moveDistance.value = 50
    refresh(() => {
      moveState.value = 0
    })
  } else {
    moveDistance.value = 0
  }
}
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

//
const showRefresh = ref(false)
// 节流方法
const throttle = (func, delay) => {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments)
        timer = null
      }, delay)
    }
  }
}

// 触底函数
// const onReachBottom = () => {
//   window.addEventListener('dynamicSstate', handleScroll())
// }
// this.$refs.scrollCont.addEventListener('scroll', this.handleScroll)
const dynamicSstate = ref(null)

const clientHeight = document.documentElement.clientHeight //浏览器⾼度
console.log(clientHeight)
const distance = 50 //距离视窗还有50的时候，开始触发；

const fun = () => {
  let scrollHeight = document.body.scrollHeight // 内容高度
  console.log(scrollHeight)
  let scrollTop = document.documentElement.scrollTop // 滚动高度
  console.log(scrollTop)
  if (scrollTop + clientHeight >= scrollHeight - distance) {
    console.log('开始加载数据')
  }
}

// 添加滚动监听
window.addEventListener('dynamic-state', fun)
console.log(window)
// // 页面卸载清除监听
// onUnmounted(() ={
//   window.removeEventListener('dynamic-state', fun)
// });
</script>

<style lang="scss" scoped>
.weui-down-refreshing-box {
  position: sticky;
  bottom: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.weui-pull-refresh {
  display: flex;
  height: calc(100vh - 100px);

  flex-direction: column;
  margin-top: -50px;
  .weui-pull-refreshing-box {
    line-height: 50px;
    height: 50px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
  }
  .weui-pull-present-box {
    background-color: lighten(#fff, 10%);
  }
}

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
#dynamic-state {
  box-sizing: border-box;
  padding-bottom: 0.8rem;
  width: 100%;
  color: white;
  .show {
    width: 100%;
    height: 0.6rem;
    text-align: center;
    display: block !important;
    background: palevioletred;
  }
  .stateitem {
    box-sizing: border-box;
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
