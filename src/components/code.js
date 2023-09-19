import { ref } from 'vue'
import axios from 'axios'

// 封装方法   只需要传入手机号、 type类型
export const useSendCode = (email, type) => {
  // 定义定时器初始值为0
  const timer = ref(0)
  // 定义form变量 如果用了vant 记得要给vanForm 绑定ref
  const form = ref()
  // 定义定时器id 为了清除定时器
  let timerId
  // 之后页面调用send方法来使用
  const send = async () => {
    // 第二次点击 大于0时 直接 return
    if (timer.value > 0) return
    // 校验 mobile字段 要和 van-field 中的name保持一直 否则校验失败 如果校验失败则不走下面代码  注意await
    // await form.value?.validate('mobile')
    // // 校验通过调用接口
    axios.get(`http://43.138.15.137:3000/api/common/user/getCode/${email.value}`).then((res) => {
      console.log(res)
    })
    // await getCode(email.value, type)
    // 赋值倒计时  可修改成自己需要的时间
    timer.value = 10
    // 如果之前id存在可清除
    if (timerId) clearInterval(timerId)
    // 赋值定时器id
    timerId = setInterval(() => {
      // 时间-1
      timer.value--
      // 倒计时结束 清除定时器
      if (timer.value == 0) clearInterval(timerId)
    }, 1000)
  }
  //
  onMounted(() => {
    clearInterval(timerId)
  })
  return { timer, send, form }
}
