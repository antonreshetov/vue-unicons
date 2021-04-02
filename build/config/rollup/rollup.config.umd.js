import base from './rollup.config.base'

const isVue2 = process.env.TARGET === 'vue2'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-unicons',
    format: 'umd',
    file: isVue2 ? 'dist/vue-unicons-vue2.umd.js' : 'dist/vue-unicons.umd.js',
    globals: {
      vue: 'vue'
    }
  },
  external: ['vue']
})

export default config
