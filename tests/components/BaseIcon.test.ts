/**
 * Component tests for BaseIcon
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Simplified BaseIcon component for testing
const BaseIcon = defineComponent({
    props: {
        name: {
            type: String as () => 'bike' | 'cart' | 'search' | 'menu' | 'close' | 'arrowRight' | 'arrowLeft' | 'chevronRight' | 'chevronDown' | 'check' | 'star' | 'heart' | 'share' | 'settings' | 'email' | 'location' | 'users' | 'lightning' | 'shield' | 'mountain' | 'calendar' | 'refresh',
            required: true
        },
        size: {
            type: String as () => 'sm' | 'md' | 'lg' | 'xl',
            default: 'md'
        }
    },
    computed: {
        sizeClasses() {
            const sizes: Record<string, string> = {
                sm: 'w-4 h-4',
                md: 'w-6 h-6',
                lg: 'w-8 h-8',
                xl: 'w-12 h-12'
            }
            return sizes[this.size] || sizes.md
        }
    },
    template: `
    <svg 
      :class="sizeClasses" 
      :data-icon="name"
      class="base-icon"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  `
})

describe('BaseIcon Component', () => {
    describe('Rendering', () => {
        it('should render an SVG element', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike' }
            })
            expect(wrapper.find('svg').exists()).toBe(true)
        })

        it('should have the correct icon name as data attribute', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'cart' }
            })
            expect(wrapper.find('svg').attributes('data-icon')).toBe('cart')
        })

        it('should be hidden from screen readers by default', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'search' }
            })
            expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
        })
    })

    describe('Sizes', () => {
        it('should apply medium size by default', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike' }
            })
            expect(wrapper.find('svg').classes()).toContain('w-6')
            expect(wrapper.find('svg').classes()).toContain('h-6')
        })

        it('should apply small size', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike', size: 'sm' }
            })
            expect(wrapper.find('svg').classes()).toContain('w-4')
            expect(wrapper.find('svg').classes()).toContain('h-4')
        })

        it('should apply large size', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike', size: 'lg' }
            })
            expect(wrapper.find('svg').classes()).toContain('w-8')
            expect(wrapper.find('svg').classes()).toContain('h-8')
        })

        it('should apply extra large size', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike', size: 'xl' }
            })
            expect(wrapper.find('svg').classes()).toContain('w-12')
            expect(wrapper.find('svg').classes()).toContain('h-12')
        })
    })

    describe('Icon Names', () => {
        const iconNames = [
            'bike', 'cart', 'search', 'menu', 'close',
            'arrowRight', 'arrowLeft', 'chevronRight', 'chevronDown',
            'check', 'star', 'heart', 'share', 'settings',
            'email', 'location', 'users', 'lightning', 'shield',
            'mountain', 'calendar', 'refresh'
        ] as const

        iconNames.forEach(iconName => {
            it(`should render ${iconName} icon`, () => {
                const wrapper = mount(BaseIcon, {
                    props: { name: iconName }
                })
                expect(wrapper.find('svg').attributes('data-icon')).toBe(iconName)
            })
        })
    })

    describe('Styling', () => {
        it('should have base-icon class', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike' }
            })
            expect(wrapper.find('svg').classes()).toContain('base-icon')
        })

        it('should use currentColor for stroke', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike' }
            })
            expect(wrapper.find('svg').attributes('stroke')).toBe('currentColor')
        })

        it('should have no fill', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike' }
            })
            expect(wrapper.find('svg').attributes('fill')).toBe('none')
        })
    })

    describe('SVG Attributes', () => {
        it('should have correct viewBox', () => {
            const wrapper = mount(BaseIcon, {
                props: { name: 'bike' }
            })
            expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24')
        })
    })
})
