<template>
  <!-- 点赞的爱心 -->
  <div class="zan" @click="getzan(item)">
    <img v-if="!item.iszanlike" src="../../assets/home/like.png" alt="" />
    <img v-else src="../../assets/home/likered.png" alt="" />
    <span>{{ item.WSLCNum.likeNum }}</span>
  </div>
</template>

<script setup>
import { getFollowerVideoAPI, getFollowerVideotriggerLikeAPI } from '../../api/attention.js'
import {ref,defineProps} from 'vue'
const props = defineProps({
  item:Array

})
console.log(props);

// 点赞
const attvideoId = ref('')
const getzan = async (item) => {
  console.log(item)
  attvideoId.value = item.Video.videoId
  let res = await getFollowerVideotriggerLikeAPI(attvideoId.value)
  console.log(res)
  // MessageMainVue({ type: 'success', text: res.data.data })
  if (attvideoId.value == item.Video.videoId) {
    if (res.data.data == '喜欢成功') {
      item.WSLCNum.likeNum++
      item.iszanlike = true
      localStorage.setItem('iszanlike', item.iszanlike)
      console.log(item.WSLCNum.likeNum)
    } else {
      item.WSLCNum.likeNum--
       item.iszanlike = false
      localStorage.setItem('iszanlike', item.iszanlike)
      console.log(item.WSLCNum.likeNum)
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  align-items: center;
  vertical-align: top;
  margin-right: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  img {
    width: 0.4rem;
    height: 0.4rem;
  }
  span {
    margin-left: 0.18rem;
    font-size: 14px;
  }
}
</style>
