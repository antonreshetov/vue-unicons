type UniconIcon = {
  name: string
  style: string
  path: string
}

type UniconOptions = {
  fill: string
  height: number
  width: number
}

declare module 'vue-unicons' {
  import Vue from 'vue'

  interface VueUnicon {
    add: (icons: UniconIcon[]) => void
    install: (v: typeof Vue, options?: Partial<UniconOptions>) => void
  }

  const Unicon: VueUnicon
  
  export default Unicon
}

declare module 'vue-unicons/src/icons'

declare module 'vue-unicons/dist/vue-unicons-ssr.common.js' {
  import Vue from 'vue'

  interface VueUnicon {
    add: (icons: UniconIcon[]) => void
    install: (v: typeof Vue, options?: Partial<UniconOptions>) => void
  }

  const Unicon: VueUnicon
  
  export default Unicon
}
