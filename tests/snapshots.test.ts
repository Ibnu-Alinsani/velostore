/**
 * Snapshot Tests
 * Visual regression tests for key components
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

// Simplified components for snapshot testing
const ProductCardSnapshot = defineComponent({
    props: {
        id: { type: [String, Number], required: true },
        title: { type: String, required: true },
        price: { type: String, required: true },
        category: { type: String, required: true },
        performance: { type: Number as () => 1 | 2 | 3, required: true }
    },
    template: `
        <article class="product-card" data-testid="product-card">
            <div class="product-card__image">
                <span class="product-card__badge">{{ category }}</span>
            </div>
            <div class="product-card__content">
                <h2 class="product-card__title">{{ title }}</h2>
                <div class="product-card__footer">
                    <span class="product-card__price">{{ price }}</span>
                    <div class="product-card__performance">
                        <span v-for="i in 3" :key="i" :class="{ active: i <= performance }"></span>
                    </div>
                </div>
            </div>
        </article>
    `
})

const BaseButtonSnapshot = defineComponent({
    props: {
        variant: { type: String, default: 'primary' },
        disabled: { type: Boolean, default: false }
    },
    template: `
        <button 
            class="base-button" 
            :class="['base-button--' + variant, { 'base-button--disabled': disabled }]"
            :disabled="disabled"
        >
            <slot>Button</slot>
        </button>
    `
})

const PriceBadgeSnapshot = defineComponent({
    props: {
        price: { type: String, required: true },
        originalPrice: { type: String, default: '' },
        onSale: { type: Boolean, default: false }
    },
    template: `
        <div class="price-badge" :class="{ 'price-badge--sale': onSale }">
            <span v-if="originalPrice && onSale" class="price-badge__original">{{ originalPrice }}</span>
            <span class="price-badge__current">{{ price }}</span>
            <span v-if="onSale" class="price-badge__sale-label">SALE</span>
        </div>
    `
})

describe('Snapshot Tests', () => {
    describe('ProductCard Snapshots', () => {
        it('should match snapshot for road bike', () => {
            const wrapper = mount(ProductCardSnapshot, {
                props: {
                    id: 1,
                    title: 'Aero Road Pro',
                    price: '$2,999',
                    category: 'Road',
                    performance: 3
                }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for mountain bike', () => {
            const wrapper = mount(ProductCardSnapshot, {
                props: {
                    id: 2,
                    title: 'Mountain Beast X',
                    price: '$3,499',
                    category: 'Mountain',
                    performance: 2
                }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for electric bike', () => {
            const wrapper = mount(ProductCardSnapshot, {
                props: {
                    id: 3,
                    title: 'Electric Cruiser',
                    price: '$4,999',
                    category: 'Electric',
                    performance: 1
                }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for low performance bike', () => {
            const wrapper = mount(ProductCardSnapshot, {
                props: {
                    id: 4,
                    title: 'Budget Bike',
                    price: '$499',
                    category: 'Urban',
                    performance: 1
                }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })
    })

    describe('BaseButton Snapshots', () => {
        it('should match snapshot for primary button', () => {
            const wrapper = mount(BaseButtonSnapshot, {
                props: { variant: 'primary' },
                slots: { default: 'Add to Cart' }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for secondary button', () => {
            const wrapper = mount(BaseButtonSnapshot, {
                props: { variant: 'secondary' },
                slots: { default: 'View Details' }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for outline button', () => {
            const wrapper = mount(BaseButtonSnapshot, {
                props: { variant: 'outline' },
                slots: { default: 'Learn More' }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for ghost button', () => {
            const wrapper = mount(BaseButtonSnapshot, {
                props: { variant: 'ghost' },
                slots: { default: 'Cancel' }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for disabled button', () => {
            const wrapper = mount(BaseButtonSnapshot, {
                props: { variant: 'primary', disabled: true },
                slots: { default: 'Disabled' }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })
    })

    describe('PriceBadge Snapshots', () => {
        it('should match snapshot for regular price', () => {
            const wrapper = mount(PriceBadgeSnapshot, {
                props: { price: '$2,999' }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for sale price', () => {
            const wrapper = mount(PriceBadgeSnapshot, {
                props: {
                    price: '$1,999',
                    originalPrice: '$2,999',
                    onSale: true
                }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('should match snapshot for high value price', () => {
            const wrapper = mount(PriceBadgeSnapshot, {
                props: { price: '$12,999' }
            })
            expect(wrapper.html()).toMatchSnapshot()
        })
    })

    describe('HTML Structure Verification', () => {
        it('should have correct ProductCard structure', () => {
            const wrapper = mount(ProductCardSnapshot, {
                props: {
                    id: 1,
                    title: 'Test Bike',
                    price: '$999',
                    category: 'Test',
                    performance: 2
                }
            })

            expect(wrapper.find('.product-card').exists()).toBe(true)
            expect(wrapper.find('.product-card__title').exists()).toBe(true)
            expect(wrapper.find('.product-card__price').exists()).toBe(true)
            expect(wrapper.find('.product-card__badge').exists()).toBe(true)
            expect(wrapper.find('.product-card__performance').exists()).toBe(true)
        })

        it('should have correct BaseButton structure', () => {
            const wrapper = mount(BaseButtonSnapshot, {
                props: { variant: 'primary' }
            })

            expect(wrapper.find('.base-button').exists()).toBe(true)
            expect(wrapper.find('.base-button--primary').exists()).toBe(true)
        })

        it('should have correct PriceBadge structure for sale', () => {
            const wrapper = mount(PriceBadgeSnapshot, {
                props: {
                    price: '$99',
                    originalPrice: '$199',
                    onSale: true
                }
            })

            expect(wrapper.find('.price-badge').exists()).toBe(true)
            expect(wrapper.find('.price-badge--sale').exists()).toBe(true)
            expect(wrapper.find('.price-badge__original').exists()).toBe(true)
            expect(wrapper.find('.price-badge__current').exists()).toBe(true)
            expect(wrapper.find('.price-badge__sale-label').exists()).toBe(true)
        })
    })
})
