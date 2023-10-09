<template>
  <div class="box">
    <myFollowFans :FollowFans="Fanslist">
      <!-- 顶部栏 -->
      <template v-slot:tapSlot>
        <div class="tab">
          <img @click="tomessage" src="/src/assets/home/jiantou.png" alt="" />
          <span>我的粉丝</span>
        </div>
      </template>
      <!-- 按钮 -->
      <!-- 插槽接收参数   卡槽传值必须用template包裹，v-slot:加名字 = 后面是数据 -->
      <template v-slot:buttonSlot="scope">
        <div class="guai isfollow" @click="follow(scope)" v-show="scope.bothStatus.bothStatus == 0">关注</div>
        <div class="guai follow" @click="follow(scope)" v-show="scope.bothStatus.bothStatus == 1">互相关注</div>
      </template>
    </myFollowFans>
  </div>
</template>

<script setup>
import myFollowFans from '../../components/comcom/my-FollowFans.vue'
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { Debounce } from '../../utils/debounce.js'
import { getFansAPI } from '../../api/my'
import { gettriggerFollowAPI } from '../../api/meaasge.js'

import { useRouter } from 'vue-router'
import { ref, computed, onMounted, reactive } from 'vue'
const router = useRouter()
onMounted(() => {
  getFans()
})

const Fanslist = ref([])
const getFans = async () => {
  let res = await getFansAPI()
  console.log(res)
  Fanslist.value = res.data.data
}

// 关注
const follow = async (scope) => {
  // console.log(scope.bothStatus.userId)
  const userId = scope.bothStatus.userId
  let res = await gettriggerFollowAPI(userId)
  console.log(res)
  getFans()
  if (scope.bothStatus.bothStatus == 1) {
    MessageMainVue({ type: 'success', text: res.data.data })
  } else if (scope.bothStatus.bothStatus == 0) {
    MessageMainVue({ type: 'success', text: res.data.data })
  }
}

// 返回
const tomessage = async () => {
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
    .userimg {
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
