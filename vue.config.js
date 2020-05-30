const isProd = process.env.NODE_ENV === 'production'
const isSSRMode = process.env.SSR_MODE === 'on'

module.exports = {
  publicPath: isProd ? '/vue-unicons/' : '/',
  css: {
    extract: isSSRMode
  }
}
