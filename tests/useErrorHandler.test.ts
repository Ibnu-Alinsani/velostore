/**
 * Unit tests for useErrorHandler composable
 * Tests actual source code for coverage
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { resetState } from './setup'

// Mock useToast globally since useErrorHandler calls it internally
vi.stubGlobal('useToast', () => ({
    showToast: vi.fn()
}))

// Import actual composable
import { useErrorHandler, type AppError } from '~/composables/useErrorHandler'

describe('useErrorHandler composable', () => {
    beforeEach(() => {
        resetState()
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('handleError', () => {
        it('should handle Error objects', () => {
            const { handleError } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            const error = new Error('Test error message')
            const result = handleError(error)

            expect(consoleSpy).toHaveBeenCalled()
            expect(result.message).toBe('Test error message')
            consoleSpy.mockRestore()
        })

        it('should handle string errors', () => {
            const { handleError } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            const result = handleError('String error')

            expect(result.message).toBe('String error')
            consoleSpy.mockRestore()
        })

        it('should handle AppError objects', () => {
            const { handleError } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            const appError: AppError = { code: 'ERR', message: 'App error message' }
            const result = handleError(appError)

            expect(result.message).toBe('App error message')
            consoleSpy.mockRestore()
        })

        it('should handle unknown error types', () => {
            const { handleError } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            const result = handleError({ custom: 'error object' })

            expect(result.message).toBe('An unexpected error occurred')
            consoleSpy.mockRestore()
        })

        it('should handle null errors', () => {
            const { handleError } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            const result = handleError(null)

            expect(result.message).toBe('An unexpected error occurred')
            consoleSpy.mockRestore()
        })

        it('should include context in result', () => {
            const { handleError } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            const result = handleError(new Error('test'), 'TestContext')

            expect(result.context).toBe('TestContext')
            consoleSpy.mockRestore()
        })
    })

    describe('tryAsync', () => {
        it('should return data on successful async operation', async () => {
            const { tryAsync } = useErrorHandler()

            const result = await tryAsync(async () => {
                return { data: 'success' }
            })

            expect(result.data).toEqual({ data: 'success' })
            expect(result.error).toBeNull()
        })

        it('should return error on failed async operation', async () => {
            const { tryAsync } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            const result = await tryAsync(async () => {
                throw new Error('Async error')
            })

            expect(result.data).toBeNull()
            expect(result.error).not.toBeNull()
            expect(result.error?.code).toBe('ASYNC_ERROR')
            consoleSpy.mockRestore()
        })

        it('should include context in async errors', async () => {
            const { tryAsync } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            await tryAsync(async () => {
                throw new Error('Error')
            }, 'AsyncContext')

            expect(consoleSpy).toHaveBeenCalled()
            consoleSpy.mockRestore()
        })

        it('should handle non-Error exceptions in tryAsync (line 55 branch)', async () => {
            const { tryAsync } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            // Throw a string instead of Error to test the else branch
            const result = await tryAsync(async () => {
                throw 'String exception'
            })

            expect(result.data).toBeNull()
            expect(result.error).not.toBeNull()
            expect(result.error?.message).toBe('Unknown error')
            consoleSpy.mockRestore()
        })

        it('should handle object exceptions in tryAsync', async () => {
            const { tryAsync } = useErrorHandler()
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            const result = await tryAsync(async () => {
                throw { code: 'CUSTOM', message: 'Custom error' }
            })

            expect(result.data).toBeNull()
            expect(result.error).not.toBeNull()
            expect(result.error?.message).toBe('Unknown error')
            consoleSpy.mockRestore()
        })
    })

    describe('createError', () => {
        it('should create AppError with code and message', () => {
            const { createError } = useErrorHandler()

            const error = createError('ERR_CODE', 'Error message')

            expect(error.code).toBe('ERR_CODE')
            expect(error.message).toBe('Error message')
        })

        it('should include details', () => {
            const { createError } = useErrorHandler()

            const error = createError('ERR', 'Message', { extra: 'data' })

            expect(error.details).toEqual({ extra: 'data' })
        })
    })
})
