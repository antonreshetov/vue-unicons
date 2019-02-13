# Vue Unicons

<img src="./src/assets/hero.png" alt="logo of vue-unicons repository">

<p align="center">
  <img src="https://img.shields.io/npm/v/vue-unicons.svg">
  <img src="https://img.shields.io/github/issues/antonreshetov/vue-unicons.svg">
  <img src="https://img.shields.io/npm/dw/vue-unicons.svg">
  <img src="https://travis-ci.com/antonreshetov/vue-unicons.svg?branch=master">
  <img src="https://img.shields.io/github/license/antonreshetov/vue-unicons.svg">
</p>

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

To use in your project:

1. Import vue-unicons
2. Grab the icons you want and add then into Unicon library
3. Install Unicon into Vue

main.js

```js
import Vue from 'vue'
import App from './App.vue'
import Unicon from 'vue-unicons'
import { uniConstructor, uniChat } from 'vue-unicons/src/icons'

Unicon.add([uniConstructor, uniChat])
Vue.use(Unicon)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

App.vue

```html
<template>
  <unicon name="constructor" fill="royalblue"></unicon>
  <unicon name="chat" fill="limegreen"></unicon>
</template>
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

## License

Vue Unicons licensed under MIT.

[Unicons](https://github.com/iconscout/unicons) licensed under Apache 2.0