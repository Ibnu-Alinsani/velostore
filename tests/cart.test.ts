/**
 * Unit tests for Cart Store
 * Tests actual source code for coverage
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {}
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value },
        removeItem: (key: string) => { delete store[key] },
        clear: () => { store = {} }
    }
})()

vi.stubGlobal('localStorage', localStorageMock)

// Import actual store
import { useCartStore } from '~/stores/cart'

describe('Cart Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorageMock.clear()
    })

    const testBike1 = {
        id: 1,
        name: 'Road Bike Pro',
        price: '$2,999',
        image: 'bike1.jpg',
        category: 'Road',
        description: 'A great bike'
    }

    const testBike2 = {
        id: 2,
        name: 'Mountain Beast',
        price: '$3,499',
        image: 'bike2.jpg',
        category: 'Mountain',
        description: 'A mountain bike'
    }

    describe('Initial State', () => {
        it('should have empty items initially', () => {
            const cart = useCartStore()
            expect(cart.items).toHaveLength(0)
        })

        it('should have cart closed initially', () => {
            const cart = useCartStore()
            expect(cart.isCartOpen).toBe(false)
        })
    })

    describe('addItem', () => {
        it('should add a new item to cart', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].name).toBe('Road Bike Pro')
        })

        it('should set quantity to 1 for new items', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            expect(cart.items[0].quantity).toBe(1)
        })

        it('should increment quantity for existing items', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.addItem(testBike1)
            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].quantity).toBe(2)
        })

        it('should add multiple different items', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.addItem(testBike2)
            expect(cart.items).toHaveLength(2)
        })
    })

    describe('removeItem', () => {
        it('should remove item by id', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.addItem(testBike2)
            cart.removeItem(1)
            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].id).toBe(2)
        })

        it('should handle removing non-existent item', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.removeItem(999)
            expect(cart.items).toHaveLength(1)
        })
    })

    describe('updateQuantity', () => {
        it('should update item quantity', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.updateQuantity(1, 5)
            expect(cart.items[0].quantity).toBe(5)
        })

        it('should enforce minimum quantity of 1', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.updateQuantity(1, 0)
            expect(cart.items[0].quantity).toBe(1)
        })

        it('should enforce minimum for negative quantity', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.updateQuantity(1, -5)
            expect(cart.items[0].quantity).toBe(1)
        })

        it('should handle updating non-existent item', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.updateQuantity(999, 5)
            expect(cart.items[0].quantity).toBe(1)
        })
    })

    describe('clearCart', () => {
        it('should remove all items', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.addItem(testBike2)
            cart.clearCart()
            expect(cart.items).toHaveLength(0)
        })
    })

    describe('toggleCart', () => {
        it('should toggle cart open state', () => {
            const cart = useCartStore()
            expect(cart.isCartOpen).toBe(false)
            cart.toggleCart()
            expect(cart.isCartOpen).toBe(true)
            cart.toggleCart()
            expect(cart.isCartOpen).toBe(false)
        })
    })

    describe('Getters', () => {
        describe('totalItems', () => {
            it('should return 0 for empty cart', () => {
                const cart = useCartStore()
                expect(cart.totalItems).toBe(0)
            })

            it('should return total quantity of all items', () => {
                const cart = useCartStore()
                cart.addItem(testBike1)
                cart.addItem(testBike1)
                cart.addItem(testBike2)
                expect(cart.totalItems).toBe(3)
            })
        })

        describe('subtotal', () => {
            it('should return 0 for empty cart', () => {
                const cart = useCartStore()
                expect(cart.subtotal).toBe(0)
            })

            it('should calculate subtotal correctly', () => {
                const cart = useCartStore()
                cart.addItem(testBike1) // $2,999
                expect(cart.subtotal).toBe(2999)
            })

            it('should calculate subtotal with quantity', () => {
                const cart = useCartStore()
                cart.addItem(testBike1)
                cart.updateQuantity(1, 2) // 2 x $2,999
                expect(cart.subtotal).toBe(5998)
            })

            it('should calculate subtotal for multiple items', () => {
                const cart = useCartStore()
                cart.addItem(testBike1) // $2,999
                cart.addItem(testBike2) // $3,499
                expect(cart.subtotal).toBe(6498)
            })
        })

        describe('tax', () => {
            it('should return 0 for empty cart', () => {
                const cart = useCartStore()
                expect(cart.tax).toBe(0)
            })

            it('should calculate 10% tax', () => {
                const cart = useCartStore()
                cart.addItem(testBike1)
                expect(cart.tax).toBeCloseTo(299.9, 2)
            })
        })

        describe('total', () => {
            it('should return 0 for empty cart', () => {
                const cart = useCartStore()
                expect(cart.total).toBe(0)
            })

            it('should calculate total as subtotal + tax', () => {
                const cart = useCartStore()
                cart.addItem(testBike1)
                expect(cart.total).toBeCloseTo(3298.9, 2)
            })
        })
    })

    describe('localStorage Persistence', () => {
        it('should save cart to localStorage when item is added', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)

            const saved = localStorageMock.getItem('velo-cart')
            expect(saved).not.toBeNull()
            expect(JSON.parse(saved!)).toHaveLength(1)
        })

        it('should initialize cart from localStorage', () => {
            localStorageMock.setItem('velo-cart', JSON.stringify([
                { id: 1, name: 'Saved Bike', price: '$999', image: 'saved.jpg', quantity: 2 }
            ]))

            const cart = useCartStore()
            cart.initializeCart()

            expect(cart.items).toHaveLength(1)
            expect(cart.items[0].name).toBe('Saved Bike')
            expect(cart.items[0].quantity).toBe(2)
        })

        it('should handle empty localStorage gracefully', () => {
            const cart = useCartStore()
            cart.initializeCart()
            expect(cart.items).toHaveLength(0)
        })

        it('should save cart when item is removed', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.addItem(testBike2)
            cart.removeItem(1)

            const saved = localStorageMock.getItem('velo-cart')
            expect(JSON.parse(saved!)).toHaveLength(1)
        })

        it('should save cart when quantity is updated', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.updateQuantity(1, 5)

            const saved = localStorageMock.getItem('velo-cart')
            expect(JSON.parse(saved!)[0].quantity).toBe(5)
        })

        it('should save cart when cleared', () => {
            const cart = useCartStore()
            cart.addItem(testBike1)
            cart.clearCart()

            const saved = localStorageMock.getItem('velo-cart')
            expect(JSON.parse(saved!)).toHaveLength(0)
        })
    })

    describe('SSR Environment (window undefined)', () => {
        // Test when window is undefined (SSR)
        it('should handle initializeCart when window is undefined', () => {
            // Temporarily remove window
            const originalWindow = global.window
            // @ts-ignore
            delete global.window

            const cart = useCartStore()
            // Should not throw
            expect(() => cart.initializeCart()).not.toThrow()
            expect(cart.items).toHaveLength(0)

            // Restore window
            global.window = originalWindow
        })

        it('should handle saveCart when window is undefined', () => {
            const cart = useCartStore()
            cart.items = [{ id: 1, name: 'Test', price: '$100', image: 'test.jpg', quantity: 1 }]

            // Temporarily remove window
            const originalWindow = global.window
            // @ts-ignore
            delete global.window

            // Should not throw
            expect(() => cart.saveCart()).not.toThrow()

            // Restore window
            global.window = originalWindow
        })
    })
})
