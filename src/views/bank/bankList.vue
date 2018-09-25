<template>
	<div class="bankList">
		<div class="text">绑定的银行卡支持的银行列表</div>
        <div class="hint pb10">平台目前支持17家银行，详细如下（<a href="#" @click="goBankPage()"><span class="blue">点击此处</span>可绑定银行卡</a>）：</div>
        <div class="title">储蓄卡</div>
        <ul class="list">
          <li>中国银行</li>
          <li>工商银行</li>
          <li>农业银行</li>
          <li>建设银行</li>
          <li>邮政银行</li>
          <li>兴业银行</li>
        </ul>
	</div>
</template>

<script>

export default {
  name: 'bankList',
  methods: {
  	setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge){ return callback(WebViewJavascriptBridge); }
      if (window.WVJBCallbacks){ return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function(){ document.documentElement.removeChild(WVJBIframe) }, 0);
    },
    /*跳转到绑定银行卡页面*/  
    goBankPage() { 
      var self = this;
      var u = navigator.userAgent, app = navigator.appVersion; 
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS){
         //ios app 设备才执行
          self.setupWebViewJavascriptBridge((bridge) => {
                bridge.callHandler('addCard', (response) => {
                });
                return false
            });
          }else if(isAndroid) {
            window.android.openAddBank();
          }
    }
  }
}
</script>
<style type="text/css">
  @import '../../assets/css/bankList.css'
</style>
