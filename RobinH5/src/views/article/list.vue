<template>
  <div class="warp">
    <section class="classroom-list" style="margin-top: 10px;">
      <router-link class="classroom-list-item border-bottom"
        v-for="item in list"
        :key="item.uuid"
        :to="{ name: 'classroomModular', query: { id: item.uuid } }"
      >
        <p>{{ item.className }}</p>
        <dl>
          <img :src="item.picPath" alt="pic">
        </dl>
      </router-link>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'articleList',
  data() {
    return {
      list: [],
      page: 0,
      pagesize: 12,
      classTypeUuid: 1,
    }
  },
  created() {
    this.classTypeUuid = this.$route.query.id || 1
    var body = document.getElementsByTagName('body')[0]
    document.title = this.title
    var iframe = document.createElement("iframe")
    iframe.style.display="none"
    iframe.setAttribute("src", "http://named.cn/page/take/img/icon_phone.png")
    var d = function() {
      setTimeout(function() {
        iframe.removeEventListener('load', d)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', d)
    document.body.appendChild(iframe)
  },
  mounted() {
    this.init()
    this.getList()
  },
  computed: {
    title() {
      return ['', '基础知识', '风险提示', '新手教程', '大咖观点'][this.classTypeUuid]
    },
  },
  methods: {
    init() {
      const body = document.getElementById('app')
      document.onscroll = () => {
        this._.onScrollToBottom(() => {
          this.getList()
        })
      }
    },
    getList() {
      const url = '/robin/public/bun/class/getClassList'
      const params = {
        page: this.page,
        pagesize: this.pagesize,
        showPosition: 2,
        classTypeUuid: this.classTypeUuid,
      }

      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      axios.post(url, {}, { params }).then(response => {
        console.log(response.data)
        const results = response.data
        this.list = [...this.list, ...results.data]
        this.page += 1
      })
    },
  },
  beforeDestroy() {
    document.onscroll = null
  },
}
</script>

<style lang="sass" scoped>
.classroom-header
  position: relative
  background-color: #fff
  margin-top: 10px
  .classroom-header-item
    height: 90px
    width: 25%
    text-align: center
    padding: 16px 0
    display: block
    img
      width: 30%
      margin-bottom: 5px
    p
      margin-top: 3px
  .classroom-header-line-warp
    width: 100%
    position: absolute
    left: 0
    top: 20px
    z-index: 0
    .classroom-header-line
      height: 40px
      width: 25%
      text-align: center
      padding: 16px 0
      border-color: rgb(234, 234, 234)
      img
        width: 30%
        margin-bottom: 5px
      p
        margin-top: 3px
.classroom-list
  background-color: #fff
  .classroom-list-header
    font-size: 17px
    padding: 12px
    background-color: rgb(244, 244, 244)
  .classroom-list-item
    display: block
    position: relative
    min-height: 94px
    padding: 12px 0
    p
      font-size: 14px
      line-height: 1.2
      padding:
        left: 20px
        right: 100px
      height: 100%
    dl
      height: 50px
      width: 90px
      background-color: #f4f4f4
      position: absolute
      right: 20px
      top: 12px
      img
        width: 100%
        border-radius: 3px
</style>
