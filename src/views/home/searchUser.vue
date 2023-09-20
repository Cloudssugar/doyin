<template>
  <div>
    <div class="search">
      <img @click="tohome" src="/src/assets/home/jiantou.png" alt="" />
      <input @input="userinp" v-model="userval" type="text" placeholder="输入关键词进行搜索(用户名称，id)" />
      <img class="search-img" src="/src/assets/home/search.png" alt="" />
    </div>
    <div class="tab">
      <div @click="toesarchvideo">视频</div>
      <div>用户</div>
    </div>
    <div class="userlist">
      <div class="useritem" v-for="(item, index) in userlist" :key="item.id">
        <!-- {{ item }} -->
        <img :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
        <div class="cont">
          <p>{{ item.userNickname }}</p>
          <p>{{ item.userDesc }}</p>
        </div>
        <div class="guai isfollow" @click="follow(item)" v-show="item.myRelation == 'none'">关注</div>
        <div class="guai follow" @click="follow(item)" v-show="item.myRelation == 'follow'">已关注</div>
        <div class="guai follow" @click="follow(item)" v-show="item.myRelation == 'both'">互相关注</div>
          <div class="guai isfollow" @click="follow(item)" v-show="item.myRelation == 'fan'">关注</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { Debounce } from '../../utils/debounce.js'
import { searchVideoAPI, searchUserAPI, triggerFollowAPI } from '../../api/home.js'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
const router = useRouter()
const toesarchvideo = () => {
  router.push('/search/video')
}
const tohome = () => {
  router.push('/home')
}
const userval = ref('')
const userlist = ref([])
//  搜索
const userinp = Debounce(async (e) => {
  let res = await searchUserAPI({
    key: userval.value
  })
  console.log(res.data.data)
  userlist.value = res.data.data
}, 1000)

// 关注
const follow = async (item) => {
  console.log(item.userId)
  const userId = item.userId
  let res = await triggerFollowAPI(userId)
  console.log(res)
  userinp()
  if (item.myRelation == 'follow') {
    MessageMainVue({ type: 'success', text: res.data.data })
  } else if (item.myRelation == 'none') {
    MessageMainVue({ type: 'success', text: res.data.data })
  }else if (item.myRelation == 'fan') {
    MessageMainVue({ type: 'success', text: res.data.data })
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 0.8rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  img {
    widows: 0.4rem;
    height: 0.4rem;
  }
  input {
    padding-left: 0.6rem;
    width: 70%;
    height: 90%;
    border: none;
    color: white;
    background: rgb(27, 27, 27);
  }
  .search-img {
    position: absolute;
    top: 0.2rem;
    left: 1.4rem;
  }
}
.tab {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    width: 49%;
    height: 0.8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.tab :nth-child(2) {
  border-bottom: 2px solid rgb(240, 212, 2);
}
.userlist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .useritem {
    display: flex;
    align-items: center;
    width: 100%;

    img {
      float: left;
      margin-left: 0.6rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50px;
    }
    .cont {
      width: 3.6rem;

      margin-left: 0.4rem;
      line-height: 0.3rem;
    }
    .cont :nth-child(2) {
      font-size: 14px;
    }
    .guai {
      width: 1.4rem;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
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
