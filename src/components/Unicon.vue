<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="unicon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox.camel="viewBox"
      :fill="fill"
      v-bind="$attrs"
      @click="$emit('click')"
      v-html="icon"
    />
  </div>
</template>

<script>
export default {
  name: 'Unicon',

  inheritAttrs: false,

  props: {
    name: {
      type: String,
      default: ''
    },
    iconStyle: {
      type: String,
      default: 'line'
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
    },
    viewBox: {
      type: String,
      default: '0 0 24 24'
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
      const icon = this.$options.lib.find(
        i => i.name === this.name && i.style === this.iconStyle
      )

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

<style>
.unicon {
  display: inline-block;
  fill: var(--uni-color-primary);
}
.uim-primary {
  opacity: 1;
}
.uim-secondary {
  opacity: 0.7;
}
.uim-tertiary {
  opacity: 0.5;
}
.uim-quaternary {
  opacity: 0.25;
}
.uim-quinary {
  opacity: 0;
}
</style>
