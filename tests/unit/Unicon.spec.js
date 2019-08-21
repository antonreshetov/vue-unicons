import { shallowMount } from '@vue/test-utils'
import { Unicon } from '../../src/components'
const icons = require('../../src/icons')

Unicon.add(Object.values({ ...icons }))

const baseProps = {
  name: 'constructor',
  width: '20',
  height: '20',
  fill: 'limegreen'
}

describe('Unicon', () => {
  it('is all rendered', () => {
    Object.values(icons).forEach(icon => {
      const wrapper = shallowMount(Unicon, {
        propsData: {
          name: icon.name,
          width: '20',
          height: '20',
          fill: 'limegreen'
        }
      })
      const svg = wrapper.find('svg')

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.props().name).toBe(icon.name)
      expect(wrapper.props().width).toBe('20')
      expect(wrapper.props().height).toBe('20')
      expect(wrapper.props().fill).toBe('limegreen')
      expect(svg.attributes().fill).toBe('limegreen')
      expect(svg.attributes().width).toBe('20')
      expect(svg.attributes().height).toBe('20')
    })
  })
  it('click event is emitted', () => {
    const wrapper = shallowMount(Unicon, {
      propsData: baseProps
    })
    const svg = wrapper.find('svg')
    svg.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
