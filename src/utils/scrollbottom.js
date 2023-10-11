
//自定义指令-列表新增元素后自动滚动底部
export default function (app) {
  app.directive('scrollbottom', {
    updated(el) {
      // 这里的el即是绑定指令处的dom元素
      el.scrollTo({
        top: el.scrollHeight - el.clientHeight,
        behavior: 'smooth'
      })
    }
  })
}
