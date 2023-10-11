<template>
  <div class="box">
    <!-- 顶部栏 插槽-->
    <slot name="tapSlot"></slot>
    <div class="ddd"></div>
    <!-- 内容 -->
    <div class="userlist">
      <div class="useritem" v-for="(item, index) in FollowFans" :key="item.id">
        <img class="userimg" :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
        <div class="cont">
          <p>{{ item.userNickname }}</p>
          <p>{{ item.userDesc }}</p>
        </div>
        <!-- 按钮 插槽-->
        <!-- 插槽传递参数 --> 
        <slot name="buttonSlot" :bothStatus="item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { Debounce } from '../../utils/debounce.js'
import { getFansoAPI, gettriggerFollowAPI, getreadAllFanMsgAPI } from '../../api/meaasge.js'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, reactive } from 'vue'
const router = useRouter()

const props = defineProps({
  FollowFans: Array
})

onMounted(() => {
  getFanso()
})

const fansilist = ref([])
const getFanso = async () => {
  let res = await getFansoAPI()
  console.log(res)
  fansilist.value = res.data.data
}

// 关注
const follow = async (item) => {
  console.log(item.userId)
  const userId = item.userId
  let res = await gettriggerFollowAPI(userId)
  console.log(res)
  getFanso()
  if (item.bothStatus == 1) {
    MessageMainVue({ type: 'success', text: res.data.data })
  } else if (item.bothStatus == 0) {
    MessageMainVue({ type: 'success', text: res.data.data })
  }
}

// 粉丝已读
const tomessage = async () => {
  router.go(-1)
  let res = await getreadAllFanMsgAPI()
  console.log(res)
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
    .userimg {
      float: left;
      margin-left: 0.3rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50px;
    }
    .cont {
      width: 4rem;

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
.nomore {
  width: 100%;
  text-align: center;
  font-size: 14px;
}
</style>
