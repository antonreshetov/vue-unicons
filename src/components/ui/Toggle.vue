<template>
  <div
    class="toggle"
    :class="{'toggle--active': value}"
    @click="toggle"
  />
</template>

<script>
export default {
  name: '',

  model: {
    prop: 'value',
    event: 'click'
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    toggle () {
      this.$emit('click', !this.value)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/vars";

.toggle {
  display: inline-block;
  border: 1px solid $color-border;
  height: 20px;
  width: 40px;
  line-height: 20px;
  position: relative;
  border-radius: 100px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-color: royalblue;
    top: 1px;
    left: 1px;
    transition: all .2s;
  }
  &--active {
    &::after {
      left: 100%;
      margin-left: -17px;
    }
  }
}
</style>
