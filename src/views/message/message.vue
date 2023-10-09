<template>
  <div>
    <div class="tab">
      <span>消息</span>
      <span @click="tocontact">联系人</span>
    </div>
    <div class="message">
      <div class="fensi" @click="tovermicelli">
        <div class="fens">
          <img src="../../assets/message/fens.png" alt="" />
        </div>
        <span>粉丝</span>
        <div class="info-a" v-show="FanUnreadNum !== 0"></div>
      </div>
      <div class="fensi" @click="tozan">
        <div class="fens love">
          <img src="../../assets/message/love.png" alt="" />
        </div>
        <span>赞</span>
        <div class="info-b" v-show="byLikeUnreadNum !== 0"></div>
      </div>
      <div class="fensi" @click="toat">
        <div class="fens at">
          <!-- <img src="../../assets/message/fens.png" alt="" /> -->
          @
        </div>
        <span>@</span>
        <div class="info-c" v-show="AtUnreadNum !== 0"></div>
      </div>
      <div class="fensi" @click="toreview">
        <div class="fens message">
          <img src="../../assets/message/message.png" alt="" />
        </div>
        <span>评论</span>
        <div class="info-d" v-show="byCommentUnreadNum !== 0"></div>
      </div>
    </div>
    <!-- 好友聊天 -->
    <div class="chat" @click="tochat">
      <div class="chat-img">
        <img src="http://43.138.15.137:3000/assets/avatar/92bfd3ac-adfa-42ed-a2c4-623222df5430.png" alt="" />
      </div>
      <div class="chat-content">
        <span>111</span>
        <span>333</span>
      </div>
      <div class="chat-item">刚刚</div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import tabbar from '../../components/comcom/tabbar.vue'
import { getFanUnreadNumAPI, getbyLikeUnreadNumAPI, getAtUnreadNumAPI, getbyCommentUnreadNumAPI } from '../../api/meaasge.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  getFanUnreadNum()
  getbyLikeUnreadNum()
  getAtUnreadNum()
  getbyCommentUnreadNum()
})

// 未读粉丝数量
const FanUnreadNum = ref(0)
const getFanUnreadNum = async () => {
  let res = await getFanUnreadNumAPI()
  console.log(res)
  FanUnreadNum.value = res.data.data
}

// 未读赞数量
const byLikeUnreadNum = ref(0)
const getbyLikeUnreadNum = async () => {
  let res = await getbyLikeUnreadNumAPI()
  console.log(res)
  byLikeUnreadNum.value = res.data.data
}

// at
const AtUnreadNum = ref(0)
const getAtUnreadNum = async () => {
  let res = await getAtUnreadNumAPI()
  console.log(res)
  AtUnreadNum.value = res.data.data
}

// 评论
const byCommentUnreadNum = ref(0)
const getbyCommentUnreadNum = async () => {
  let res = await getbyCommentUnreadNumAPI()
  console.log(res)
  byCommentUnreadNum.value = res.data.data
}

// 粉丝
const tovermicelli = () => {
  router.push('/vermicelli')
}
// 赞
const tozan = () => {
  router.push('/zan')
}
// @at
const toreview = () => {
  router.push('/review')
}
// 评论
const toat = () => {
  router.push('/at')
}
// 联系人
const tocontact = () => {
  router.push('/contact')
}

// 
const tochat=()=>{
  router.push('/chat')
}
</script>

<style lang="scss" scoped>
@mixin infos {
  position: absolute;
  top: 0.9rem;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50px;
  background: orange;
}

.tab {
  box-sizing: border-box;
  width: 100%;
  height: 0.8rem;
  font-size: 17px;
  display: flex;
  align-items: center;
}
.tab :nth-child(1) {
  padding-left: 45%;
}
.tab :nth-child(2) {
  padding-left: 30%;
}
.message {
  box-sizing: border-box;
  width: 100%;
  height: 1.56rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgb(42, 42, 42);
  .fensi {
    text-align: center;
    font-size: 0.28rem;
    width: 0.8rem;
    height: 1.3rem;

    .fens {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.8rem;
      height: 0.8rem;
      background: #4f88fb;
      img {
        width: 0.5rem;
        height: 0.4rem;
      }
    }
    .info-a {
      @include infos;
      left: 1.2rem;
    }
    .info-b {
      @include infos;
      left: 3.1rem;
    }
    .info-c {
      @include infos;
      left: 5rem;
    }
    .info-d {
      @include infos;
      left: 6.9rem;
    }
    .love {
      background: #f8355f;
    }
    .at {
      background: #1cc262;
    }
    .message {
      background: #a451e7;
    }
  }
}
.chat {
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgb(77, 77, 77);
  .chat-img {
    margin-left: 0.2rem;
    width: 1rem;
    height: 1rem;
    img {
      width: 1rem;
      height: 1rem;
    }
  }
  .chat-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 70%;
    height: 1rem;
    color: #d9d9d9;
    font-size: 16px;
  }
  .chat-item {
    color: #d9d9d9;
    font-size: 14px;
  }
}
</style>
