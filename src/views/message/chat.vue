<template>
  <div>
    <div>
      <!-- 顶部栏 -->
      <div class="top" @click="tomessage">
        <img src="../../assets/home/jiantou.png" alt="" @click="toback" />
        <span>{{ chatlist.userNickname }}</span>
      </div>
      <!--  -->
      <div class="box" v-scrollbottom>
        <div ref="messageref" v-for="(item, index) in getPrivatelist" :key="item.id">
          <div class="formatTime">
            <span>{{ formatTime(item.createdAt) }}</span>
          </div>
          <div class="messagelist">
            <!-- 我的聊天消息 -->
            <div class="messageitem left" v-show="item.fromId === myuserid">
              <div class="hearimg">
                <img src="../../assets/img/c75ae7128274356b4033ab6464338b67.jpg" alt="" />
              </div>

              <div class="message">{{ item.privateLetterContent }}</div>
              <!-- 聊天框的小三角 -->
              <div class="triangle-left"></div>
            </div>

            <!-- 好友的聊天消息 -->
            <div class="messageitem right" v-show="item.fromId !== myuserid">
              <div class="hearimg">
                <img :src="`http://43.138.15.137:3000` + chatlist.userAvatar" alt="" />
              </div>
              <!-- 聊天框的小三角 -->
              <div class="triangle-right"></div>
              <div class="message">{{ item.privateLetterContent }}</div>
            </div>
          </div>
        </div>

        <!-- 发送消息 -->
        <div class="replycom">
          <input type="text" placeholder="发送消息" name="" id="" v-model="chatinp" v-focus/>
          <div class="reply">
            <span>@</span>
            <span @click="addchat"><img src="../../assets/home/tick.png" alt="" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 时间
import { formatTime } from '../../utils/formatTime.js'
import { ref, onMounted, reactive } from 'vue'
import { getPrivateLetterAPI, readPrivateLetterAPI, privateLetterAPI } from '../../api/meaasge'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { inject } from 'vue'
// socket.emit('login', myuserid)

const socket = inject('socket') // 注入到全局

onMounted(() => {
  getPrivate()
  readchat()
})

// 返回
const tomessage = () => {
  router.go(-1)
}

//顶部好友名称
const chatlist = ref()
chatlist.value = JSON.parse(localStorage.getItem('userinfo'))
// console.log(chatlist.value,'000000')

// 我的userid
const myuserid = localStorage.getItem('userId')
// 我的名字
const userlist = JSON.parse(localStorage.getItem('userlist'))
const userNickname = userlist.userNickname
// console.log(userNickname);
// 好友的id
localStorage.setItem('toUserId', chatlist.value.userId)

// 获取消息数据
const getPrivatelist = ref([])
const getPrivate = async () => {
  let res = await getPrivateLetterAPI(chatlist.value.userId)
  getPrivatelist.value = res.data.data
  // console.log(getPrivatelist.value)
}

// 读取聊天信息
const readchat = async () => {
  let res = await readPrivateLetterAPI(chatlist.value.userId)
  // console.log(res, '22222')
}

// 发送聊天
const chatinp = ref('')
const addchat = async () => {
  if (chatinp.value.trim() == '') return
  let res = await privateLetterAPI({
    content: chatinp.value,
    fromUserId: myuserid,
    toUserId: chatlist.value.userId
  })
  console.log(res)
  getPrivate()

  //
  let obj = {
    fromId: myuserid,
    toId: chatlist.value.userId,
    privateLetterContent: chatinp.value,
    createdAt: 1686795510568,
    userAvatar: '/assets/avatar/1203c37e-bb58-48e3-811a-be0081a0f873.png',
    userNickname: userNickname
  }

  // 发送数据到服务端
  socket.emit('sendPrivateLetter', obj) // sendPrivateLetter客户端和服务端协商好的事件

  // 清空
  chatinp.value = ''
}

socket.on('receivePrivateLetter', (data) => {
  // receivePrivateLetter客户端和服务端协商好的事件
  console.log(data)
  getPrivatelist.value.push(data)
  // console.log(getPrivatelist.value)
})
</script>

<style lang="scss" scoped>
div {
  color: white;
}
.formatTime {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: rgb(199, 199, 199);
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 0.8rem;
  border-bottom: 1px solid rgb(242, 242, 242);
  display: flex;
  align-items: center;
  background: rgb(24, 24, 24);

  img {
    margin-left: 0.2rem;
    width: 0.4rem;
    height: 0.4rem;
  }
  span {
    padding-left: 40%;
    font-size: 0.3rem;
  }
}
.box {
  margin-bottom: 0.8rem;
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-y: auto;
}
.messagelist {
  width: 100%;
  .messageitem {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 0.2rem;
    margin-bottom: 0.8rem;
    .message {
      max-width: 4rem;
      min-height: 0.6rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
    }
    .hearimg {
      width: 1rem;
      height: 1rem;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
      }
    }
  }
  .left {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    .hearimg {
      margin-right: 0.2rem;
    }
    .message {
      z-index: 10;
      background: skyblue;
      margin-right: 0.3rem;
    }
  }
  .right {
    position: relative;
    display: flex;
    flex-direction: row;
    .hearimg {
      margin-left: 0.2rem;
    }
    .message {
      z-index: 10;
      color: black;
      background: rgb(215, 220, 222);
      margin-left: 0.3rem;
    }
  }
  .triangle-left {
    position: absolute;
    top: 0.45rem;
    right: 1.2rem;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left-color: skyblue; /* 设置正方形左边框颜色不为透明 */
  }
  .triangle-right {
    position: absolute;
    top: 0.45rem;
    left: 1.2rem;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: rgb(215, 220, 222); /* 设置正方形左边框颜色不为透明 */
  }
}
.replycom {
  z-index: 20;
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid white;
  input {
    width: 100%;
    height: 100%;
    padding-left: 0.4rem;
    box-sizing: border-box;
    background: rgb(29, 28, 28);
    color: white;
    border: none;
  }
  .reply {
    position: absolute;
    top: 0.3rem;
    right: 0;
    width: 1.2rem;
    display: flex;
    justify-content: space-around;
    background: rgb(29, 28, 28);
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
}
</style>
