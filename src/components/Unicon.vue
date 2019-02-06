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
const icons = require('../icons.json')

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

  data () {
    return {

    }
  },

  computed: {
    icon () {
      let icon = icons.find(i => i.name === this.name)

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

<style lang="scss">

</style>
