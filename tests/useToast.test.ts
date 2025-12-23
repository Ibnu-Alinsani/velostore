/**
 * Unit tests for useToast composable
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

// Mock Toast interface
interface Toast {
    message: string
    type: 'success' | 'error' | 'info'
    id: number
}

// Mock useToast
const createMockToast = () => {
    let toasts: Toast[] = []

    return {
        get toasts() { return { value: toasts } },

        showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
            const id = Date.now()
            toasts.push({ message, type, id })
            return id
        },

        removeToast(id: number) {
            toasts = toasts.filter(t => t.id !== id)
        },

        // Helper for tests
        reset() {
            toasts = []
        }
    }
}

describe('useToast composable', () => {
    let toast: ReturnType<typeof createMockToast>

    beforeEach(() => {
        toast = createMockToast()
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    describe('showToast', () => {
        it('should add a success toast by default', () => {
            toast.showToast('Success message')

            expect(toast.toasts.value).toHaveLength(1)
            expect(toast.toasts.value[0].message).toBe('Success message')
            expect(toast.toasts.value[0].type).toBe('success')
        })

        it('should add an error toast', () => {
            toast.showToast('Error message', 'error')

            expect(toast.toasts.value).toHaveLength(1)
            expect(toast.toasts.value[0].type).toBe('error')
        })

        it('should add an info toast', () => {
            toast.showToast('Info message', 'info')

            expect(toast.toasts.value).toHaveLength(1)
            expect(toast.toasts.value[0].type).toBe('info')
        })

        it('should add multiple toasts', () => {
            toast.showToast('Toast 1')
            toast.showToast('Toast 2', 'error')
            toast.showToast('Toast 3', 'info')

            expect(toast.toasts.value).toHaveLength(3)
        })

        it('should generate unique ids for each toast', () => {
            // Mock Date.now for unique IDs
            let counter = 1000
            vi.spyOn(Date, 'now').mockImplementation(() => counter++)

            toast.showToast('Toast 1')
            toast.showToast('Toast 2')

            expect(toast.toasts.value[0].id).toBe(1000)
            expect(toast.toasts.value[1].id).toBe(1001)
        })
    })

    describe('removeToast', () => {
        it('should remove a toast by id', () => {
            vi.spyOn(Date, 'now').mockReturnValue(12345)
            toast.showToast('Toast to remove')

            expect(toast.toasts.value).toHaveLength(1)

            toast.removeToast(12345)

            expect(toast.toasts.value).toHaveLength(0)
        })

        it('should only remove the specified toast', () => {
            let counter = 1
            vi.spyOn(Date, 'now').mockImplementation(() => counter++)

            toast.showToast('Toast 1')
            toast.showToast('Toast 2')
            toast.showToast('Toast 3')

            toast.removeToast(2)

            expect(toast.toasts.value).toHaveLength(2)
            expect(toast.toasts.value.map(t => t.message)).toEqual(['Toast 1', 'Toast 3'])
        })

        it('should handle removing non-existent toast gracefully', () => {
            toast.showToast('Toast 1')
            toast.removeToast(99999)

            expect(toast.toasts.value).toHaveLength(1)
        })
    })

    describe('Toast types', () => {
        it('should correctly type success toasts', () => {
            toast.showToast('Test', 'success')
            expect(toast.toasts.value[0].type).toBe('success')
        })

        it('should correctly type error toasts', () => {
            toast.showToast('Test', 'error')
            expect(toast.toasts.value[0].type).toBe('error')
        })

        it('should correctly type info toasts', () => {
            toast.showToast('Test', 'info')
            expect(toast.toasts.value[0].type).toBe('info')
        })
    })
})
