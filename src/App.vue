<template>
  <div id="app">
    <!-- <loading v-show="loading" class="load">
      <p>下拉可以刷新</p>
      <p>松开立即刷新</p>
    </loading> -->
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key() {
      return this.$route.name !== undefined ?
      this.$route.name + +new Date()
      : this.$route + +new Date()
    },


  },
}
</script>