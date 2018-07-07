<template>
  <div class="warp">
    <section class="classroom-header clear">
      <router-link class="classroom-header-item left"
        :to="{ name: 'articleList', query: { id: 1 } }"
      >
        <img src="./1.png" alt="img">
        <p>基础知识</p>
      </router-link>
      <router-link class="classroom-header-item left"
        :to="{ name: 'articleList', query: { id: 2 } }"
      >
        <img src="./2.png" alt="img">
        <p>风险提示</p>
      </router-link>
      <router-link class="classroom-header-item left"
        :to="{ name: 'articleList', query: { id: 3 } }"
      >
        <img src="./3.png" alt="img">
        <p>新手教程</p>
      </router-link>
      <router-link class="classroom-header-item left"
        :to="{ name: 'articleList', query: { id: 4 } }"
      >
        <img src="./4.png" alt="img">
        <p>大咖观点</p>
      </router-link>

      <div class="classroom-header-line-warp clear">
        <router-link class="classroom-header-line left border-right"
          :to="{ name: 'articleList', query: { id: 1 } }"
        ></router-link>
        <router-link class="classroom-header-line left border-right"
          :to="{ name: 'articleList', query: { id: 2 } }"
        ></router-link>
        <router-link class="classroom-header-line left border-right"
          :to="{ name: 'articleList', query: { id: 3 } }"
        ></router-link>
        <router-link class="classroom-header-line left"
          :to="{ name: 'articleList', query: { id: 4 } }"
        ></router-link>
      </div>
    </section>

    <section class="classroom-list">
      <div class="classroom-list-header">全部文章</div>
      <router-link class="classroom-list-item border-bottom"
        v-for="item in list"
        :key="item.uuid"
        :to="{ name: 'classroomModular', query: { id: item.classUuid } }"
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
  name: 'classroomList',
  data() {
    return {
      topList: [],
      list: [],
      page: 0,
      pagesize: 12,
      classTypeUuid: 1,
    }
  },
  mounted() {
    this.init()
    this.getList()
  },
  methods: {
    init() {
      var body = document.getElementsByTagName('body')[0]
      document.title = '罗宾金服'
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

      document.onscroll = () => {
        this._.onScrollToBottom(() => {
          this.getList()
        })
      }
    },
    getList() {
      const url = '/Class/listPage'
      this.classTypeUuid = this.$route.query.id || 1
      const params = {
        page: this.page,
        pagesize: this.pagesize,
        classTypeUuid: 5,
      }

      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      axios.post(url, {}, { params }).then(response => {
        console.log(response.data)
        const results = response.data
        console.log(results)
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
