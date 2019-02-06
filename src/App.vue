<template>
  <div id="app">
    <div class="top-header">
      <div class="desc support">
        support the developer, put a star to <a href="http://">
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
      <p>1000+ Pixel-perfect svg icons for your next project.</p>
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
        <div
          class="desc"
          style="text-align: right;"
        >
          Click by icon to copy html tag of component
        </div>
      </div>
      <div class="categories">
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
        v-if="!isNoResult"
        class="icons-list"
      >
        <div
          v-for="(i, idx) in searchedIcon"
          :key="idx"
          class="icons-list__item"
          @click="onCopy(i.name)"
        >
          <unicon :name="i.name" />
          <span class="icon-desc">{{ i.name }}</span>
        </div>
      </div>
      <div
        v-if="isNoResult"
        class="no-result"
      >
        Sorry, no result
      </div class="no-result">
      <transition name="fade">
        <div
          v-if="alert"
          class="overlay"
        >
          <h3>Tag copied</h3>
        </div>
      </transition>
      <!-- eslint-disable vue/no-v-html -->
      <textarea
        ref="html"
        style="opacity: 0"
        v-html="html"
      />
    </div>
  </div>
</template>

<script>
import Unicon from './components/Unicon'
import CarbonAd from './components/CarbonAd'
const icons = require('./icons.json')
const version = require('../package.json').version

export default {
  name: 'App',

  components: {
    Unicon,
    CarbonAd
  },

  data () {
    return {
      search: '',
      category: 'All',
      alert: false,
      html: '',
      version
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
    }
  },

  methods: {
    selectCat (cat) {
      this.category = cat
    },
    onCopy (name) {
      this.html = `<uni-icon name="${name}"></uni-icon>`
      this.showAlert()
      setTimeout(() => {
        this.$refs.html.select()
        document.execCommand('copy')
      }, 10)
    },
    showAlert () {
      this.alert = true
      setTimeout(() => {
        this.alert = false
      }, 500)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:700,400,300');

$color-main: royalblue;
$color-border: lighten($color-main, 32%);
$color-grey: #ddd;
$color-grey-2: #aaa;
$font-family: 'Roboto', sans-serif;

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
}

.top-header {
  margin-top: 40px;
  .support {
    margin-bottom: 20px;
    text-align: right;
    svg {
      position: relative;
      top: 6px;
    }
  }
}
.header {
  margin-top: 120px;
}

.content {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 120px 1fr;
  grid-template-areas:
    "top top"
    "side main";
  .top {
     grid-area: top;
  }
  .categories {
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
