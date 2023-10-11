<template>
  <div>
    <div class="addVideo">
      <!-- 顶部栏 -->
      <div class="top">
        <img src="../../assets/home/jiantou.png" alt="" @click="toback" />
        <span>发布动态</span>
      </div>
      <!-- 上传视频 -->
      <div class="video_release">
        <video src="" preload="auto" ref="getVideoDom" @click="videoPlay" autoplay style="width: 100%; height: 100%"></video>
        <p ref="p">点击上传或者在下方输入url,推荐使用url</p>
        <input type="file" accept=".mp4" @change="changeurl" class="video-input" />
      </div>

      <div class="input">
        <!-- 视频链接 -->
        <div class="content_item">
          <input type="text" placeholder="请输入视频链接(如本地上传可不填)" />
        </div>
        <!-- 视频封面 -->
        <div class="content_item">
          <input type="text" placeholder="视频封面(如本地上传默认第一帧)" />
        </div>
        <!-- 视频文案 -->
        <div class="content_item">
          <input type="text" placeholder="请输入视频描述" v-model="videolist.videoDesc" />
        </div>
      </div>
      <!-- 视频封面 -->
      <!-- <div class="capture"  v-show="flag">
         <img src="" ref="image" alt="">
      </div> -->
      <div class="btn">
        <div @click="capture">截图</div>
        <div @click="Preview">预览</div>
        <div @click="getupload">发布</div>
      </div>
      <img style="width: 150px; height: 100px" src="" alt="" ref="image" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { uploadFileAPI, uploadCoverAPI, publishVideoAPI } from '../../api/shoot.js'
import { useRouter } from 'vue-router'
// 引入消息 文件
import MessageMainVue from '/src/components/js/message.js'
const router = useRouter()

//
const videolist = reactive({
  videoDesc: ''
})
const getVideoDom = ref(null)
const image = ref(null)

// 文件类型检测
const checkFileType = (file) => {
  // 创建FileReader 对象
  var reader = new FileReader()
  // 读取文件
  reader.readAsArrayBuffer(file)
  // 文件读取完成时触发
  reader.onloadend = function () {
    // 获取文件类型
    var type = getFileType(new Uint8Array(reader.result))
    // 判断文件类型
    if (type !== 'mp4') {
      MessageMainVue({ type: 'warn', text: '这是真嘟假嘟？' })
    }
  }
}

// 根据文件头判断文件类型
const getFileType = (bytes) => {
  if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x00 && bytes[3] === 0x20 && bytes[4] === 0x66) {
    return 'mp4'
  } else {
    return 'unknown'
  }
}

// 监听用户选择的文件
const changeurl = (e) => {
  let files = e.target.files
  if (!files.length) return
  //
  videolist.realVideo = files[0]
  console.log(videolist.realVideo)
  // 上传文件的类型限制
  if (!/(mp4)/i.test(videolist.realVideo.type)) {
    MessageMainVue({ type: 'warn', text: '上传的视频只能是MP4类型的' })
    return
  }
  // 上传文件大小限制
  if (videolist.realVideo.size > 2 * 1024 * 1024) {
    MessageMainVue({ type: 'warn', text: '上传的视频不能超过2MB' })
    return
  }

  // getObjectURL 方法返回一个blob视频地址
  videolist.videoUrl = createObjectURL(videolist.realVideo)

  // 修改video src 地址
  setSrcAndCaptureImage()
}

