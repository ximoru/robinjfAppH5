<template>
<div class="warp">
  <section class="management-modular">
    <div class="management-modular-icon">
      <img :src="form.avatar || 'http://ofpd5oujq.bkt.clouddn.com/higher_default_header.png'" alt="avatar">
    </div>
    <div class="management-modular-title">
      <p>{{ form.groupName }}</p>
    </div>
    <div class="management-modular-tags clear">
      <div class="management-modular-tag_name left">投资风格：&emsp;</div>
      <div class="management-modular-tag-warp">
        <div class="management-modular-tag left"
          v-for="tag in tagList"
          :key="tag"
        >{{ tag }}</div>
      </div>
    </div>
  </section>

  <section class="management-card">
    <div class="management-card-title border-bottom">投资理念</div>
    <div class="management-card-content">{{ form.concept }}</div>
  </section>

  <section class="management-card">
    <div class="management-card-title border-bottom">大咖介绍</div>
    <div class="management-card-content">{{ form.memo }}</div>
  </section>

  <section class="management-card">
    <div class="management-card-title border-bottom">大咖相册</div>
    <div class="management-card-content">
      <div class="management-card-content-main">
        <ul>
          <li class="left" v-if="form.picPath1">
            <a :href="form.picPath1">
              <img :src="form.picPath1" alt="img">
            </a>
          </li>
          <li class="left" v-if="form.picPath2">
            <a :href="form.picPath2">
              <img :src="form.picPath2" alt="img">
            </a>
          </li>
          <li class="left" v-if="form.picPath3">
            <a :href="form.picPath3">
              <img :src="form.picPath3" alt="img">
            </a>
          </li>
          <li class="left" v-if="form.picPath4">
            <a :href="form.picPath4">
              <img :src="form.picPat4" alt="img">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="management-card">
    <div class="management-card-title border-bottom">历史账户收益曲线</div>
    <div class="management-card-content">
      <div class="management-card-content-main">
        <dl class="clear">
          <dt>
            <a :href="form.picPath4">
              <img :src="form.picPath4" alt="img" v-if="form.picPath4">
            </a>
          </dt>
          <dt>
            <a :href="form.picPath5">
              <img :src="form.picPath5" alt="img" v-if="form.picPath5">
            </a>
          </dt>
          <dt>
            <a :href="form.picPath6">
              <img :src="form.picPath6" alt="img" v-if="form.picPath6">
            </a>
          </dt>
        </dl>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'managementModular',
  data() {
    return {
      form: {
        tag: '',
      },
    }
  },
  computed: {
    tagList() {
      const tag = this.form.tag
      if (tag) return tag.split(',')
      return []
    },
  },
  mounted() {
    var body = document.getElementsByTagName('body')[0]
    document.title = '罗宾金服'
    var iframe = document.createElement("iframe")
    iframe.style.display="no"
    iframe.setAttribute("src", "http://named.cn/page/take/img/icon_phone.png")
    var d = function() {
      setTimeout(function() {
        iframe.removeEventListener('load', d)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', d)
    document.body.appendChild(iframe)
    this.getDetail()
  },
  methods: {
    getDetail() {
    const url = ' http://182.254.223.136:8887/group/getGroupInfo'
    const params = {
      groupUuid: this.$route.query.id,
    }

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      axios.post(url, {}, { params }).then(response => {
        console.log(response.data)
        this.form = response.data.data
      })
    },
  },
}
</script>

<style lang="sass">
.management-modular
  background-color: rgb(67, 47, 31)
  background-image: url(http://ofotg48ff.bkt.clouddn.com/banner_bg.png)
  background-size: 100%
  margin-bottom: 14px
  color: #fff
  padding-top: 12px
  .management-modular-icon
    background-color: #ccc
    width: 60px
    height: 60px
    border-radius: 50%
    overflow: hidden
    margin: 0 auto
    img
      width: 100%
  .management-modular-title
    img
      height: 60px
      width: 60px
    p
      font-size: 17px
      font-weight: bold
      text-align: center
      padding: 20px
  .management-modular-tags
    padding: 20px
    padding-left: 100px
    position: relative
    .management-modular-tag_name
      height: 34px
      line-height: 34px
      position: absolute
      left: 20px
    .management-modular-tag-warp
      .management-modular-tag
        height: 34px
        line-height: 34px
        padding:
          left: 20px
          right: 24px
        background-image: url(./b.png)
        background-size: 100% 100%
        background-repeat: no-repeat
        background-position: center
      & > div:first-child
        padding:
          left: 10px
        background-image: url(./f.png)
.management-card
  background-color: #fff
  padding-left: 20px
  margin-bottom: 14px
  .management-card-title
    font-size: 17px
    font-weight: bold
    padding: 18px 0
  .management-card-content
    color: #333
    line-height: 2
    padding: 18px 20px 18px 0
    overflow-x: scroll
    overflow-y: hidden
    letter-spacing: 0.05em
    .management-card-content-main
      position: relative
      height: 70px
      overflow: hidden
      margin: 0 1px
      ul
        height: 70px
        white-space: nowrap
        font-size: 0
        display: -webkit-box;
        overflow-x: auto
        -webkit-overflow-scrolling: touch
        /*隐藏掉滚动条*/
        ul::-webkit-scrollbar
          display: none;
        li
          display: inline-block
          vertical-align: top
          font-size: 0
          width: 100px
          height: 70px
          margin-right: 15px
          background-color: #ccc
          border-radius: 6px
          a
            width: 100%
            height: 100%
            display: black
            img
            width: 100%
      dl
        white-space: nowrap
        font-size: 0
        display: -webkit-box;
        overflow-x: auto
        -webkit-overflow-scrolling: touch
        dt
          margin-right: 15px
          width: 170px
          height: 70px
          background-color: #ccc
          border-radius: 6px
          display: inline-block
          vertical-align: top
          font-size: 0
          img
            width: 100%

</style>
