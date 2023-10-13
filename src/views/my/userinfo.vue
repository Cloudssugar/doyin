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
          <input id="file" @change="upLoadHandle" class="uploadImg file1" type="file" name="file" style="display: none" />
          <img :src="`http://43.138.15.137:3000` + userAvatars" alt="" v-if="userAvatars == '/assets/avatar/97ff8e30-d5ea-4995-8c0d-b7765699f5e5.png'" />
          <img :src="userAvatars" alt="" v-if="userAvatars !== '/assets/avatar/97ff8e30-d5ea-4995-8c0d-b7765699f5e5.png'" />

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
import axios from 'axios'
// 引入消息 文件
import MessageMainVue from '../../components/js/message.js'
import { modifyUserInfoAPI, uploadAvatarAPI } from '../../api/my.js'
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
const users = ref({})

// 我的页面的信息
const userlist = JSON.parse(localStorage.getItem('userlist'))
console.log(userlist)
userNicknames.value = userlist.userNickname
userDescs.value = userlist.userDesc
userGenders.value = userlist.userGender
userAges.value = userlist.userAge
userAddresss.value = userlist.userAddress

userAvatars.value = userlist.userAvatar
console.log(userAvatars);
// 解构我的页面需要的信息
let { userNickname, userDesc, userGender, userAge, userAddress, userAvatar } = JSON.parse(localStorage.getItem('userlist'))
users.value = {
  userNickname,
  userDesc,
  userGender,
  userAge,
  userAddress,
  userAvatar
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
  let { userNickname, userDesc, userGender, userAge, userAddress, userAvatar } = res.data.data
  userinfo.value = {
    userNickname,
    userDesc,
    userGender,
    userAge,
    userAddress,
    userAvatar
  }
  // console.log(JSON.stringify(userinfo.value),'22')
  // console.log(JSON.stringify(users.value),'11')

  // 如果修改了弹框
  if (JSON.stringify(users.value) !== JSON.stringify(userinfo.value)) {
    if (confirm('确定修改吗')) {
      router.push('/my')
      MessageMainVue({ type: 'success', text: '修改成功~' })
    } else {
      router.push('/my')
    }
  } else {
    router.push('/my')
  }
}

// 头像上传
// const upLoadHandle = async (e) => {
//   let files = e.target.files || e.dataTransfer.files
//   console.log(files[0])
//   // 如果集合的长度为0那么就return掉
//   if (!files.length) return
//   // 上传的文件类型限制
//   if (!/(jpeg|png)/i.test(files[0].type)) {
//     alert('上传的视频只能是jpg,png类型的')
//     e.target.value = ''
//     return
//   }
//   // 限制文件上传大小
//   if (files[0].size > 2 * 1024 * 1024) {
//     alert('上传的图片不能大于2MB')
//     return
//   }
//   // 创建FormData对象
//   let formData = new FormData()
//   // // 添加对应的请求参数
//   formData.append('fieldName', files[0])
//   console.log( files[0]);
//   // // 请求接口
//   let res=await uploadAvatarAPI(formData)
//   console.log(res);

// }
const upLoadHandle = async(e) => {
  // 获取图片数据
  let files = e.target.files || e.dataTransfer.files

  // 如果集合的长度为0那么就return掉
  if (!files.length) return

  // 上传的文件类型限制
  if (!/(jpeg|png)/i.test(files[0].type)) {
    alert('上传的图片只能是jpg或png类型的')
    e.target.value = ''
    return
  }

  // 限制文件上传大小
  if (files[0].size > 2 * 1024 * 1024) {
    alert('上传的图片不能大于2MB')
    return
  }

  // 使用FileReader读取文件并转换为Base64字符串
  const reader = new FileReader()
  reader.onload = function (event) {
    // console.log(event.target);
    const base64String = event.target.result

    // console.log(base64String)
    userAvatars.value = base64String
    // 在这里你可以使用base64String进行进一步处理，比如显示在页面上或上传到服务器
  }

  // 读取文件并触发onload事件
  reader.readAsDataURL(files[0])
  //  let res=await uploadAvatarAPI(userAvatars.value)
  // console.log(res);
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
