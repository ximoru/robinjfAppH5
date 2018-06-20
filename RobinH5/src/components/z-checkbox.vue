<template>
  <div class="z-checkbox"
    :class="{ 'z-checkbox-indeterminate': indeterminate, 'readonly': readonly, 'disabled': disabled }"
  >
    <label @click="prevent">
      <span :class="{ 'checked': getChecked, 'radio': type === 'radio', 'checkbox': type === 'checkbox' }">
        <input v-if="type === 'checkbox'" type="checkbox" :value="content" v-model="currentValue">
        <input v-else type="radio" :value="content" v-model="currentValue">
      </span>
      {{ label }}
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'zCheckbox',
  props: {
    type: {
      default: 'radio',
      validator: value => ['checkbox', 'radio'].indexOf(value) > -1,
    },
    content: {
      default: '',
    },
    label: {
      default: '',
    },
    value: {
      default: '',
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    readonly: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      currentValue: this.value,
      isGroup: false,
      parent: null,
    }
  },
  computed: {
    getChecked() {
      // 非group下的checkbox, content只用于type=radio的情况,用于识别选中了哪个radio
      if (this.type === 'checkbox') {
        return !!this.currentValue
      }
      return this.currentValue.toString() === this.content.toString()
    },
  },
  watch: {
    currentValue(val) {
      // 防止多次更新
      if (val === this.value) return false
      // 通过emit一个input事件来更新v-model数据
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value: {
      immediate: true,
      handler(val) {
        this.setCurrentValue(val)
      },
    },
  },
  methods: {
    prevent(e) {
      if (this.readonly || this.disabled) e.preventDefault()
    },
    setCurrentValue(value) {
      if (value === this.currentValue) return
      this.currentValue = value
    },
  },
}
</script>

<style lang="sass">
$color-main: #9BA9F7

.z-checkbox
  position: relative
  display: inline-block
  user-select: none
  // height: 60px
  // line-height: 60px
  font-size: 17px
  &.readonly:before,
  &.disabled:before
    content: ''
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 1
    cursor: not-allowed
  &.readonly label
    cursor: default
    color: #ccc
  &.disabled:before
    cursor: not-allowed
  &.disabled label
    cursor: not-allowed
    color: #ccc
    & > span
      border-color: #cccccc
      background-color: #d3d3d3
  label
    display: block
    position: relative
    -webkit-tap-highlight-color: #fff
    user-select: none
    & > span
      margin-top: -3px
      display: inline-block
      width: 16px
      height: 16px
      border-radius: 0
      -webkit-appearance: none
      outline: none
      transition: all ease .2s
      -webkit-user-select: none
      // background-color: #1B2B84
      border: 2px solid #9B9B9B
      vertical-align: middle
      background: #fff
      transition: all 0.3s
      &.radio
        border-radius: 50%
        &.checked
          background-color: #fff
          border: 1px solid #1B2B84
          background: $color-main
      &.checkbox
        border-radius: 50%
        &.checked
          border-color: #1B2B84
          background-color: #1B2B84
          user-select: none
          &::after
            content: ''
            position: absolute
            left: -2px
            top: 21px
            height: 9px
            width: 5px
            border-right: 2px solid #fff
            border-bottom: 2px solid #fff
            opacity: 1
            transform: translate3d(8px,-16px,0) rotateZ(45deg) scale(1)
    input[type=checkbox],
    input[type=radio]
      display: inline-block
      height: 0
      width: 0
      user-select: none
      position: absolute
      left: -9999px

</style>
