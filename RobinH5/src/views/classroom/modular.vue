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
		this.getDetail()
	},
	methods: {
		getDetail() {
			const url = 'Class/listPage'
			const params = {
				classUuid: this.$route.query.id,
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
