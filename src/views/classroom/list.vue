<template>
  <div class="warp">
    <section class="classroom-header clear">
      <div class="classroom-header-mian flex">
        <router-link v-for="(item, index) in items"  :key="item.uuid" :to="{ name: 'articleList', query: { id: item.uuid } }" class="classroom-header-item  flex-cols">
            <img :src="item.src" alt="">
            <p>{{item.typename}}</p>
        </router-link>
      </div>
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
      <router-link class="classroom-list-item border-bottom flex"
        v-for="item in list"
        :key="item.uuid"
        :to="{ name: 'classroomModular', query: { id: item.classUuid } }"
      >
        <p>{{ item.className }}</p>
        <dl class="flex-cols">
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
      classTypeUuid: 0,
      items: [],
      itemsImg:[
        {
          url: './static/1.png',
        },
        {
          url: './static/2.png',
        },
        {
          url: './static/3.png',
        },
        {
          url: './static/4.png',
        }
      ]
    }
  },
  mounted() {
    this.init()
    this.getList()
    this.getTypeList()
  },
  methods: {
    init() {
      var body = document.getElementsByTagName('body')[0]
      document.title = 'Robin Fin'
      var iframe = document.createElement("iframe")
      iframe.style.display="none"
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
    /*文章title接口*/
    getTypeList() {
      const url = '/Class/getClassTypeList';   
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios.post(url).then(response => {
        this.items = response.data.data
        for (let i =0, len = this.items.length; i<len; i++){
           this.items[i].src = this.itemsImg[i].url;
        }
        this.classTypeUuid = response.data.data[0].uuid;

      });

    },
    /*全部文章接口*/
    getList() {
      const url = '/Class/listPage'
      this.classTypeUuid = this.$route.query.id || 1
      const params = {
        page: this.page,
        pagesize: this.pagesize,
        classTypeUuid: '',
      }
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      axios.post(url, {}, { params }).then(response => {
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
  overflow: hidden
  .classroom-header-mian
    white-space: nowrap;
    height: 90px
    overflow-x: auto
    font-size: 0
    -webkit-overflow-scrolling: touch
    ul::-webkit-scrollbar
      display: none
    .classroom-header-item
      height: 90px
      width: 25%
      text-align: center
      padding: 16px 0
      // display: inline-block
      // vertical-align: top
      img
        width: 30%
        margin-bottom: 5px
      p
        margin-top: 3px
        font-size: 14px
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
        right: 110px
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
