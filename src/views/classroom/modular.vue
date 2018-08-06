<template>
	<div class="warp">
		<div class="classroom-modular">
			<dl class="classroom-modular-title">{{ form.className }}</dl>
			<dl class="classroom-modular-content" v-html="form.content"></dl>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'classroomModular',
	data() {
		return {
			form: {},
		}
	},
	mounted() {
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
		this.getDetail();
	},
	methods: {
		getDetail() {
			const url = '/Class/detail'
			const params = {
				classUuid: this.$route.query.id,
			}
			axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
			axios.post(url, {}, { params }).then(response => {
				this.form = response.data.data;
				this.shareExport() 
			})	
		},
		/*分享地址方法暴露给ios*/
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
	    shareExport() {
	    	const self = this;
	    	const classUuid = this.$route.query.id;
	    	const data ={
	    		title: this.form.className,
	    		id: classUuid ,
	    		adress: 'http://api.robinjf.com/class/share?uuid=1C0FD6EF0C6E49F89BAC95B4755E86D7" '+classUuid+' ',
	    	}
	    	let u = navigator.userAgent, app = navigator.appVersion; 
	      	let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器 
	      	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	      	if (isiOS){
		    	self.setupWebViewJavascriptBridge((bridge) => {
		            bridge.callHandler('shareAction',data, ( response) => {
		              /*alert(response);*/
		            });
		            return false
		        });
	      	} else if (isAndroid){
	      		
	      	} else {

	      	}

	    },

	}
}
</script>

<style lang="sass">
.classroom-modular
	background-color: #fff
	.classroom-modular-title
		font-size: 17px
		line-height: 1.5
		text-align: center
		padding: 24px 0
	.classroom-modular-content
		padding: 0 20px
		line-height: 1.5
		img
			width: 100%
</style>
