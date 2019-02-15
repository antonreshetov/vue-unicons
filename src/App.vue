<template>
  <div id="app">
    <div class="top-header">
      <div class="desc support">
        support the developer, put a star to <a href="https://github.com/antonreshetov/vue-unicons">
          GitHub
        </a> repo <unicon
          name="grin-tongue-wink-alt"
          fill="limegreen"
        />
      </div>
      <carbon-ad />
    </div>
    <div class="header">
      <h1>
        Vue Unicons<span class="version">
          <span>{{ version }}</span>
        </span>
      </h1>
      <p>
        1000+ Pixel-perfect svg
        <a href="https://github.com/iconscout/unicons">
          unicons
        </a>
        for your next project as Vue components
      </p>
      <p>
        Documentation
        <a href="https://github.com/antonreshetov/vue-unicons">
          here
        </a>.
      </p>
      <div class="demo">
        <code>&lt;unicon name=&quot;constructor&quot; fill=&quot;royalblue&quot; /&gt;</code>
        <unicon
          name="constructor"
          fill="royalblue"
        />
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="search-input">
          <input
            v-model="search"
            class="search-input__inner"
            type="text"
            placeholder="Type to search"
          >
          <unicon name="search" />
        </div>
        <div class="copy-click">
          <div class="desc">
            <div
              class="show-cart-toggle"
              @click="toggleCartShow"
            >
              <span v-if="!showCartView">
                Show cart
              </span>
              <span v-else>
                Hide cart
              </span>
            </div>
            <icon-cart :icons="iconCart" />
          </div>
        </div>
      </div>
      <div
        v-if="showCartView"
        class="cart-view"
      >
        <div
          ref="code"
          class="instruction"
        >
          <h3>Usage</h3>
          <!-- eslint-disable vue/no-v-html -->
          <pre v-html="code" />
        </div>
        <h3>Icons</h3>
        <div class="icons-list">
          <div
            v-for="(i, idx) in iconCart"
            :key="idx"
            class="icons-list__item"
            :class="{'icons-list__item--active': isInCart(i)}"
          >
            <unicon :name="i.name" />
            <span class="icon-desc">
              {{ i.name }}
            </span>
            <div
              class="icons-list__item-remove"
              @click="removeFromCart(idx)"
            >
              <unicon name="times" />
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="!showCartView"
        class="categories"
      >
        <h4>Categories</h4>
        <ul class="categories__list">
          <li
            v-for="cat in categories"
            :key="cat"
            class="categories__list-item"
            :class="{'active': cat === category}"
            @click="selectCat(cat)"
          >
            {{ cat }}
          </li>
        </ul>
      </div>
      <div
        v-show="!isNoResult && !showCartView"
        class="icons-list"
      >
        <div
          v-for="(i, idx) in searchedIcon"
          :key="idx"
          class="icons-list__item"
          :class="{'icons-list__item--active': isInCart(i)}"
          @click="addToCart(i)"
        >
          <unicon :name="i.name" />
          <span class="icon-desc">
            {{ i.name }}
          </span>
        </div>
      </div>
      <div
        v-if="isNoResult"
        class="no-result"
      >
        Sorry, no result
      </div>
    </div>
  </div>
</template>

<script>
import CarbonAd from './components/CarbonAd'
import IconCart from './components/ui/IconCart'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
const icons = require('./demo.json')
const version = require('../package.json').version

