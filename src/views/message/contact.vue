<template>
  <div>
    <div class="tab">
      <img @click="tomessage" src="/src/assets/home/jiantou.png" alt="" />
      <span @click="tocontact">联系人</span>
    </div>
    <div class="ddd"></div>
    <div class="sreach">
      <input @keydown.enter="searchinp" v-model="searchval" type="text" name="" id="" placeholder="搜索" />
      <img src="/src/assets/home/search.png" alt="" />
    </div>
    <div class="contact">
      <!-- 第一块 -->
      <div class="contactitem" v-for="(item, index) in contactlist" :key="item.id">
        <h5>H</h5>
        <div class="userlist">
          <div class="useritem">
            <!-- {{ item }} -->
            <img class="user" :src="`http://43.138.15.137:3000` + item.userAvatar" alt="" />
            <div class="cont">
              <p>{{ item.userNickname }}</p>
              <p>{{ item.userDesc }}</p>
            </div>
            <div class="guai" @click="tochat(item)">
              <img src="/src/assets/message/message.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 字母排序 -->
    <div class="list-shortcut">
      <div class="search-s">
        <img src="/src/assets/home/search.png" alt="" />
      </div>
      <div class="shortcut-s">
        <span>Y</span>
        <span>A</span>
        <span>L</span>
        <span>X</span>
      </div>
      <div class="cut">#</div>
    </div>
  </div>
</template>

<script setup>
import { getContactAPI } from '../../api/meaasge.js'
import { ref, onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  getContact()
})

const tochat = (item) => {
  console.log(item)
  router.push({
    name: 'chat',
    params: {
      id: JSON.stringify(item) 
    }
  })
}
// computed(()=>{
//   contactlist=()=>{
//     return contactlist.filter(item=>{
//         item.name.toLowerCase().includes(searchval.value.toLowerCase())
//     })
//   }
// })
//
const contactlist = ref([])
const getContact = async () => {
  let res = await getContactAPI()
  console.log(res)
  contactlist.value = res.data.data
}
// 搜索用户
const searchval = ref('')
const contactlists = ref([])
const searchinp = (value) => {}
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
  background: rgb(27, 27, 27);
  z-index: 99;
  border-bottom: 1px solid rgb(43, 43, 43);
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
.sreach {
  width: 100%;
  position: relative;

  input {
    margin-top: 0.2rem;
    margin-left: 5%;
    display: flex;
    width: 80%;
    height: 0.7rem;
    background: rgba(43, 43, 43, 0.821);
    border: none;
    color: white;
    padding-left: 0.6rem;
  }
  img {
    position: absolute;
    top: 0.2rem;
    left: 0.5rem;
    width: 0.3rem;
    height: 0.3rem;
  }
}
.contact {
  width: 100%;
  .contactitem {
    width: 100%;
    h5 {
      margin-left: 0.4rem;
    }
  }
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
    border-bottom: 1px solid rgb(36, 36, 36);
    .user {
      box-sizing: border-box;
      float: left;
      margin-left: 0.2rem;
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
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }
}
.list-shortcut {
  position: fixed;
  top: 50%;
  left: 92%;
  width: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .search-s {
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .shortcut-s {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
  }
}
</style>
