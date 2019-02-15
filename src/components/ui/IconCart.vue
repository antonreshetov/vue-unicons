<template>
  <div class="icon-cart">
    <unicon
      name="shopping-basket"
      width="36"
      height="36"
    />
    <div class="count">
      {{ count }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconCart',

  props: {
    icons: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    count () {
      return this.icons.length
    }
  }
}
</script>

<style lang="scss">
.icon-cart {
  display: inline-block;
  position: relative;
  .count {
    position: absolute;
    display: flex;
    min-width: 21px;
    height: 21px;
    background-color: limegreen;
    border-radius: 100px;
    right: 0;
    bottom: 0px;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 11px;
    padding: 0 4px
  }
}
</style>
