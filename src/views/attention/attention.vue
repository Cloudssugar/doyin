<template>
  <div>
    <!-- 我关注的动态 -->
    <dynamicState :FollowerVideolist="FollowerVideolist" :loadlist='loadlist' @changeFollowerVideo="getFollowerVideo"></dynamicState>
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import dynamicState from '../../components/comcom/dynamic-state.vue'
import tabbar from '../../components/comcom/tabbar.vue'
import { getFollowerVideoAPI } from '../../api/attention.js'
import { ref, onMounted, reactive } from 'vue'
onMounted(() => {
  getFollowerVideo()
  let iszanlike = localStorage.getItem('iszanlike')
  // getreview()
})
// 获取数据
const FollowerVideolist = ref([])
const loadlist= ref([])

const getFollowerVideo = async (page, obj) => {
  let res = await getFollowerVideoAPI(page)
  loadlist.value=res.data.data

  console.log(res,123);
  // 
  if(loadlist.value){
     if (obj?.bool) {
    FollowerVideolist.value = [...FollowerVideolist.value, ...res.data.data]
    obj.fn()
  } else {
    FollowerVideolist.value = res.data.data
  }
  }else{
    console.log('没有了呜呜呜');
  }
 
  for (var i = 0; i < FollowerVideolist.value.length; i++) {
    FollowerVideolist.value[i].iszanlike = false
  }
}

// // 动态点赞
// // const iszanlike = ref(false)
// const attvideoId = ref('')
// const getzan = async (item) => {
//   console.log(item)
//   attvideoId.value = item.Video.videoId
//   let res = await getFollowerVideotriggerLikeAPI(attvideoId.value)
//   console.log(res)
//   MessageMainVue({ type: 'success', text: res.data.data })
//   if (attvideoId.value == item.Video.videoId) {
//     if (res.data.data == '喜欢成功') {
//       item.WSLCNum.likeNum++
//       item.iszanlike = true
//       localStorage.setItem('iszanlike', item.iszanlike)
//       console.log(item.WSLCNum.likeNum)
//     } else {
//       item.WSLCNum.likeNum--
//       item.iszanlike = false
//         localStorage.setItem('iszanlike', item.iszanlike)
//       console.log(item.WSLCNum.likeNum)
//     }
//   }
// }

// //评论列表
// const isreview = ref(false)
// const reviewlist = ref([])
// const reviewval = ref('')
// const ispllike = ref(true)
// const zanvideoId=ref('')
// const getreview = async (item) => {
//   console.log(item)
//   isreview.value = true
//   zanvideoId.value=item.Video.videoId
//   let res = await getVideoCommentAPI( zanvideoId.value)
//   console.log(res)
//   reviewlist.value = res.data.data
//   for (let i = 0; i < reviewlist.value.length; i++) {
//     reviewlist.value[i].ispllike = false
//   }
// }

// // 关闭弹框
// const getreviews = () => {
//   isreview.value = !isreview.value
// }

// // 发表评论
// const reviewinp = async (reviewval) => {
//   const userId = localStorage.getItem('userId')
//   // const videoId = localStorage.getItem('videoId')
//   let res = await commentVideoAPI({
//     fromUserId: userId,
//     replyId: '',
//     content: reviewval,
//     toVideoId: zanvideoId.value
//   })
//   console.log(res)
//   // reviewval.value = ''
//   getreview()
//   MessageMainVue({ type: 'success', text: '我评论啦' })
// }
</script>

<style lang="scss" scoped></style>
