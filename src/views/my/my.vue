<template>
  <div>
    <div class="bg">
      <!-- 背景图片 -->
      <img src="/src/assets/wallpaper1668603987563.jpg" alt="" />
      <img @click="more" src="/src/assets/my/more.png" alt="" />
    </div>
    <!-- 更多弹框 -->
    <transition name="morebox">
      <div class="more-box" v-show="ismore">
        <span  @click="touserinfo">修改个人资料</span>
        <span>注销</span>
      </div>
    </transition>

    <div >
      <!-- 头像 -->
      <div class="avatar">
        <img :src="`http://43.138.15.137:3000` + userlist.userAvatar" alt="" />
      </div>
      <!-- 用户信息 -->
      <div class="my-message">
        <div class="ddd"></div>
        <div class="message">
          <span>{{ userlist.userNickname }}</span>
          <span>抖音号:{{ userlist.id }}</span>
        </div>
        <!-- 个性签名 -->
        <div class="signature">
          <span>{{ userlist.userDesc }}</span>
          <div class="female"><img src="/src/assets/my/female.png" alt="" /> {{ userlist.userAge }}</div>
          <div class="zan">
            <span>{{ byLikesNum }} 获赞</span><span>{{ FollowersNum }} 关注</span><span>{{ FansNum }} 粉丝</span>
          </div>
        </div>
      </div>
    </div>

    <div class="warp">
      <!-- tab栏 -->
      <div class="tab">
        <router-link class="active" to="/my/video">作品 {{ VideosNum }}</router-link>
        <router-link to="/my/videoAndDesc">动态 {{ VideosNum }}</router-link>
        <router-link to="/my/likes">喜欢 {{ LikesNum }}</router-link>
      </div>
      <!-- 作品内容 -->
      <div>
        <router-view></router-view>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import tabbar from '../../components/comcom/tabbar.vue'
import { getgetUserInfoAPI, getbyLikesNumAPI, getFansNumAPI, getFollowersNumAPI, getVideosNumAPI, getLikesNumPI } from '../../api/my.js'
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  getUserInfo()
  getFollowersNum()
  getFansNum()
  getbyLikesNum()
  getVideosNum()
  getLikesNum()
})
// 获取用户请求
const userlist = ref({})
const getUserInfo = async () => {
  let res = await getgetUserInfoAPI()
  console.log(res,'信息');
  // userlist.push(res.data.data)
  userlist.value=res.data.data

  // console.log(userlist.value)
  localStorage.setItem('userlist',JSON.stringify(userlist.value))
}

// 关注
const FollowersNum = ref('')
const getFollowersNum = async () => {
  let res = await getFollowersNumAPI()
  FollowersNum.value = res.data.data
  // console.log(res)
}

// 粉丝
const FansNum = ref('')
const getFansNum = async () => {
  let res = await getFansNumAPI()
  FansNum.value = res.data.data
  // console.log(res)
}
// 获赞
const byLikesNum = ref('')
const getbyLikesNum = async () => {
  let res = await getbyLikesNumAPI()
  byLikesNum.value = res.data.data
  // console.log(res)
}

//  作品和 动态
const VideosNum = ref('')
const getVideosNum = async () => {
  let res = await getVideosNumAPI()
  VideosNum.value = res.data.data
  // console.log(res)
}

// 我喜欢视频
const LikesNum = ref('')
const getLikesNum = async () => {
  let res = await getLikesNumPI()
  LikesNum.value = res.data.data
  // console.log(res)
}

//
const ismore = ref(false)
const more = () => {
  ismore.value = !ismore.value
}

const touserinfo=()=>{
   ismore.value = !ismore.value
   router.push('userinfo')
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 3rem;
  position: relative;
}
.bg :nth-child(1) {
  width: 100%;
  height: 3rem;
}
.bg :nth-child(2) {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
}
.avatar {
  position: absolute;
  top: 2.8rem;
  left: 0.3rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: rgb(29, 29, 29);
  img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 1rem;
  }
}
.more-box {
  position: absolute;
  top: 0.9rem;
  right: 0.2rem;
  width: 1.6rem;
  height: 1.8rem;
  font-size: 0.26rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  background: rgba(56, 56, 56, 0.6);
}
.my-message {
  width: 100%;
  .ddd {
    height: 1.8rem;
  }
  .message {
    display: flex;
    flex-direction: column;
    margin-left: 0.4rem;
  }
  .message :nth-child(2) {
    font-size: 14px;
  }
  .signature {
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    margin-left: 0.3rem;
    color: rgb(164, 164, 164);
    font-size: 14px;
    .female {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 0.4rem;
      margin-top: 0.1rem;
      margin-bottom: 0.1rem;
      border-radius: 0.1rem;
      background: rgba(65, 65, 65, 0.722);
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .zan {
      width: 60%;
      font-size: 16px;
      display: flex;
      color: rgb(226, 226, 226);
      justify-content: space-between;
    }
  }
}
.warp {
  margin-top: 0.2rem;
  .tab {
    background: rgb(30, 30, 30);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 40px;
    position: sticky; /*兼容*/
    top: 0;
    left: 0;
    z-index: 99;
    span {
      width: 33%;
      height: 30px;
      text-align: center;
      color: rgb(192, 192, 192);
      font-size: 18px;
    }
  }

  .router-link-active router-link-exact-active {
    color: rgb(203, 203, 203);
  }
  .router-link-exact-active {
    color: rgb(255, 255, 255);
    border-bottom: 2px solid rgb(255, 247, 0);
  }
  a {
    color: rgb(157, 157, 157);
  }
}
/* 给过渡的name加样式 */
.morebox-enter-active {
  animation-name: slideInUp;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.morebox-leave-active {
  animation-name: slideOutDown;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
@keyframes slideInUp {
  0% {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
    opacity: 0;  //淡出淡入
  }
  to {
    transform: translateZ(0);
  }
}
@keyframes slideOutDown {
  0% {
    transform: translateZ(0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
}
</style>