// 获取视频地址(封装成方法是为了解决兼容问题)
const createObjectURL = (file) => {
  let url = null
  if (window.createObjectURL !== undefined) {
    url = window.createObjectURL(file)
  } else if (window.URL !== undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

// 截图
const setSrcAndCaptureImage = () => {
  // 视频地址赋值给video 的 src 属性
  getVideoDom.value.src = videolist.videoUrl
  //
  getVideoDom.value.addEventListener('loadeddata', capture)
}

// 视频播放、暂停
const videoPlay = () => {
  console.log('11111')
  getVideoDom.value.paused ? getVideoDom.value.play() : getVideoDom.value.pause()
}

// 手动截图
const capture = () => {
  getVideoDom.value.play()
  // 创建 canvas 元素
  let canvas = document.createElement('canvas')
  //设置画布的宽为视频的宽
  canvas.width = getVideoDom.value.videoWidth
  //设置画布的高为视频的高
  canvas.height = getVideoDom.value.videoHeight
  // 从图像的0,0坐标截取宽为 canvas，width
  canvas.getContext('2d').drawImage(getVideoDom.value, 0, 0, canvas.width, canvas.height)
  image.value.src = canvas.toDataURL('image/jpg')
  videolist.coverUrl = canvas.toDataURL('image/png')
  // 移除事件
  getVideoDom.value.removeEventListener('loadeddata', capture)
}

// 图片转成2进制
const dataURLtoblot = (dataurl) => {
  // console.log(dataurl,1222222);
  var bytestring = atob(dataurl.split(',')[1])
  var mimestring = dataurl.split(',')[0].split(':')[1].split(';'[0])

  var ab = new ArrayBuffer(bytestring.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < bytestring.length; i++) {
    ia[i] = bytestring.charCodeAt(i)
  }
  return new Blob([ab], { type: mimestring })
}

// 上传的方法
const getupload = async () => {
  // 判断是否上传了视频
  if (!videolist.realVideo) {
    MessageMainVue({ type: 'warn', text: '请选择上传的文件' })
    return false
  }
  // 把文件传递到服务器
  let formData = new FormData()
  // 后端需要videoPath参数，videoObj.realVideo是视频文件
  formData.append('videoPath', videolist.realVideo)
  // 请求上传接口
  const res = await uploadFileAPI(formData)
  console.log(res)
  if (res.status === 200) {
    // 视频文件
    let filename = res.data.filename
    // 视频的 id 截取
    const videoid = filename.substr(0, filename.indexOf('.'))
    console.log(videoid, 'videoid')
    // base64 转 buffer
    let blob = dataURLtoblot(videolist.coverUrl)
    // 上传数据
    let coverPic = new FormData()
    coverPic.append('videoId', videoid)
    coverPic.append('videoCover', blob)
    // 请求接口
    const res1 = await uploadCoverAPI(coverPic)
    console.log(res1)
    //
    if (res1.status === 200) {
      const res2 = await publishVideoAPI({
        videoId: videoid,
        videoCover: `${import.meta.env.VITE_APP_URL}assets/videoCover/${videoid}.jpg`,
        videoPath: `${import.meta.env.VITE_APP_URL}assets/videoPath/${videoid}.${filename.substr(filename.indexOf('.') + 1)}`,
        videoDesc: videolist.videoDesc
      })
      console.log(res2)
      MessageMainVue({ type: 'success', text: '发布视频成功咯' })
      router.go(-1)
    }
  }
}
console.log(import.meta.env)

const toback = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background: #161622;
  img {
    margin-left: 10px;
    width: 20px;
    height: 20px;
  }
  span {
    padding-left: 40%;
    font-size: 15px;
  }
}
.addVideo {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #161622;
  color: #fff;
  z-index: 999;
  height: 100%;
  .edit_top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    text-align: center;
    border: 1px solid #2f2f38;
    p {
      // border: 1px solid #fff;
    }
    p:nth-child(1) {
      font-size: 25px;
      width: 15%;
    }
    p:nth-child(2) {
      width: 80%;
    }
    p:nth-child(3) {
      width: 15%;
    }
  }
  .video_release {
    margin-top: 40px;
    position: relative;
    display: flex;
    background: #000;
    align-items: center;
    justify-content: center;
    height: 50vh;
    p {
      position: absolute;
    }
    video {
      z-index: 999;
      width: 100%;
      height: 100%;
      z-index: 222;
      border: 1px solid red($color: #000000);
      object-fit: contain;
    }
    .video-input {
      width: 100%;
      z-index: 222;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
      border: 1px solid #454545;
    }
  }
  .input {
    .content_item {
      position: relative;
      display: flex;
      padding: 10px 20px;
      line-height: 44px;
      height: 44px;
      justify-content: flex-start;
    }
    input {
      width: 100%;
      background: #161622;
      color: #e8e8e9;
      border: none;
      font-size: 14px;
    }
  }
  .btn {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.capture {
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 250px;
  height: 350px;
  background: palevioletred;
  img {
    width: 250px;
    height: 350px;
  }
}
</style>
