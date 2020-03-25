import { shallowMount } from '@vue/test-utils'
import { Unicon } from '../../src/components'
const { myCustomIcon } = require('../../src/custom-icons')
const icons = require('../../src/icons')

Unicon.add([...Object.values({ ...icons }), myCustomIcon])

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
  it('custom icon is rendered', () => {
    const wrapper = shallowMount(Unicon, {
      propsData: {
        name: 'my-custom-icon',
        width: '20',
        height: '20',
        fill: 'limegreen'
      }
    })
    const svg = wrapper.find('svg')
    const path = wrapper.find('svg path')

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().name).toBe('my-custom-icon')
    expect(wrapper.props().width).toBe('20')
    expect(wrapper.props().height).toBe('20')
    expect(wrapper.props().fill).toBe('limegreen')
    expect(svg.attributes().fill).toBe('limegreen')
    expect(svg.attributes().width).toBe('20')
    expect(svg.attributes().height).toBe('20')
    expect(path.is('path')).toBe(true)
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
