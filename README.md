# Vue Unicons

<img src="./src/assets/hero.png" alt="logo of vue-unicons repository">

1000+ Pixel-perfect svg [unicons](https://github.com/iconscout/unicons) for your next project as Vue components

## Demo

[https://antonreshetov.github.io/vue-unicons](https://antonreshetov.github.io/vue-unicons/)

## Install

### NPM

Installing with npm is recommended and it works seamlessly with webpack.

```js
npm i vue-unicons
```

### Download

You can download latest version from the Github: [Download](https://github.com/antonreshetov/vue-unicons)

## Quick start

### Global

To use in your project, just import vue-unicons and install into Vue.

main.js

```js
import Vue from 'vue'
import App from './App.vue'
import Unicon from 'vue-unicons'

Vue.use(Unicon)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

App.vue

```html
<template>
  <unicon name="constructor" fill="royalblue"></unicon>
</template>
```

### On demand

```html
<template>
  <unicon name="constructor" fill="royalblue"></Unicon>
</template>

<script>
  import { Unicon } from 'vue-unicons'

  export default {
    components: {
      Unicon
    }
  }
</script>
```

## Props

| Name        | Description        | Type     | Accepted values          |
| ----------- | ------------------ | -------- | ------------------------ |
| `name`      | Icon name          | `string` | -                        |
| `width`     | Width of icon      | `string` | -                        |
| `height`    | Height of icon     | `string` | -                        |
| `fill`      | Fill color of icon | `string` | HEX or color name        |

## Events

| Name    | Description                     | Payload |
| ------- | ------------------------------- | ------- |
| `click` | Triggered when icon was clicked | -       |
