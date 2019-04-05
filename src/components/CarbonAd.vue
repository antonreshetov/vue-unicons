<script>
export default {
  mounted () {
    if (process.env.NODE_ENV === 'development') return

    this.load()
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.$el.innerHTML = ''
        this.load()
      }
    })
  },

  methods: {
    load () {
      const s = document.createElement('script')
      s.id = '_carbonads_js'
      s.src = `//cdn.carbonads.com/carbon.js?serve=CK7DEK7I&placement=antonreshetovgithubio`
      this.$el.appendChild(s)
    }
  },

  render (h) {
    return h('div', { class: 'carbon' })
  }
}
</script>

<style lang="scss">
@import '../assets/scss/vars';

.carbon {
  min-height: 102px;
  max-width: 300px;
  font-size: 0.9rem;
  line-height: 1.4em;
  // float: right;
  position: absolute;
  right: 0;
  padding: 0 0 10px 10px;
  @media (max-width: $sm) {
    left: 0;
    margin: 0 auto;
  }
  &-text {
    text-align: right;
  }
  a {
    color: #999;
    font-weight: normal;
    display: inline !important;
    text-decoration: none;
    font-size: 0.8rem;
  }
  .carbon-img {
    float: left;
    margin-right: 1rem;
    img {
      display: block;
    }
  }
  .carbon-poweredby {
    color: #999;
    display: block !important;
    margin-top: 0.5em;
    text-transform: uppercase;
    font-size: 11px;
    // text-align: right;
  }
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
