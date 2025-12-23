/**
 * Unit tests for Cart Store
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock cart item type
interface CartItem {
    id: number | string
    name: string
    price: string
    image: string
    quantity: number
}

// Mock cart store state and methods
const createMockCartStore = () => {
    let items: CartItem[] = []
    let isCartOpen = false

    return {
        get items() { return items },
        set items(value) { items = value },
        get isCartOpen() { return isCartOpen },

        // Getters
        get totalItems() {
            return items.reduce((total, item) => total + item.quantity, 0)
        },

        get subtotal() {
            return items.reduce((total, item) => {
                const price = parseFloat(item.price.replace(/[$,]/g, ''))
                return total + (price * item.quantity)
            }, 0)
        },

        get tax() {
            return this.subtotal * 0.1
        },

        get total() {
            return this.subtotal + this.tax
        },

        // Actions
        addItem(bike: { id: number; name: string; price: string; image: string }) {
            const existingItem = items.find(item => item.id === bike.id)

            if (existingItem) {
                existingItem.quantity++
            } else {
                items.push({
                    id: bike.id,
                    name: bike.name,
                    price: bike.price,
                    image: bike.image,
                    quantity: 1
                })
            }
        },

        removeItem(id: number) {
            items = items.filter(item => item.id !== id)
        },

        updateQuantity(id: number, quantity: number) {
            const item = items.find(item => item.id === id)
            if (item) {
                item.quantity = Math.max(1, quantity)
            }
        },

        clearCart() {
            items = []
        },

        toggleCart() {
            isCartOpen = !isCartOpen
        }
    }
}

describe('Cart Store', () => {
    let cart: ReturnType<typeof createMockCartStore>

    const testBike1 = {
        id: 1,
        name: 'Road Bike Pro',
        price: '$2,999',
        image: 'bike1.jpg'
    }

    const testBike2 = {
        id: 2,
        name: 'Mountain Beast',
        price: '$3,499',
        image: 'bike2.jpg'
    }

    beforeEach(() => {
        cart = createMockCartStore()
    })

    describe('addItem', () => {
        it('should add a new item to cart', () => {
            cart.addItem(testBike1)

            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].name).toBe('Road Bike Pro')
            expect(cart.items[0].quantity).toBe(1)
        })

        it('should increment quantity for existing item', () => {
            cart.addItem(testBike1)
            cart.addItem(testBike1)

            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].quantity).toBe(2)
        })

        it('should add multiple different items', () => {
            cart.addItem(testBike1)
            cart.addItem(testBike2)

            expect(cart.items).toHaveLength(2)
            expect(cart.totalItems).toBe(2)
        })
    })

    describe('removeItem', () => {
        it('should remove item from cart', () => {
            cart.addItem(testBike1)
            cart.addItem(testBike2)
            cart.removeItem(1)

            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].id).toBe(2)
        })

        it('should handle removing non-existent item', () => {
            cart.addItem(testBike1)
            cart.removeItem(999)

            expect(cart.items).toHaveLength(1)
        })
    })

    describe('updateQuantity', () => {
        it('should update item quantity', () => {
            cart.addItem(testBike1)
            cart.updateQuantity(1, 5)

            expect(cart.items[0].quantity).toBe(5)
        })

        it('should not allow quantity below 1', () => {
            cart.addItem(testBike1)
            cart.updateQuantity(1, 0)

            expect(cart.items[0].quantity).toBe(1)
        })

        it('should handle updating non-existent item', () => {
            cart.addItem(testBike1)
            cart.updateQuantity(999, 5)

            expect(cart.items[0].quantity).toBe(1)
        })
    })

    describe('clearCart', () => {
        it('should remove all items', () => {
            cart.addItem(testBike1)
            cart.addItem(testBike2)
            cart.clearCart()

            expect(cart.items).toHaveLength(0)
            expect(cart.totalItems).toBe(0)
        })
    })

    describe('getters', () => {
        it('should calculate totalItems correctly', () => {
            cart.addItem(testBike1)
            cart.addItem(testBike1)
            cart.addItem(testBike2)

            expect(cart.totalItems).toBe(3)
        })

        it('should calculate subtotal correctly', () => {
            cart.addItem(testBike1) // $2,999
            cart.addItem(testBike2) // $3,499

            expect(cart.subtotal).toBe(6498)
        })

        it('should calculate tax as 10% of subtotal', () => {
            cart.addItem(testBike1) // $2,999

            expect(cart.tax).toBeCloseTo(299.9, 2)
        })

        it('should calculate total as subtotal + tax', () => {
            cart.addItem(testBike1) // $2,999

            expect(cart.total).toBe(2999 + 299.9)
        })
    })

    describe('toggleCart', () => {
        it('should toggle cart open state', () => {
            expect(cart.isCartOpen).toBe(false)
            cart.toggleCart()
            expect(cart.isCartOpen).toBe(true)
            cart.toggleCart()
            expect(cart.isCartOpen).toBe(false)
        })
    })
})
