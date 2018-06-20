// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import * as util from 'ct-util'
import App from './App'
import router from './router'

import ZHeader from './components/header'
import zSelect from './components/z-select'
import bb from './components/bb'
import zCheckbox from './components/z-checkbox'
import flex from './components/flex'
import flexItem from './components/flex-item'

require('./sass/comm.sass')

Vue.prototype._ = util

Vue.component(ZHeader.name, ZHeader)
Vue.component(zSelect.name, zSelect)
Vue.component(bb.name, bb)
Vue.component(zCheckbox.name, zCheckbox)
Vue.component(flex.name, flex)
Vue.component(flexItem.name, flexItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})