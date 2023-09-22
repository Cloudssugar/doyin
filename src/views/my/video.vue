<template>
  <div>
    <!-- 我的 作品 喜欢  -->
    <div class="likesnumlist">
      <div class="likeitem" v-for="(item, index) in videolikeslist" :key="item.id">
        <div class="likeimg">
          <video style="width: 100%; height: 100%; object-fit: fill" :src="item.Video.videoPath"></video>
        </div>
        <img class="img" src="../../assets/message/love.png" alt="" />
        <span>{{ item.WSLCNum.likeNum }}</span>
      </div>
      <div class="ddd"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getvideolikesAPI } from '../../api/my'

onMounted(() => {
  getvideolikes()
})
// 获取我的作品
const videolikeslist = reactive([])
const getvideolikes = async () => {
  let res = await getvideolikesAPI()
  res.data.data.forEach((item) => {
     videolikeslist.push(item)
  })
  // videolikeslist.push(res.data.data)
  console.log(videolikeslist)
}
</script>

<style lang="scss" scoped>
div {
  background: rgb(30, 30, 30);
}
.likesnumlist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .likeitem {
    border: 0.001rem solid rgb(57, 57, 57);
    margin-bottom: 5px;
    position: relative;
    width: 32%;
    .likeimg {
      width: 100%;
      height: 3.2rem;
    }
    span {
      position: absolute;
      top: 2.75rem;
      left: 0.6rem;
      font-size: 0.28rem;
      vertical-align: auto;
    }
    .img {
      position: absolute;
      top: 2.8rem;
      left: 0.2rem;
      width:0.3rem;
      height:0.3rem;
    }
  }
}
.ddd{
  width: 100%;
  height: 1.4rem;
}
</style>
