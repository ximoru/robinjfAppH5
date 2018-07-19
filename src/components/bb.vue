<template>
  <section class="bb border-bottom clear">
    <div class="t" :style="{ width: `${width}px` }">{{ label }}</div>
    <div class="c" :style="{ paddingLeft: `${width}px` }">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'bb',
  props: {
    label: String,
    width: Number,
  },
}
</script>

<style lang="sass">
section.bb
  line-height: 60px
  padding: 10px 0
  font-size: 14px
  position: relative
  background: #fff
  .t
    width: 100px
    color: #333
    position: absolute
    left: 0
    top: 0
    bottom: 0
    padding-left: 20px
  .c
    width: 100%
    height: 40px
    line-height: 40px

    input
      height: 100%
      font-size: 14px
      display: block
</style>
