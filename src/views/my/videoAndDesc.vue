<template>
  <div>
    <dynamicState :FollowerVideolist="videolikeslist"></dynamicState>
  </div>
</template>

<script setup>
import dynamicState from '../../components/comcom/dynamic-state.vue'

import { getvideolikesAPI } from '../../api/my.js'
import { ref, onMounted, reactive } from 'vue'
onMounted(() => {
  getvideolikes()
  let iszanlike = localStorage.getItem('iszanlike')
})
// 获取数据
const videolikeslist = ref([])
const getvideolikes = async () => {
  let res = await getvideolikesAPI()
  videolikeslist.value = res.data.data.reverse()
  console.log(videolikeslist.value)
  for (var i = 0; i < videolikeslist.value.length; i++) {
    videolikeslist.value[i].iszanlike = false
  }
}
</script>

<style lang="scss" scoped></style>
