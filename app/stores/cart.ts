import { defineStore } from 'pinia'
import type { CartItem } from '~/types'

/**
 * Type for adding items to cart
 * Simpler than full Bike type - only needs display info
 */
interface AddToCartItem {
    id: number
    name: string
    price: string
    image: string
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
        isCartOpen: false
    }),

    getters: {
        totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),

        subtotal: (state) => {
            return state.items.reduce((total, item) => {
                const price = parseFloat(item.price.replace(/[$,]/g, ''))
                return total + (price * item.quantity)
            }, 0)
        },

        tax(): number {
            return this.subtotal * 0.1
        },

        total(): number {
            return this.subtotal + this.tax
        }
    },

    actions: {
        initializeCart() {
            if (typeof window !== 'undefined') {
                const savedCart = localStorage.getItem('velo-cart')
                if (savedCart) {
                    try {
                        this.items = JSON.parse(savedCart)
                    } catch {
                        this.items = []
                    }
                }
            }
        },

        saveCart() {
            if (typeof window !== 'undefined') {
                localStorage.setItem('velo-cart', JSON.stringify(this.items))
            }
        },

        addItem(product: AddToCartItem) {
            const existingItem = this.items.find(item => item.id === product.id)

            if (existingItem) {
                existingItem.quantity++
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                })
            }
            this.saveCart()
        },

        removeItem(id: number) {
            this.items = this.items.filter(item => item.id !== id)
            this.saveCart()
        },

        updateQuantity(id: number, quantity: number) {
            const item = this.items.find(item => item.id === id)
            if (item) {
                item.quantity = Math.max(1, quantity)
            }
            this.saveCart()
        },

        clearCart() {
            this.items = []
            this.saveCart()
        },

        toggleCart() {
            this.isCartOpen = !this.isCartOpen
        }
    }
})
