import babel from '@rollup/plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'

let vue

if (process.env.TARGET === 'vue2') {
  vue = require('rollup-plugin-vue-5')
} else {
  vue = require('rollup-plugin-vue')
}

export default {
  input: 'src/components/index.js',
  plugins: [
    vue(),
    postcss(),
    copy({
      targets: [
        { src: 'src/icons.js', dest: 'dist' }
      ]
    }),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    cjs(),
    terser(),
    analyze({ summaryOnly: true, hideDeps: true })
  ]
}
