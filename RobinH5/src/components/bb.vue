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
  font-size: 14px
  position: relative
  .t
    width: 100px
    color: #333
    position: absolute
    left: 0
    top: 0
    padding-left: 20px
  .c
    width: 100%
    input
      font-size: 14px
      height: inherit
      line-height: inherit
      display: block
</style>
