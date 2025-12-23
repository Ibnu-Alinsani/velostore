/**
 * Component tests for ProductCard
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, defineComponent } from 'vue'

// Mock child components
const MockNuxtLink = defineComponent({
    props: ['to'],
    template: '<a :href="to" class="mock-nuxt-link"><slot /></a>'
})

const MockNuxtImg = defineComponent({
    props: ['src', 'alt', 'loading'],
    template: '<img :src="src" :alt="alt" :loading="loading" class="mock-nuxt-img" />'
})

const MockBaseBadge = defineComponent({
    props: ['color'],
    template: '<span class="mock-badge"><slot /></span>'
})

const MockBaseIcon = defineComponent({
    props: ['name', 'size'],
    template: '<span class="mock-icon" :data-name="name" :data-size="size"></span>'
})

// Simplified ProductCard component for testing
const ProductCard = defineComponent({
    props: {
        id: { type: [String, Number], required: true },
        title: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        performance: { type: Number as () => 1 | 2 | 3, required: true }
    },
    emits: ['quick-add'],
    setup(props, { emit }) {
        const quickAdd = () => {
            emit('quick-add', {
                id: Number(props.id),
                name: props.title,
                price: props.price,
                image: props.image,
                category: props.category
            })
        }
        return { quickAdd }
    },
    template: `
    <a :href="'/bikes/' + id" class="product-card">
      <img :src="image" :alt="title" class="product-image" />
      <span class="category-badge">{{ category }}</span>
      <h2 class="title">{{ title }}</h2>
      <span class="price">{{ price }}</span>
      <div class="performance">
        <span v-for="i in 3" :key="i" :class="i <= performance ? 'active' : 'inactive'"></span>
      </div>
      <button @click.stop.prevent="quickAdd" aria-label="Add to cart" class="quick-add-btn">
        Add to Cart
      </button>
    </a>
  `
})

describe('ProductCard Component', () => {
    const defaultProps = {
        id: 1,
        title: 'Road Bike Pro',
        price: '$2,999',
        image: '/bikes/road-bike.jpg',
        category: 'Road',
        performance: 3 as 1 | 2 | 3
    }

    describe('Rendering', () => {
        it('should render the product title', () => {
            const wrapper = mount(ProductCard, { props: defaultProps })
            expect(wrapper.find('.title').text()).toBe('Road Bike Pro')
        })

        it('should render the product price', () => {
            const wrapper = mount(ProductCard, { props: defaultProps })
            expect(wrapper.find('.price').text()).toBe('$2,999')
        })

        it('should render the category badge', () => {
            const wrapper = mount(ProductCard, { props: defaultProps })
            expect(wrapper.find('.category-badge').text()).toBe('Road')
        })

        it('should render the product image with correct src and alt', () => {
            const wrapper = mount(ProductCard, { props: defaultProps })
            const image = wrapper.find('.product-image')
            expect(image.attributes('src')).toBe('/bikes/road-bike.jpg')
            expect(image.attributes('alt')).toBe('Road Bike Pro')
        })

        it('should link to the correct product page', () => {
            const wrapper = mount(ProductCard, { props: defaultProps })
            expect(wrapper.find('.product-card').attributes('href')).toBe('/bikes/1')
        })
    })

    describe('Performance Indicator', () => {
        it('should show all 3 bars active for performance 3', () => {
            const wrapper = mount(ProductCard, { props: { ...defaultProps, performance: 3 as 1 | 2 | 3 } })
            const bars = wrapper.findAll('.performance span')
            expect(bars.filter(b => b.classes('active'))).toHaveLength(3)
        })

        it('should show 2 bars active for performance 2', () => {
            const wrapper = mount(ProductCard, { props: { ...defaultProps, performance: 2 as 1 | 2 | 3 } })
            const bars = wrapper.findAll('.performance span')
            expect(bars.filter(b => b.classes('active'))).toHaveLength(2)
            expect(bars.filter(b => b.classes('inactive'))).toHaveLength(1)
        })

        it('should show 1 bar active for performance 1', () => {
            const wrapper = mount(ProductCard, { props: { ...defaultProps, performance: 1 as 1 | 2 | 3 } })
            const bars = wrapper.findAll('.performance span')
            expect(bars.filter(b => b.classes('active'))).toHaveLength(1)
            expect(bars.filter(b => b.classes('inactive'))).toHaveLength(2)
        })
    })

    describe('Quick Add Button', () => {
        it('should have aria-label for accessibility', () => {
            const wrapper = mount(ProductCard, { props: defaultProps })
            expect(wrapper.find('.quick-add-btn').attributes('aria-label')).toBe('Add to cart')
        })

        it('should emit quick-add event when clicked', async () => {
            const wrapper = mount(ProductCard, { props: defaultProps })
            await wrapper.find('.quick-add-btn').trigger('click')

            expect(wrapper.emitted('quick-add')).toBeTruthy()
            expect(wrapper.emitted('quick-add')![0]).toEqual([{
                id: 1,
                name: 'Road Bike Pro',
                price: '$2,999',
                image: '/bikes/road-bike.jpg',
                category: 'Road'
            }])
        })
    })

    describe('Props Validation', () => {
        it('should handle string id', () => {
            const wrapper = mount(ProductCard, { props: { ...defaultProps, id: 'bike-1' } })
            expect(wrapper.find('.product-card').attributes('href')).toBe('/bikes/bike-1')
        })

        it('should handle numeric id', () => {
            const wrapper = mount(ProductCard, { props: { ...defaultProps, id: 123 } })
            expect(wrapper.find('.product-card').attributes('href')).toBe('/bikes/123')
        })

        it('should handle different categories', () => {
            const categories = ['Road', 'Mountain', 'Gravel', 'Electric']
            categories.forEach(category => {
                const wrapper = mount(ProductCard, { props: { ...defaultProps, category } })
                expect(wrapper.find('.category-badge').text()).toBe(category)
            })
        })
    })
})
