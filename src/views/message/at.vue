<template>
  <div>
    <!-- @ -->
    <myzanAtPl :bymessagelist="atlist">
      <!--顶部栏 使用插槽 -->
      <template v-slot:tapSlot>
        <div class="tab">
          <img @click="tomessage" src="/src/assets/home/jiantou.png" alt="" />
          <span>@</span>
        </div>
      </template>
      <!-- 内容使用插槽 -->
      <template v-slot:useritemSlot>
        <div class="useritem" v-for="(item, index) in atlist" :key="item.id">
          <div class="info" v-show="item.isRead == 0" style="/* display: none; */"></div>
          <img class="userimg" :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
          <div class="cont">
            <p>@{{ item.userNickname }}</p>
            <p>{{ item.commentContent }}</p>
            <p>提到了你 {{ formatTime(item.createdAt) }}</p>
          </div>
          <div class="guai">
            <img class="works" :src="item.videoCover" alt="" />
          </div>
        </div>
      </template>
    </myzanAtPl>
    <!-- 顶部栏
    <div class="tab">
      <img @click="tomessage" src="/src/assets/home/jiantou.png" alt="" />
      <span>@</span>
    </div>
    <div class="ddd"></div>

    <div class="userlist">
      <div class="useritem" v-for="(item, index) in atlist" :key="item.id">
  
         <div class="info" v-show="item.isRead==0" style="/* display: none; */"></div>
        <img class="userimg" :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
        <div class="cont">
          <p>@{{ item.userNickname }}</p>
          <p>{{ item.commentContent }}</p>
          <p>提到了你 {{ formatTime(item.createdAt) }}</p>
        </div>
        <div class="guai">
          <img class="works" :src="item.videoCover" alt="" />
        </div>
      </div>
      <div class="nomore">没有更多啦</div>
    </div> -->
  </div>
</template>

<script setup>
import myzanAtPl from '../../components/comcom/my-zanAtPl.vue'
// 时间
import { formatTime } from '../../utils/formatTime.js'
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { Debounce } from '../../utils/debounce.js'
import { getAtAPI, getreadAllAtAPI } from '../../api/meaasge.js'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, reactive } from 'vue'
const router = useRouter()
onMounted(() => {
  getat()
})

// at列表
const atlist = ref([])
const getat = async () => {
  let res = await getAtAPI()
  console.log(res)
  atlist.value = res.data.data
}

// at已读
const tomessage = async () => {
  router.go(-1)
  let res = await getreadAllAtAPI()
  console.log(res)
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
    .info {
      width: 0.2rem;
      height: 0.2rem;
      background: orange;
      display: block;
      margin-left: 0.1rem;
      border-radius: 50px;
    }
    .userimg {
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
.nomore {
  width: 100%;
  text-align: center;
  font-size: 14px;
}
</style>
