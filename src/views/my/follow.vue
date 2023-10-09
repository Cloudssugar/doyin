<template>
  <div class="box">
    <!-- 顶部栏 -->
    <div class="tab">
      <img @click="tomessage" src="/src/assets/home/jiantou.png" alt="" />
      <span>我的关注</span>
    </div>
    <div class="ddd"></div>
    <!-- 粉丝 -->
    <div class="userlist">
      <div class="useritem" v-for="(item, index) in Followerslist" :key="item.id">
        <!-- {{ item }} -->
        <img :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
        <div class="cont">
          <p>{{ item.userNickname }}</p>
          <p>{{ item.userDesc }}</p>
        </div>
        <!-- <div class="guai isfollow" @click="follow(item)" v-show="item.isRead !== 0">关注</div> -->
        <div class="guai follow" @click="follow(item)" v-show="item.bothStatus == 0">已关注</div>
        <div class="guai follow" @click="follow(item)" v-show="item.bothStatus == 1">互相关注</div>
        <!-- <div class="guai isfollow" @click="follow(item)" v-show="item.myRelation == 'fan'">关注</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { Debounce } from '../../utils/debounce.js'
import { getFollowersAPI} from '../../api/my'
import {  gettriggerFollowAPI } from '../../api/meaasge.js'

import { useRouter } from 'vue-router'
import { ref, computed, onMounted, reactive } from 'vue'
const router = useRouter()
onMounted(() => {
  getFollowers()
})

const Followerslist = ref([])
const getFollowers = async () => {
  let res = await getFollowersAPI()
  console.log(res)
  Followerslist.value = res.data.data
}

// 关注
const follow = async (item) => {
  console.log(item.userId)
  const userId = item.userId
  let res = await gettriggerFollowAPI(userId)
  console.log(res)
  //  getFollowers()
  if (item.bothStatus == 1) {
    MessageMainVue({ type: 'success', text: res.data.data })
  } else if (item.bothStatus == 0) {
    MessageMainVue({ type: 'success', text: res.data.data })
    getFollowers()
  }
}

// // 粉丝已读
const tomessage =async () => {
  router.go(-1)
 
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
}
.tab {
  width: 100%;
  height: 0.8rem;
  position: fixed;
  top: 0;
  left: 0;
  background: #1e1e1e;
  img {
    widows: 0.4rem;
    height: 0.4rem;
    margin-top: 0.2rem;
  }
  span {
    padding-left: 40%;
    text-align: center;
  }
}
.ddd {
  height: 0.8rem;
}

.userlist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #232323;
  .useritem {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid rgb(48, 48, 48);
    img {
      float: left;
      margin-left: 0.3rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50px;
    }
    .cont {
      width: 4.2rem;

      margin-left: 0.4rem;
      line-height: 0.3rem;
      font-size: 17px;
    }
    .cont :nth-child(2) {
      font-size: 14px;
    }
    .guai {
      width: 1.4rem;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 14px;
    }
    .follow {
      background: rgba(134, 134, 134, 0.396);
    }
    .isfollow {
      background: #f8355f;
    }
  }
}
</style>
