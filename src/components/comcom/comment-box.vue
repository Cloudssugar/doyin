<template>
  <div>
    <!-- 评论的弹出框 -->
    <transition name="slide">
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
            </div>
            <div class="nopl">没有更多评论啦····</div>
            <!-- 发表评论的input -->
            <div class="publish">
              <input v-focus v-model="reviewval" @keydown.enter="reviewinp" type="text" placeholder="多一次评论，多一份理解" />
              <div>
                <span>@</span>
                <img src="/src/assets/home/tick.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { reactive, ref, defineProps, defineEmits, toRefs, onMounted } from 'vue'
import { triggerLikeCommentAPI } from '../../api/home.js'
//此处必须用toRefs，否则将失去响应式
const { reviewlist } = toRefs(props)
const reviewval = ref('')
const props = defineProps({
  isreview: Boolean,
  reviewlist: Array
})
console.log(props.reviewlist.value)

const emit = defineEmits(['getreviews', 'reviewinp'])
// 关闭模态框
let getreviews = () => {
  emit('getreviews', true)
}
onMounted(() => {
  updateTime()
})
//  发布评论
const reviewinp = () => {
  emit('reviewinp', reviewval.value)
  reviewval.value = ''
  console.log(reviewval.value, '111')
}

// 评论时间
const date = ref('')
function formatTime(time) {
  return time < 10 ? `0${time}` : time
}
function updateTime() {
  const now = new Date()
  const year = now.getFullYear() //年
  const month = now.getMonth() + 1 //月
  const day = now.getDate() //日
  const hours = now.getHours() //小时数
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
</script>

<style lang="scss" scoped>
.openActive {
  bottom: 0px !important;
}
.review {
  overflow: scroll;
  z-index: 999;
  width: 100%;
  height: 70%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgb(27, 27, 27);
  color: rgb(194, 194, 194);
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

  background: rgb(27, 27, 27);
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
      font-size: 14px;
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
  .nopl{
    margin-top: 0.2rem;
    font-size: 14px;
  text-align: center;
  height: 1.2rem;
}
}

.publish {
  z-index: 99;
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



.slide-enter-active {
  animation-name: slideInUp;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.slide-leave-active {
  animation-name: slideOutDown;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
@keyframes slideInUp {
  0% {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translateZ(0);
  }
}
@keyframes slideOutDown {
  0% {
    transform: translateZ(0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}

</style>
