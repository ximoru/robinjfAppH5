<template>
	<div class="cooperation">
    <ul>
      <li @click="gotoOpenAccount()">
        <img src="static/logo-blue.png" alt="">
        <dl>
          <dt>IFM Trade</dt>
          <dd>IFM Trade 是澳洲经验最为丰富的外汇交易商之一，从2012年起为客户提供全球金融市场产品。</dd>
        </dl>
      </li>
      <li @click="gotoOpenAccount()">
        <img src="static/trademax-logo.png" alt="">
        <dl>
          <dt>TradeMax</dt>
          <dd>TradeMax是世界领先的在线外汇交易平台，最值得信赖的外汇交易商之一，TradeMax受全球认证的澳洲顶级ASIC监管。。</dd>
        </dl>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'cooperation',
    created() {
      // 获取链接参数phone,然后存进内存中
      this.phone = this.$route.query.phone;
    },
    mounted() {
      // this.init()
      this.changeTitle ()
    },
    methods: {
      // init(){
      //   var body = document.getElementsByTagName('body')[0]
      //   document.title = '选择经济商'
      // },
      gotoOpenAccount () {
        this.$router.push({
          name: 'register',
          query: {phone:this.phone}
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
      returnBack () {
        const self = this;
        let u = navigator.userAgent, app = navigator.appVersion; 
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
          self.setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('pop', (response) => {
              });
              return false
          }); 
        }
      },
      changeTitle () {
        const self = this;
        let u = navigator.userAgent, app = navigator.appVersion; 
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
          self.setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('changeTitle',{title: '选择经纪商'}, (response) => {
              });
              return false
          }); 
        }
      },
      
    }
  }
</script>
<style scoped>
	.cooperation li{
    background-color: #fff;
    padding:20px 15px;
    margin-top: 10px
  }
  .cooperation li img{
    width: 110px;
    height:60px;
    float: left;
    border: 1px solid #eaeaea;
    padding: 10px;
    margin-right:15px;
  }
  .cooperation dl{
    overflow: hidden;
    color: #333;
    font-size: 16px;
    text-align: justify;
  }
  .cooperation dt{
    font-size: 20px;
    color: #000;
    padding-bottom:10px;
    font-weight: 700;
   
  }
  .cooperation dd{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow:hidden;
    line-height:1.2;
  }

</style>
