<template>
  <div>
    <!-- 顶部栏 -->
    <div class="tab">
      <img @click="tomessage" src="/src/assets/home/jiantou.png" alt="" />
      <span>@</span>
    </div>
    <div class="ddd"></div>
    <!-- 内容 -->
    <div class="userlist">
      <div class="useritem" v-for="(item, index) in atlist" :key="item.id">
        <!-- {{ item }} -->
        <img class="user" :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
        <div class="cont">
          <p>@{{ item.userNickname }}</p>
          <p>{{ item.commentContent }}</p>
          <p>提到了你 {{ formatTime(item.createdAt) }}</p>
        </div>
        <div class="guai isfollow">
          <img class="works" :src="item.videoCover" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 时间
import { formatTime } from '../../utils/formatTime.js'
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { Debounce } from '../../utils/debounce.js'
import { getAtAPI, gettriggerFollowAPI } from '../../api/meaasge.js'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, reactive } from 'vue'
const router = useRouter()
onMounted(() => {
  getat()
})

const atlist = ref([])
const getat = async () => {
  let res = await getAtAPI()
  console.log(res)
  atlist.value = res.data.data
}

const tomessage = () => {
  router.push('/message')
}
</script>

<style lang="scss" scoped>
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
    padding-left: 45%;
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
    .user {
      float: left;
      margin-left: 0.1rem;
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
    .cont :nth-child(3) {
      font-size: 12px;
      color: #a7a7a7;
    }
    .guai {
      width: 1.4rem;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 14px;
      .works {
        border-radius: 0.1rem;
        width: 1.5rem;
        height: 1rem;
      }
    }
  }
}
</style>
