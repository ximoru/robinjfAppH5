<template>
  <div class="z-select">
    <select v-model="currentValue">
      <option value="" label="请选择">请选择</option>
      <option
        v-for="item in data"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      >{{ item.label }}</option>
    </select>
    <dl class="left hidden" :style="{maxWidth: `${width}px`}">{{ name || '请选择'}}</dl>
    <img class="left" src="./z.jpg" alt="z">
  </div>
</template>

<script>
export default {
  name: 'z-select',
  props: {
    data: Array,
    value: [String, Number],
    width: Number,
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.currentValue = val
        this.$emit('input', val)
      },
    },
    currentValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
  },
  computed: {
    name() {
      let name = '请选择'
      for (let i = 0, l = this.data.length; i < l; ++i) {
        if (this.currentValue === this.data[i].value) {
          name = this.data[i].label
        }
      }
      return name
    },
  },
  data() {
    return {
      currentValue: '',
    }
  },
}
</script>

<style lang="sass">
.z-select
  position: relative
  height: 60px
  line-height: 60px
  width: 100%
  color: #333
  select
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    opacity: 0
  img
    height: 40px
    width: 40px
    margin-top: 11px
</style>
