<template>
  <div>
    <!-- 顶部栏 -->
    <div class="tab">
      <img @click="tomy" src="/src/assets/home/jiantou.png" alt="" />
      <span>编辑个人资料</span>
    </div>
    <div class="ddd"></div>
    <!-- 头像 -->
    <div class="content">
      <div class="avatar">
        <label>
          <input id="file" class="uploadImg file1" type="file" name="file" style="display: none" />
          <img :src="`http://43.138.15.137:3000` + userAvatars" alt="" />
          <p>点击跟换头像</p>
        </label>
      </div>
      <!--  -->
      <div class="xx">
        <span>昵称</span>
        <input type="text" v-model="userNicknames" name="" id="" />
      </div>
      <div class="xx">
        <span>签名</span>
        <input type="text" v-model="userDescs" name="" id="" />
      </div>
      <div class="xx">
        <span>相别</span>
        <input type="text" v-model="userGenders" name="" id="" />
      </div>
      <div class="xx">
        <span>年龄</span>
        <input type="text" v-model="userAges" name="" id="" />
      </div>
      <div class="xx">
        <span>地区</span>
        <input type="text" v-model="userAddresss" name="" id="" />
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { modifyUserInfoAPI } from '../../api/my.js'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, reactive } from 'vue'
const router = useRouter()

const userNicknames = ref('')
const userDescs = ref('')
const userGenders = ref('')
const userAges = ref('')
const userAddresss = ref('')
const userAvatars = ref('') // 图片

const userinfo = ref({})
const users=ref({})

// 我的页面的信息
const userlist = JSON.parse(localStorage.getItem('userlist'))
console.log(userlist)
userNicknames.value = userlist.userNickname
userDescs.value = userlist.userDesc
userGenders.value = userlist.userGender
userAges.value = userlist.userAge
userAddresss.value = userlist.userAddress
userAvatars.value = userlist.userAvatar
// 解构我的页面需要的信息
 let {userNickname,userDesc,userGender,userAge,userAddress,userAvatar} =JSON.parse(localStorage.getItem('userlist'))
  users.value = {
    userNickname,userDesc, userGender, userAge ,userAddress, userAvatar
  }

// 点击返回  做判断 是否修改
const tomy = async () => {

  let res = await modifyUserInfoAPI({
    userNickname: userNicknames.value,
    userDesc: userDescs.value,
    userGender: userGenders.value,
    userAge: userAges.value,
    userAddress: userAddresss.value,
    userAvatar: userAvatars.value
  })
  console.log(res.data.data, '修改')
  // 结构修改后需要的信息
  let {userNickname,userDesc,userGender,userAge,userAddress,userAvatar} =res.data.data
  userinfo.value = {
    userNickname,userDesc, userGender, userAge ,userAddress, userAvatar
  }
  console.log(JSON.stringify(userinfo.value),'22')
  console.log(JSON.stringify(users.value),'11')

  // 如果修改了弹框
  if (JSON.stringify(users.value) !== JSON.stringify(userinfo.value)) {
    if (confirm('确定修改吗')) {
      router.push('/my')
      MessageMainVue({ type: 'success', text: '修改成功~' })
    } else {
      router.push('')
    }
  }else{
     router.push('/my')
  }
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
    padding-left: 33%;
    text-align: center;
  }
}
.ddd {
  height: 0.8rem;
}
.content {
  .avatar {
    margin-top: 0.5rem;
    text-align: center;
    width: 100%;
    height: 3.5rem;
    border-radius: 50px;
    img {
      border-radius: 50px;
      width: 2rem;
      height: 2rem;
    }
    p {
      font-size: 14px;
      color: #bbbbbb;
    }
  }
  .xx {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 1rem;
    width: 100%;
    input {
      width: 50%;
      height: 0.6rem;
      border: none;
      background: #1e1e1e;
      color: white;
      text-align: right;
    }
    span {
      font-size: 16px;
      color: #e3e3e3;
    }
  }
}
</style>
