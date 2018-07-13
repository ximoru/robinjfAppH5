<template>
  <div class="z-header border-bottom">
    <div class="z-header-left">
      <img
        @click="$router.go(-1)" v-if="!noback"
        src="../assets/arrow/left.png" alt="back">
    </div>
    <div class="z-header-title">
      <slot></slot>
    </div>
    <div class="z-header-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZHeader',
  props: {
    title: {
      type: String,
      default: 'OA',
    },
    noback: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="sass">
.z-header
  position: fixed
  left: 0
  right: 0
  top: 0
  z-index: 2
  display: flex
  align-items: center
  height: 45px
  background-color: #fff
  color: #000
  .z-header-left,
  .z-header-title,
  .z-header-right
    height: 100%
    display: flex
    flex: 1
    align-items: center
  .z-header-left
    font-size: 16px
    > img
      display: inline-block
      width: 24px
  .z-header-title
    justify-content: center
    font-size: 18px
    white-space: nowarp
    color: #000
  .z-header-right
    justify-content: flex-end
    font-size: 16px
    margin:
      right: 15px
</style>
