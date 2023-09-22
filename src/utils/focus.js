export default function (app) {
  app.directive('focus', {
    mounted(el) {
      // console.log(el);
      // console.log("自定义指令获取焦点");
      el.focus()
    }
  })
}
