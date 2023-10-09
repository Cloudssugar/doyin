export default {
  /**
   * 滚动到底部后，上拉一下再执行
   * @param fun 执行的方法
   * @param params 执行方法的参数
   */
  getMoreOfScroll(fun, params) {
    console.log('触发了滚动事件！！！')
    //变量scrollTop是滚动条滚动时，距离顶部的距离  盒子被卷去的高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    //变量scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    //滚动条到底部的条件
    // 盒子可视区的高度 + 滚动卷去的高度 >= 整个滚动文件的高度，即可检测到已经触底，发送网络请求即可。
    //这里减去15，让滚动条快到底部时就开始执行方法
    //由于没有滚动条还没有到底部时就开始执行方法，滚动过程中可能会多次执行方法，需要在组件使用时限制一下
    if (scrollTop + windowHeight >= scrollHeight - 15) {
      fun(params)
    }
  }
}
