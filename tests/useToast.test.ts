/**
 * Unit tests for useToast composable
 * Tests the actual source code for coverage
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { resetState } from './setup'

// We import the actual useToast composable
// Note: The useState mock from setup.ts will be used
import { useToast } from '~/composables/useToast'

describe('useToast composable', () => {
    beforeEach(() => {
        resetState()
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    describe('showToast', () => {
        it('should add a success toast by default', () => {
            const { toasts, showToast } = useToast()

            showToast('Success message')

            expect(toasts.value).toHaveLength(1)
            expect(toasts.value[0].message).toBe('Success message')
            expect(toasts.value[0].type).toBe('success')
        })

        it('should add an error toast', () => {
            const { toasts, showToast } = useToast()

            showToast('Error message', 'error')

            expect(toasts.value).toHaveLength(1)
            expect(toasts.value[0].type).toBe('error')
        })

        it('should add an info toast', () => {
            const { toasts, showToast } = useToast()

            showToast('Info message', 'info')

            expect(toasts.value).toHaveLength(1)
            expect(toasts.value[0].type).toBe('info')
        })

        it('should add multiple toasts', () => {
            const { toasts, showToast } = useToast()

            showToast('Toast 1')
            showToast('Toast 2', 'error')
            showToast('Toast 3', 'info')

            expect(toasts.value).toHaveLength(3)
        })

        it('should generate unique ids for each toast', () => {
            const { toasts, showToast } = useToast()
            let counter = 1000
            vi.spyOn(Date, 'now').mockImplementation(() => counter++)

            showToast('Toast 1')
            showToast('Toast 2')

            expect(toasts.value[0].id).toBe(1000)
            expect(toasts.value[1].id).toBe(1001)
        })

        it('should auto-remove toast after 3 seconds', () => {
            const { toasts, showToast } = useToast()
            vi.spyOn(Date, 'now').mockReturnValue(12345)

            showToast('Auto remove test')
            expect(toasts.value).toHaveLength(1)

            // Fast-forward 3 seconds
            vi.advanceTimersByTime(3000)

            expect(toasts.value).toHaveLength(0)
        })
    })

    describe('removeToast', () => {
        it('should remove a toast by id', () => {
            const { toasts, showToast, removeToast } = useToast()
            vi.spyOn(Date, 'now').mockReturnValue(12345)

            showToast('Toast to remove')
            expect(toasts.value).toHaveLength(1)

            removeToast(12345)
            expect(toasts.value).toHaveLength(0)
        })

        it('should only remove the specified toast', () => {
            const { toasts, showToast, removeToast } = useToast()
            let counter = 1
            vi.spyOn(Date, 'now').mockImplementation(() => counter++)

            showToast('Toast 1')
            showToast('Toast 2')
            showToast('Toast 3')

            removeToast(2)

            expect(toasts.value).toHaveLength(2)
            expect(toasts.value.map(t => t.message)).toEqual(['Toast 1', 'Toast 3'])
        })

        it('should handle removing non-existent toast gracefully', () => {
            const { toasts, showToast, removeToast } = useToast()

            showToast('Toast 1')
            removeToast(99999)

            expect(toasts.value).toHaveLength(1)
        })
    })

    describe('Toast types', () => {
        it('should correctly type success toasts', () => {
            const { toasts, showToast } = useToast()
            showToast('Test', 'success')
            expect(toasts.value[0].type).toBe('success')
        })

        it('should correctly type error toasts', () => {
            const { toasts, showToast } = useToast()
            showToast('Test', 'error')
            expect(toasts.value[0].type).toBe('error')
        })

        it('should correctly type info toasts', () => {
            const { toasts, showToast } = useToast()
            showToast('Test', 'info')
            expect(toasts.value[0].type).toBe('info')
        })
    })
})