export default {
  name: 'App',

  components: {
    CarbonAd,
    IconCart
  },

  data () {
    return {
      search: '',
      category: 'All',
      alert: false,
      html: '',
      version,
      toggle: false,
      iconCart: [],
      showCartView: false
    }
  },

  computed: {
    icons () {
      return icons
    },
    searchedIcon () {
      const icons = this.icons.filter(i => i.category === this.category)
      const re = new RegExp(this.search.toLowerCase())

      if (icons.length) {
        return icons.filter(i => i.tags.find(t => re.test(t)))
      } else return this.icons.filter(i => i.tags.find(t => re.test(t)))
    },
    categories () {
      let categories = icons.map(i => i.category)
      categories = icons.map(i => i.category)
      categories = categories.filter((v, i, a) => a.indexOf(v) === i)
      categories = categories.sort()
      categories.unshift('All')

      return categories
    },
    isNoResult () {
      return this.searchedIcon.length === 0
    },
    code () {
      let iconName = this.iconCart.map(i => {
        return `${i.nameFormatted}`
      })
      iconName = iconName.join(', ')
      const code = `import Vue from 'vue'
import App from './App.vue'
import Unicon from 'vue-unicons'
import { ${iconName} } from 'vue-unicons/src/icons'

Unicon.add([${iconName}])
Vue.use(Unicon)

new Vue({
  render: h => h(App)
}).$mount('#app')`

      return Prism.highlight(code, Prism.languages.javascript, 'javascript')
    }
  },

  created () {
    this.getFromLocalStorage()
  },

  methods: {
    selectCat (cat) {
      this.category = cat
    },
    addToCart (icon) {
      const index = this.iconCart.findIndex(i => i.name === icon.name)

      if (index === -1) {
        this.iconCart.push(icon)
        this.storeToLocalStorage()
      } else {
        this.iconCart.splice(index, 1)
        this.storeToLocalStorage()
      }
    },
    removeFromCart (index) {
      this.iconCart.splice(index, 1)
      this.storeToLocalStorage()
    },
    isInCart (icon) {
      const isInCart = this.iconCart.findIndex(i => i.name === icon.name) !== -1
      return isInCart
    },
    storeToLocalStorage () {
      const icons = JSON.stringify(this.iconCart)
      window.localStorage.setItem('icons', icons)
    },
    getFromLocalStorage () {
      const icons = window.localStorage.getItem('icons')
      if (icons) this.iconCart = JSON.parse(icons)
    },
    toggleCartShow () {
      this.showCartView = !this.showCartView
      this.$bus.$emit('cart')
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/vars";

* {
  box-sizing: border-box;
}

#app {
  font-family: $font-family;
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 80px;
  position: relative;
}

a {
  color: $color-main;
  display: inline-block;
}

.top-header {
  margin-top: 40px;
  @media (max-width: $sm) {
    margin-top: 20px;
  }
  @media (max-width: $xs) {
    margin-top: 0px;
  }
  .support {
    margin-bottom: 20px;
    text-align: right;
    @media (max-width: $sm) {
      text-align: center;
    }
    svg {
      position: relative;
      top: 6px;
    }
  }
}
.header {
  margin-top: 120px;
  @media (max-width: $sm) {
    text-align: center;
    margin-top: 160px;
  }
}

.content {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 120px 1fr;
  grid-template-areas:
    "top top"
    "side main";
  @media (max-width: $sm) {
    display: block;
  }
  .top {
    grid-area: top;
    @media (max-width: $xs) {
      margin: 40px 0;
    }
  }
  .show-cart-toggle {
    cursor: pointer;
    display: inline-block;
    padding: 5px 0;
    position: relative;
    top: -10px;
    margin-right: 10px;
  }
  .cart-view {
    grid-column:  span 2;
    .instruction {
      pre {
        width: 100%;
        border: none;
        border-radius: 3px;
        font-size: 14px;
        overflow: auto;
        line-height: 24px;
        background-color: #2d2d2d;
        padding: 20px;
        color: #fff;
      }
    }
    .icons-list {
      grid-template-columns: repeat(8, 1fr);
      &__item {
        cursor: default;
        height: 116px;
      }
    }
  }
  .categories {
    @media (max-width: $sm) {
      display: none;
    }
    h4 {
      font-size: 14px;
      margin-top: 0;
      text-transform: uppercase;
    }
    &__list {
      grid-area: side;
      margin: 0;
      padding: 0;
      &-item {
        list-style: none;
        cursor: pointer;
        padding: 5px 0;
        font-weight: 300;
        color: $color-grey-2;
        &:hover {
          color: $color-main;
        }
        &.active {
          color: $color-main;
          font-weight: 600;
        }
      }
    }
  }
  .icons-list {
    grid-area: main;
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(min-content, max-content);
    grid-gap: 10px;
    justify-content: center;
    max-height: 700px;
    @media (max-width: $sm) {
      grid-template-columns: repeat(5, 1fr);
      overflow-y: visible;
    }
    @media (max-width: $xs) {
      grid-template-columns: repeat(3, 1fr);
    }
    &__item {
      display: flex;
      width: 100%;
      height: 105px;
      border: 1px solid $color-border;
      border-radius: 3px;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.2s;
      cursor: pointer;
      &-remove {
        position: absolute;
        top: 0;
        right: 0;
        padding: 3px;
        cursor: pointer;
        &:hover {
          svg {
            fill: red;
          }
        }
        svg {
          fill: #aaa;
        }
      }
      svg {
        transition: all 0.2s;
      }
      @media (max-width: $sm) {
        height: 113px;
      }
      &--active {
        background: lighten($color-border, 9%);
        > svg {
          fill: $color-main;
        }
      }
      .icon-desc {
        font-size: 12px;
        color: $color-grey-2;
        position: absolute;
        bottom: 3px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80px;
        overflow: hidden;
        text-align: center
      }
    }
  }
}

.search-input {
  margin-bottom: 20px;
  position: relative;
  &__inner {
    -webkit-appearance: none;
    border-radius: 3px;
    outline: none;
    border: 1px solid $color-border;
    line-height: 50px;
    padding: 0 40px;
    height: 50px;
    background-color: transparent;
    font-size: 14px;
    width: 100%;
    transition: border-color 0.3s;
    color: $color-main;
    font-size: 16px;
  }
  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    fill: $color-grey-2;
  }
}

.demo {
  @media (max-width: $xs) {
    display: none;
  }
  code {
    background: #eee;
    padding: 0 10px;
    line-height: 30px;
    border-radius: 3px;
    display: inline-block;
    font-size: 16px;
    font-family: "Courier New", Courier, monospace;
  }
  svg {
    position: relative;
    top: 7px;
    margin-left: 10px;
  }
  margin-bottom: 30px;
}

.no-result {
  text-align: center;
  margin-top: 50px;
}

.desc {
  font-size: 12px;
  color: $color-grey-2;
}

.version {
  font-size: 12px;
  background-color: limegreen;
  padding: 2px 5px;
  border-radius: 3px;
  color: #fff;
  position: relative;
  font-weight: 400;
  bottom: 4px;
  margin-left: 10px;
}

.overlay {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  h3 {
    font-size: 24px;
  }
}

.copy-click {
  text-align: right;
  @media (max-width: $sm) {
    display: none;
  }
  .active {
    color: $color-main;
  }
  .toggle {
    position: relative;
    top: 6px;
    margin: 0 5px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.5, 1.5);
}
</style>
