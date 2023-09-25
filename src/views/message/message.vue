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
      </div>
      <div class="fensi" @click="tozan">
        <div class="fens love">
          <img src="../../assets/message/love.png" alt="" />
        </div>
        <span>赞</span>
      </div>
      <div class="fensi" @click="toat">
        <div class="fens at">
          <!-- <img src="../../assets/message/fens.png" alt="" /> -->
          @
        </div>
        <span>@</span>
      </div>
      <div class="fensi" @click="toreview">
        <div class="fens message">
          <img src="../../assets/message/message.png" alt="" />
        </div>
        <span>评论</span>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import tabbar from '../../components/comcom/tabbar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const tovermicelli = () => {
  router.push('/vermicelli')
}

const tozan = () => {
  router.push('/zan')
}

const toreview = () => {
  router.push('/review')
}

const toat = () => {
  router.push('/at')
}

const tocontact=()=>{
  router.push('/contact')
}
</script>

<style lang="scss" scoped>
.tab {
  box-sizing: border-box;
  width: 100%;
  height: 0.8rem;
font-size: 17px;
  display: flex;
  align-items: center;
}
.tab :nth-child(1){
  padding-left: 45%;
}
.tab :nth-child(2){
  padding-left: 30%;
}
.message {
  box-sizing: border-box;
  width: 100%;
  height: 1.56rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid beige;
  .fensi {
    text-align: center;
    font-size: 0.28rem;
    width: 0.8rem;
    height: 1.3rem;

    .fens {
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
</style>
