/**
 * Component tests for BaseButton
 */
import { describe, it, expect, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Simplified BaseButton component for testing
const BaseButton = defineComponent({
    props: {
        variant: { type: String as () => 'primary' | 'secondary' | 'outline' | 'ghost', default: 'primary' },
        to: { type: String, default: undefined },
        type: { type: String as () => 'button' | 'submit' | 'reset', default: 'button' },
        block: { type: Boolean, default: false },
        ariaLabel: { type: String, default: undefined },
        disabled: { type: Boolean, default: false }
    },
    computed: {
        classes() {
            const base = 'inline-flex items-center justify-center px-6 py-3 rounded-full transition-all'
            const variants: Record<string, string> = {
                primary: 'bg-blue-600 text-white hover:bg-blue-500',
                secondary: 'bg-white text-zinc-900 hover:bg-gray-100',
                outline: 'bg-transparent border border-zinc-700 text-zinc-300',
                ghost: 'bg-transparent text-zinc-400 hover:text-white'
            }
            const width = this.block ? 'w-full' : ''
            const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : ''
            return `${base} ${variants[this.variant]} ${width} ${disabledClass}`
        }
    },
    template: `
    <a v-if="to" :href="to" :class="classes" :aria-label="ariaLabel">
      <slot />
    </a>
    <button v-else :type="type" :class="classes" :aria-label="ariaLabel" :disabled="disabled">
      <slot />
    </button>
  `
})

describe('BaseButton Component', () => {
    describe('Rendering', () => {
        it('should render a button by default', () => {
            const wrapper = mount(BaseButton, {
                slots: { default: 'Click Me' }
            })
            expect(wrapper.find('button').exists()).toBe(true)
            expect(wrapper.find('button').text()).toBe('Click Me')
        })

        it('should render as a link when "to" prop is provided', () => {
            const wrapper = mount(BaseButton, {
                props: { to: '/bikes' },
                slots: { default: 'Go to Bikes' }
            })
            expect(wrapper.find('a').exists()).toBe(true)
            expect(wrapper.find('button').exists()).toBe(false)
        })
    })

    describe('Variants', () => {
        it('should apply primary variant styles by default', () => {
            const wrapper = mount(BaseButton)
            expect(wrapper.classes()).toContain('bg-blue-600')
        })

        it('should apply secondary variant styles', () => {
            const wrapper = mount(BaseButton, {
                props: { variant: 'secondary' }
            })
            expect(wrapper.classes()).toContain('bg-white')
        })

        it('should apply outline variant styles', () => {
            const wrapper = mount(BaseButton, {
                props: { variant: 'outline' }
            })
            expect(wrapper.classes()).toContain('border')
            expect(wrapper.classes()).toContain('bg-transparent')
        })

        it('should apply ghost variant styles', () => {
            const wrapper = mount(BaseButton, {
                props: { variant: 'ghost' }
            })
            expect(wrapper.classes()).toContain('bg-transparent')
            expect(wrapper.classes()).toContain('text-zinc-400')
        })
    })

    describe('Button Type', () => {
        it('should have type="button" by default', () => {
            const wrapper = mount(BaseButton)
            expect(wrapper.find('button').attributes('type')).toBe('button')
        })

        it('should support type="submit"', () => {
            const wrapper = mount(BaseButton, {
                props: { type: 'submit' }
            })
            expect(wrapper.find('button').attributes('type')).toBe('submit')
        })

        it('should support type="reset"', () => {
            const wrapper = mount(BaseButton, {
                props: { type: 'reset' }
            })
            expect(wrapper.find('button').attributes('type')).toBe('reset')
        })
    })

    describe('Block Mode', () => {
        it('should not be full width by default', () => {
            const wrapper = mount(BaseButton)
            expect(wrapper.classes()).not.toContain('w-full')
        })

        it('should be full width when block is true', () => {
            const wrapper = mount(BaseButton, {
                props: { block: true }
            })
            expect(wrapper.classes()).toContain('w-full')
        })
    })

    describe('Accessibility', () => {
        it('should support aria-label', () => {
            const wrapper = mount(BaseButton, {
                props: { ariaLabel: 'Submit form' }
            })
            expect(wrapper.find('button').attributes('aria-label')).toBe('Submit form')
        })

        it('should have no aria-label by default', () => {
            const wrapper = mount(BaseButton)
            expect(wrapper.find('button').attributes('aria-label')).toBeUndefined()
        })
    })

    describe('Disabled State', () => {
        it('should not be disabled by default', () => {
            const wrapper = mount(BaseButton)
            expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
        })

        it('should be disabled when disabled prop is true', () => {
            const wrapper = mount(BaseButton, {
                props: { disabled: true }
            })
            expect(wrapper.find('button').attributes('disabled')).toBeDefined()
        })

        it('should apply disabled styles', () => {
            const wrapper = mount(BaseButton, {
                props: { disabled: true }
            })
            expect(wrapper.classes()).toContain('opacity-50')
            expect(wrapper.classes()).toContain('cursor-not-allowed')
        })
    })

    describe('Events', () => {
        it('should emit click event', async () => {
            const wrapper = mount(BaseButton)
            await wrapper.find('button').trigger('click')
            expect(wrapper.emitted('click')).toBeTruthy()
        })

        it('should not emit click when disabled', async () => {
            const wrapper = mount(BaseButton, {
                props: { disabled: true }
            })
            await wrapper.find('button').trigger('click')
            // Browser prevents click on disabled button
            expect(wrapper.emitted('click')).toBeFalsy()
        })
    })
})
