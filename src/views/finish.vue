<template>
  <div class="finish">
    <h1>资料已成功提交</h1>
    <img src="./f.png" alt="f">
    <p>
      账户审核需要3-7个工作日，审核通过后会有通知，请注意查收邮件。
    </p>
    <a href="http://www.baidu.com"><button>返回首页</button></a>
  </div>
</template>

<script>
export default {
  name: 'finish',
}
</script>

<style lang="sass">
.finish
  padding: 20px 10px
  text-align: center
  background-color: #fff
  height: 100%
  min-height: 100%
  h1
    font-size: 16px
    color: #333333
    letter-spacing: 0
    text-align: center
    font-weight: normal
  img
    width: 120px
    margin-top: 20px
    margin-bottom: 20px
  p
    width: 261px
    font-size: 14px
    color: #9B9B9B
    letter-spacing: 0
    text-align: center
    line-height: 19px
    margin: 0 auto
    padding-bottom: 32px
</style>
