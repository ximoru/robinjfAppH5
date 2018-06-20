<template>
  <div class="z-flexbox"
    :class="[
      `z-flexbox-justify-${justify}`,
      `z-flexbox-align-${align}`,
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'flex',
  props: {
    align: {
      type: String,
      default: 'center',
    },
    justify: {
      type: String,
      default: 'center',
    },
  },
}
</script>

<style lang="sass">
.z-flexbox
  display: flex
  text-align: left
  align-items: center

  &.z-flexbox-align-start
    align-items: start
  &.z-flexbox-align-end
    align-items: end
  &.z-flexbox-align-center
    align-items: center
  &.z-flexbox-align-baseline
    align-items: baseline
  &.z-flexbox-align-stretch
    align-items: stretch

  &.z-flexbox-justify-start
    justify-content: flex-start
  &.z-flexbox-justify-end
    align-items: flex-end
  &.z-flexbox-justify-center
    justify-content: center
  &.z-flexbox-justify-between
    justify-content: space-between
  &.z-flexbox-justify-around
    align-items: space-around
</style>
