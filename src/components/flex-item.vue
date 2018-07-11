<template>
  <div class="z-flexbox-item hidden">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FlexItem',
}
</script>

<style lang="sass">
.z-flexbox-item
  flex: 1
  margin-left: 8px
  min-width: 10px
  &:first-child
    margin-left: 0
</style>