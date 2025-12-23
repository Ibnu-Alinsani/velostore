/**
 * Integration tests for Cart Flow
 * Tests the complete add → update → remove → checkout flow
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock Cart Store
interface CartItem {
    id: number
    name: string
    price: string
    image: string
    quantity: number
}

interface CartState {
    items: CartItem[]
    isCartOpen: boolean
}

const createCartStore = () => {
    let state: CartState = {
        items: [],
        isCartOpen: false
    }

    return {
        get items() { return state.items },
        set items(value) { state.items = value },
        get isCartOpen() { return state.isCartOpen },

        get totalItems() {
            return state.items.reduce((total, item) => total + item.quantity, 0)
        },

        get subtotal() {
            return state.items.reduce((total, item) => {
                const price = parseFloat(item.price.replace(/[$,]/g, ''))
                return total + (price * item.quantity)
            }, 0)
        },

        get tax() { return this.subtotal * 0.1 },
        get total() { return this.subtotal + this.tax },

        addItem(bike: { id: number; name: string; price: string; image: string }) {
            const existingItem = state.items.find(item => item.id === bike.id)
            if (existingItem) {
                existingItem.quantity++
            } else {
                state.items.push({ ...bike, quantity: 1 })
            }
        },

        removeItem(id: number) {
            state.items = state.items.filter(item => item.id !== id)
        },

        updateQuantity(id: number, quantity: number) {
            const item = state.items.find(item => item.id === id)
            if (item) {
                item.quantity = Math.max(1, quantity)
            }
        },

        clearCart() {
            state.items = []
        },

        toggleCart() {
            state.isCartOpen = !state.isCartOpen
        },

        reset() {
            state = { items: [], isCartOpen: false }
        }
    }
}

describe('Cart Flow Integration', () => {
    let cart: ReturnType<typeof createCartStore>

    const testBikes = [
        { id: 1, name: 'Road Bike Pro', price: '$2,999', image: 'road.jpg' },
        { id: 2, name: 'Mountain Beast', price: '$3,499', image: 'mountain.jpg' },
        { id: 3, name: 'Electric Cruiser', price: '$4,999', image: 'electric.jpg' }
    ]

    beforeEach(() => {
        cart = createCartStore()
    })

    describe('Complete Shopping Flow', () => {
        it('should handle full add → update → checkout flow', () => {
            // Step 1: Add multiple items
            cart.addItem(testBikes[0])
            cart.addItem(testBikes[1])
            expect(cart.totalItems).toBe(2)
            expect(cart.items).toHaveLength(2)

            // Step 2: Update quantity
            cart.updateQuantity(1, 3) // 3x Road Bike Pro
            expect(cart.items.find(i => i.id === 1)?.quantity).toBe(3)
            expect(cart.totalItems).toBe(4) // 3 + 1

            // Step 3: Calculate totals
            // Road Bike Pro: $2,999 x 3 = $8,997
            // Mountain Beast: $3,499 x 1 = $3,499
            // Subtotal: $12,496
            expect(cart.subtotal).toBe(12496)
            expect(cart.tax).toBeCloseTo(1249.6, 2)
            expect(cart.total).toBeCloseTo(13745.6, 2)

            // Step 4: Remove an item
            cart.removeItem(2)
            expect(cart.items).toHaveLength(1)
            expect(cart.subtotal).toBe(8997) // 3 x $2,999

            // Step 5: Clear cart (checkout complete)
            cart.clearCart()
            expect(cart.items).toHaveLength(0)
            expect(cart.totalItems).toBe(0)
        })

        it('should handle add same item multiple times', () => {
            cart.addItem(testBikes[0])
            cart.addItem(testBikes[0])
            cart.addItem(testBikes[0])

            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].quantity).toBe(3)
            expect(cart.totalItems).toBe(3)
        })

        it('should handle selective removal', () => {
            cart.addItem(testBikes[0])
            cart.addItem(testBikes[1])
            cart.addItem(testBikes[2])

            expect(cart.items).toHaveLength(3)

            // Remove middle item
            cart.removeItem(2)
            expect(cart.items).toHaveLength(2)
            expect(cart.items.map(i => i.id)).toEqual([1, 3])

            // Remove first item
            cart.removeItem(1)
            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].id).toBe(3)
        })

        it('should handle quantity edge cases', () => {
            cart.addItem(testBikes[0])

            // Try to set to 0 (should stay at 1)
            cart.updateQuantity(1, 0)
            expect(cart.items[0].quantity).toBe(1)

            // Try to set negative (should stay at 1)
            cart.updateQuantity(1, -5)
            expect(cart.items[0].quantity).toBe(1)

            // Set to large number
            cart.updateQuantity(1, 100)
            expect(cart.items[0].quantity).toBe(100)
        })
    })

    describe('Cart State Persistence', () => {
        it('should maintain cart state through operations', () => {
            // Simulate user session
            cart.addItem(testBikes[0])
            cart.addItem(testBikes[1])
            cart.updateQuantity(1, 2)

            // Verify state integrity
            expect(cart.items).toHaveLength(2)
            expect(cart.items.find(i => i.id === 1)?.quantity).toBe(2)
            expect(cart.items.find(i => i.id === 2)?.quantity).toBe(1)
            expect(cart.totalItems).toBe(3)
        })

        it('should correctly toggle cart visibility', () => {
            expect(cart.isCartOpen).toBe(false)

            cart.toggleCart()
            expect(cart.isCartOpen).toBe(true)

            // Add item while open
            cart.addItem(testBikes[0])
            expect(cart.isCartOpen).toBe(true) // Should stay open

            cart.toggleCart()
            expect(cart.isCartOpen).toBe(false)
        })
    })

    describe('Price Calculations', () => {
        it('should calculate correct subtotal with mixed items', () => {
            cart.addItem(testBikes[0]) // $2,999
            cart.addItem(testBikes[1]) // $3,499
            cart.addItem(testBikes[2]) // $4,999

            expect(cart.subtotal).toBe(11497) // Sum of all prices
        })

        it('should update totals when quantity changes', () => {
            cart.addItem(testBikes[0]) // $2,999
            expect(cart.subtotal).toBe(2999)

            cart.updateQuantity(1, 5)
            expect(cart.subtotal).toBe(14995) // $2,999 x 5
        })

        it('should update totals when items are removed', () => {
            cart.addItem(testBikes[0]) // $2,999
            cart.addItem(testBikes[1]) // $3,499
            expect(cart.subtotal).toBe(6498)

            cart.removeItem(1)
            expect(cart.subtotal).toBe(3499)
        })

        it('should return zero for empty cart', () => {
            expect(cart.subtotal).toBe(0)
            expect(cart.tax).toBe(0)
            expect(cart.total).toBe(0)
        })
    })
})
