import { shallowMount } from '@vue/test-utils'
import { Unicon } from '../../src/components'

const baseProps = {
  name: 'constructor',
  width: '20',
  height: '20',
  fill: 'limegreen'
}

describe('Unicon', () => {
  it('is rendered with props', () => {
    const wrapper = shallowMount(Unicon, {
      propsData: baseProps
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().name).toBe('constructor')
    expect(wrapper.props().width).toBe('20')
    expect(wrapper.props().height).toBe('20')
    expect(wrapper.props().fill).toBe('limegreen')
  })
  it('is rendered with dimensions', () => {
    const wrapper = shallowMount(Unicon, {
      propsData: baseProps
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes().width).toBe('20')
    expect(svg.attributes().height).toBe('20')
  })
  it('is rendered with color', () => {
    const wrapper = shallowMount(Unicon, {
      propsData: baseProps
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes().fill).toBe('limegreen')
  })
  it('click event is emitted', () => {
    const wrapper = shallowMount(Unicon)
    const svg = wrapper.find('svg')
    svg.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
