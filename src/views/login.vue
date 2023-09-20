<template>
  <div class="box">
    <transition >
      <div class="box1" v-show="islogin">
        <div class="top">
          <img @click="tohome" src="/src/assets/home/cross.png" alt="" />
          <span @click="signin">注册账号</span>
        </div>
        <div class="login">
          <p>记录美好生活</p>
          <input type="text" @blur="blur" v-model="email" placeholder="输入邮箱" />
          <input type="password" v-model="password" name="" id="" placeholder="输入密码" />
          <button @click="login" v-show="showlogin">登录</button>
          <a href="#">忘记/找回密码</a>
        </div>
      </div>
    </transition>
    <!--  -->
    <transition name="my">
      <div class="box1" v-show="issignin">
        <div class="top">
          <img @click="tologin" src="/src/assets/home/jiantou.png" alt="" />
          <span></span>
        </div>
        <div class="login">
          <p>注册</p>
          <input type="text" v-model="email" placeholder="输入邮箱" />
          <input type="password" v-model="password" placeholder="输入密码" />
          <input type="text"   v-model="codes" placeholder="输入验证码" />
          <div class="code" @click="code">
            {{ obj.codeName }}
            <!-- <span v-if="obj.show">发送验证码</span> -->
            <!-- <span v-else>重新发送{{ obj.codeName }}s</span> -->
          </div>
          <button @click="register">注册</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Debounce } from '../utils/debounce.js'
import axios from 'axios'
import { getCodeAPI, postregisterAPI, postloginAPI } from '../api/login.js'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// 引入消息 文件
import MessageMainVue from '../components/js/message.js'

// 切换登录注册页
const islogin = ref(true)
const issignin = ref(false)
const signin = () => {
  islogin.value = !islogin.value
  issignin.value = !issignin.value
}
const tologin = () => {
  islogin.value = !islogin.value
  issignin.value = !issignin.value
}
// 倒计时
let obj = reactive({
  isSend: false, //禁用
  codeName: '发送验证码',
  totalTime: 10, //一般是60
  timer: '' //定时器
})

const email = ref('y3328670472@163.com')
const password = ref('123456')
const codes = ref('')
// 点击发送倒计时按钮
const code = async () => {
  if (obj.isSend) return
  //接口
  let res = await getCodeAPI(email.value)
  obj.isSend = true
  obj.codeName = obj.totalTime + 's后重新发送'
  obj.timer = setInterval(() => {
    obj.totalTime--
    obj.codeName = obj.totalTime + 's后重新发送'
     //当倒计时小于0时清除定时器
    if (obj.totalTime < 0) {
      clearInterval(obj.timer)
      obj.codeName = '重新发送验证码'
      obj.totalTime = 10
      obj.isSend = false
    }
  }, 1000)
}
// 注册
const register = async () => {
  let res = await postregisterAPI({
    email: email.value,
    password: password.value,
    code: code.value
  })
  console.log(res)

  console.log(islogin.value)
  islogin.value = true
  issignin.value = false
  MessageMainVue({ type: 'success', text: '注册成功~' })
}
// 失去焦点显示登录按钮
const showlogin = ref(true)
const blur = () => {
  if (email.value == '') {
    console.log('11')
    showlogin.value = false
  } else {
    showlogin.value = true
  }
}
// 登录
const login = async () => {
  const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!emailReg.test(email.value)) {
    // alert('邮箱错误')
    MessageMainVue({ type: 'warn', text: '邮箱错误' })
  }
  let res = await postloginAPI({
    email: email.value,
    password: password.value
  })
  console.log(res)
  localStorage.setItem('userId', res.data.data.userId)
  MessageMainVue({ type: 'success', text: '登录成功~' })
  router.push('/home')
}
//
const tohome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: white;
  color: black;
}
.box1 {
  height: 100vh;
}
.top {
  width: 90%;
  height: 40px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  color: black;
  justify-content: space-between;
  img {
    width: 20px;
    height: 20px;
  }
  span {
    font-size: 18px;
    color: rgb(105, 105, 105);
  }
}
.login {
  margin-top: 1.2rem;
  width: 80%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  p {
    margin-left: 20px;
    font-size: 0.6rem;
  }
  input {
    margin-left: 20px;
    margin-top: 0.4rem;
    width: 100%;
    height: 0.7rem;
    border: none;
    background: rgb(250, 250, 250);
    position: relative;
  }
  a {
    font-size: 13px;
    color: rgb(190, 190, 190);
    margin-left: 20px;
  }
  button {
    margin-left: 20px;
    width: 100%;
    border: none;
    background: red;
    color: white;
    height: 40px;
    margin-top: 20px;
  }
  .code {
    width: 90px;
    height: 0.7rem;
    font-size: 12px;
    background: rgb(239, 239, 239);
    position: absolute;
    top: 50%;
    left: 67%;
    text-align: center;
    line-height: 0.7rem;
  }
}
.v-enter,
.v-leave-to {
  // 离开的开始状态，进入的开始状态
  opacity: 0; /*透明度*/
  transform: translateX(150px);
}

.v-leave,
.v-enter-to {
  // 进入的开始状态，离开的开始状态
  opacity: 1; /*透明度*/
  transform: translateY(150px);
}
.v-enter-active {
  // 进入的动画 过程
  transition: all 0.5s ease;
}
.v-leave-active {
  // 离开的动画 过程
  transition: all 0.5s ease;
}

// name为my的transiton会使用这个类名
.my-enter,
.my-leave-to {
  opacity: 0; /*透明度*/
  transform: translateY(100px);
}

.my-enter-active,
.my-leave-active {
  transition: all 0.5s ease;
}
</style>
