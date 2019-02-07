<template>
  <!-- eslint-disable vue/no-v-html -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :fill="fill"
    @click="$emit('click')"
    v-html="icon"
  />
</template>

<script>

export default {
  name: 'Unicon',

  props: {
    name: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 24
    },
    height: {
      type: [String, Number],
      default: 24
    },
    fill: {
      type: String,
      default: 'inherit'
    }
  },

  lib: [],

  add (icons) {
    if (Array.isArray(icons)) {
      this.lib = icons
    } else {
      this.lib.push(icons)
    }
  },

  computed: {
    icon () {
      const icon = this.$options.lib.find(i => i.name === this.name)

      if (icon) {
        return icon.path
      } else {
        console.error('Name of the icon is not correct')
        return undefined
      }
    }
  }
}
</script>
