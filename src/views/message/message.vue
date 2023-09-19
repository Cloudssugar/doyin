<template>
  <div>
    <div class="top">
      <span></span>
      <span>消息</span>
      <span>联系人</span>
    </div>
    <div class="message">
      <div class="fensi">
        <div class="fens">
          <img src="../../assets/message/fens.png" alt="" />
        </div>
        <span>粉丝</span>
      </div>
      <div class="fensi">
        <div class="fens love">
          <img src="../../assets/message/love.png" alt="" />
        </div>
        <span>赞</span>
      </div>
      <div class="fensi">
        <div class="fens at">
          <!-- <img src="../../assets/message/fens.png" alt="" /> -->
          @
        </div>
        <span>@</span>
      </div>
      <div class="fensi">
        <div class="fens message">
          <img src="../../assets/message/message.png" alt="" />
        </div>
        <span>评论</span>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import tabbar from '../../components/comcom/tabbar.vue'
</script>

<style lang="scss" scoped>
.top {
  box-sizing: border-box;
  width: 100%;
  height: 0.8rem;

  display: flex;
 justify-content: space-around;
  align-items: center;
}
.message {
   box-sizing: border-box;
  width: 100%;
  height: 78px;
   display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid beige;
  .fensi {
    text-align: center;
    font-size: 14px;
    width: 0.8rem;
    height: 1.3rem;

    .fens {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.8rem;
      height: 0.8rem;
      background: #4f88fb;
      img {
        width: 0.5rem;
        height: 0.4rem;
      }
    }
    .love{
      background: #F8355F;
    }
    .at{
      background: #1CC262;
    }
    .message{
     background: #A451E7;
    }
  }
}
</style>
