<template>
  <div>
    <div class="box" v-for="(item, index) in videolist" :key="item.id">
      <div class="top">
        <img @click="tosearch" src="/src/assets/home/search.png" alt="" />
      </div>
      <div class="middle" @click="Pause">
        <!-- <video cless="video"   @click="playClick"  :src="item.Video.videoPath"  style="width: 100%; height: 100%; object-fit: fill" autoplay muted loop="loop"  v-show="!ifImg"> </video> -->
        <!-- <img class="zanting"  src="/src/assets/home/zanting.png" alt="" /> -->
        <img class="kaishi" v-show="iskaishi" src="/src/assets/home/kaishi.png" alt="" />
      </div>
      <div class="bottom">
        <div class="content">
          <div><img class="weizhi" src="/src/assets/home/weizhi.png" alt="" /> 北京市</div>
          <div>@{{ item.Video.userNickname }}</div>
          <div>{{ item.Video.videoDesc }}</div>
        </div>
      </div>
      <div class="avatar">
        <img :src="`http://43.138.15.137:3000` + item.Video.userAvatar" alt="" />
      </div>
      <div class="icon" @click="getlike(item)">
        <img v-if="!item.isshowlike" src="/src/assets/home/like.png" alt="" />
        <img v-else src="/src/assets/home/likered.png" alt="" />
        <span>{{ item.WSLCNum.likeNum }}</span>
      </div>
      <div class="icon2">
        <img @click="getreview(item)" src="/src/assets/home/message.png" alt="" />
        <span>{{ item.WSLCNum.commentNum }}</span>
      </div>
      <div class="icon3">
        <img src="/src/assets/home/share.png" alt="" />
        <span>{{ item.WSLCNum.shareNum }}</span>
      </div>
    </div>

    <!-- 评论的弹出框 -->
    <div class="review" v-show="isreview" @touchmove.prevent>
      <div class="box" @touchmove.prevent>
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
            </div>

            <!-- 发表评论的input -->
            <div class="publish">
              <input v-model="reviewval" @keydown.enter="reviewinp" type="text" placeholder="多一次评论，多一份理解" />
              <div>
                <span>@</span>
                <img src="/src/assets/home/tick.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>home</div> -->
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import tabbar from '../../components/comcom/tabbar.vue'
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { getPopularVideoAPI, triggerLikeAPI, getVideoCommentAPI, commentVideoAPI, triggerLikeCommentAPI } from '../../api/home.js'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const videolist = reactive([])
onMounted(() => {
  video()
  updateTime()
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
  }
  console.log(videolist)
}

// //
const islike = ref(true)
const islikered = ref(false)
// 点赞
const getlike = async (item) => {
  item.isshowlike = !item.isshowlike
  const videoId = item.Video.videoId
  localStorage.setItem('videoId', item.Video.videoId)
  let res = await triggerLikeAPI(videoId)
  MessageMainVue({ type: 'success', text: res.data.data })
  if (videoId == item.Video.videoId) {
    if (res.data.data == '喜欢成功') {
      item.WSLCNum.likeNum++
    } else {
      item.WSLCNum.likeNum--
    }
  }
}

// 视频开始暂停
const iskaishi = ref(false)
// const iszanting=ref(false)
const Pause = () => {
  iskaishi.value = !iskaishi.value
}

//评论列表
const isreview = ref(false)
const reviewlist = ref([])
const reviewval = ref('')
const ispllike = ref(true)
const getreview = async (item) => {
  console.log(item)
  isreview.value = true
  const videoId = localStorage.getItem('videoId')
  let res = await getVideoCommentAPI(videoId)
  console.log(res);
  reviewlist.value = res.data.data
    for (let i = 0; i <  reviewlist.value.length; i++) {
    reviewlist.value[i].ispllike = false
  }
}

const getreviews = () => {
  isreview.value = !isreview.value
}

// 发表评论
const reviewinp = async () => {
  const userId = localStorage.getItem('userId')
  const videoId = localStorage.getItem('videoId')
  let res = await commentVideoAPI({
    fromUserId: userId,
    replyId: '',
    content: reviewval.value,
    toVideoId: videoId
  })
  console.log(res)
  reviewval.value = ''
  getreview(videoId)
  MessageMainVue({ type: 'success', text: '我评论啦' })
}

// 评论时间
const date = ref('')
//格式化时间的函数  。它接受一个数字类型的参数 time，表示需要格式化的时间。
//如果 time 小于10，则返回一个带有前导零的字符串表示；
//否则，将 time 转换为字符串后返回。
function formatTime(time) {
  return time < 10 ? `0${time}` : time
}
function updateTime() {
  const now = new Date()
  const year = now.getFullYear() //年
  const month = now.getMonth() + 1 //月
  const day = now.getDate() //日
  const hours = now.getHours() //小时数
  // const minutes = now.getMinutes()  //分钟数
  // const seconds = now.getSeconds()  //秒数
  // const week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][now.getDay()]  //星期
  //想展示什么  对应的展示即可
  date.value = `${year}-${formatTime(month)}-${formatTime(day)} `
}
// 评论里边的点赞
const videoId = ref('')
const commentId = ref('')
const getpllike = async (item) => {
  console.log(item)
    item.ispllike = !item.ispllike
  commentId.value = item.Comment.commentId
  videoId.value = item.Comment.videoId
  let res = await triggerLikeCommentAPI({
    videoId: videoId.value,
    commentId: commentId.value
  })
  console.log(res)
  MessageMainVue({ type: 'success', text: res.data.data })
  if (commentId.value == item.Comment.commentId) {
    if (res.data.data == '喜欢评论成功') {
      item.likeNum++
    
    } else {
      item.likeNum--
     
    }
  }
}

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
.box {
  border-bottom: 1px solid rgb(93, 93, 93);
  position: relative;
  .top {
    width: 100%;
    height: 3.8rem;
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
    position: relative;
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
    position: relative;
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
.box {
  width: 100%;

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
