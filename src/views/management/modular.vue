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
  <section class="management-content">
    <div class="management-content-tab">
       <ul>
         <li v-for="(item ,index) in tabs" :class="{current:num == index}" @click="index == num,tab(index)">{{item}}</li>
       </ul>
       <div class="management-tabMain">
        <div class="management-card" v-for="(itemCon, index) in arr" v-show="currentNum(index)">
          <div class="management-card-content">{{itemCon}}</div>
        </div>
      </div>
    </div>
  </section>
  <section class="management-card">
   <div class="management-card-title border-bottom">该大咖操作的相关信号源</div>
   <div class="management-card-content">
     <div class="management-card-content-main management-card-content-pic">
       <ul>
         <li @click="goPage(pics3.uuid)" class="" v-for="pics3 in pic3List" :key="pics3.uuid">
           <a ><img :src="pics3.bunmtAvatarpath" alt="pic3"></a>
           <p>{{pics3.bunmtUsername}}</p>
         </li>
       </ul>
     </div>
   </div>
  </section>
  <section class="management-card">
    <div class="management-card-title border-bottom">大咖相册</div>
    <div class="management-card-content">
      <div class="management-card-content-main">
        <ul>
          <li class="" v-for="pics in picList" :key="pics.id">
            <a :href="pics.pic"><img :src="pics.pic" alt="" >{{pics.name}}</a>
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
          <dt v-for="pics2 in pic2List" :key="pics2.id">
            <a :href="pics2.pic">
                <img :src="pics2.pic" alt="" >{{pics2.name}}
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
      arr: [],
      picList: [],
      pic2List: [],
      pic3List: [],
      tabs: ["投资理念", "罗宾点评" ,"大咖介绍"],
      num: 0,
      cur: true
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
    document.title = 'Robin Fin'
    var iframe = document.createElement("iframe")
    iframe.style.display="no"
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
    currentNum(index) {
      return this.num == index;
    },
    tab(index) {
      this.num = index;
    },
    getDetail() {
      const url = '/Group/getGroupByUuid'
      const params = {
        groupUuid: this.$route.query.id,
      }
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      axios.post(url, {}, { params }).then(response => {
        this.picList = response.data.data.pic_result.pics_1;
        this.pic2List = response.data.data.pic_result.pics_2;
        this.pic3List = response.data.data.masterList;
        this.form = response.data.data;
        this.arr.push(response.data.data.concept); //投资理念
        this.arr.push(response.data.data.comment) //罗宾点评
        this.arr.push(response.data.data.memo) //大咖介绍
      })
    },
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
    },
    /*跳转到信号源页面*/  
    goPage(id) { 
      const self = this;
      let u = navigator.userAgent, app = navigator.appVersion; 
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器 
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        //ios app 设备才执行
        self.setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('goPage', { 'uuid': id }, (response) => {
              alert(response);
            });
            return false
        });
      }else if(isAndroid) {
         window.android.openMaster(id);
         return false  
      }else { 
        alert("只能在 Android 或 ios 打开");
      }   
    },
    
  }
}
</script>

<style lang="sass">
.management-modular
  background-color: rgb(67, 47, 31)
  background-image: url(http://ofotg48ff.bkt.clouddn.com/banner_bg.png)
  background-size: 100%
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
        background-image: url(../../assets/b.png)
        background-size: 100% 100%
        background-repeat: no-repeat
        background-position: center
      & > div:first-child
        padding:
          left: 10px
        background-image: url(../../assets/ff.png)
.management-content 
  .management-content-tab
    ul
      margin-bottom: 2px
      background-color: #fff
      font-size: 0
      text-align: center
      .current 
        color: #caa14e
      .current::before
        content: ''
        width: 50%
        height: 3px;
        background-color: #caa14e
        position: absolute
        bottom: -2px
        left: 0
        right: 0
        text-align: left;
        margin: auto
        border-radius: 20px
      li
        position: relative
        font-size: 16px;
        line-height: 22px
        width: 33.3%
        display: inline-block
        vertical-align: top
        padding: 10px 0
        color:Rgba(51 51 51)
  .management-tabMain
    .management-card
      padding: 0 20px
.management-card
  background-color: #fff
  padding: 0 20px
  margin-bottom: 12px
  .management-card-title
    font-size: 17px
    font-weight: bold
    padding: 18px 0
  .management-card-content
    color: #333
    line-height: 2
    padding: 18px 0
    letter-spacing: 0.05em
    .management-card-content-main
      position: relative
      overflow: hidden
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
          width: 105px
          height: 70px
          margin-right: 10px
          background-color: #ccc
          border-radius: 6px
          left: none
          a
            width: 100%
            height: 70px
            display: block
            border-radius: 6px
            overflow: hidden
            img
              width: 100%

      dl
        white-space: nowrap
        font-size: 0
        display: -webkit-box;
        overflow-x: auto
        -webkit-overflow-scrolling: touch
        dt
          margin-right: 20px
          width: 170px
          height: 70px
          background-color: #ccc
          border-radius: 6px
          display: inline-block
          vertical-align: top
          font-size: 0
          a 
            width: 100%
            height: 70px
            display: block
            border-radius: 6px
            overflow: hidden
            img
              width: 100%
    .management-card-content-pic
      overflow: hidden
      ul
        height: auto
        padding: 10px 0
        li
          overflow: hidden
          background-color: #fff
          border-right: 1.5px solid #d7d3d8
          border-radius: 0
          margin-right: 0
          width: 100px
          height: auto
          p
            line-height: 22px
            padding-top: 10px
            text-align: center
            color: #4a4a4a
            font-size: 16px
            white-space: nowrap
          a
            width: 50px
            height: 50px
            border-radius: 50%
            display: block
            margin: auto
</style>
