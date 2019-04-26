/* tslint:disable:only-arrow-functions */
import { VueConstructor } from 'vue'

declare module "vue-unicons" {
  export function install(Vue: VueConstructor, options: object): void
  export function add(icons: string[]): void
}

declare module "vue-unicons/src/icons" {
  export const icons: { name: string; path: string }
}
