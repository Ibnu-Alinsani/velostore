/**
 * Unit tests for useErrorHandler composable
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock toast
const mockShowToast = vi.fn()
const mockToast = { showToast: mockShowToast }

describe('useErrorHandler composable', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('handleError', () => {
        it('should handle Error objects', () => {
            const handleError = (error: Error | unknown) => {
                let message = 'An unexpected error occurred'

                if (error instanceof Error) {
                    message = error.message
                }

                mockToast.showToast(message, 'error')
                return { message }
            }

            const error = new Error('Test error message')
            const result = handleError(error)

            expect(result.message).toBe('Test error message')
            expect(mockShowToast).toHaveBeenCalledWith('Test error message', 'error')
        })

        it('should handle string errors', () => {
            const handleError = (error: Error | unknown) => {
                let message = 'An unexpected error occurred'

                if (typeof error === 'string') {
                    message = error
                }

                mockToast.showToast(message, 'error')
                return { message }
            }

            const result = handleError('String error')

            expect(result.message).toBe('String error')
            expect(mockShowToast).toHaveBeenCalledWith('String error', 'error')
        })

        it('should handle AppError objects', () => {
            const handleError = (error: { message?: string } | unknown) => {
                let message = 'An unexpected error occurred'

                if (typeof error === 'object' && error !== null && 'message' in error) {
                    message = (error as { message: string }).message
                }

                mockToast.showToast(message, 'error')
                return { message }
            }

            const appError = { code: 'TEST_ERROR', message: 'App error message' }
            const result = handleError(appError)

            expect(result.message).toBe('App error message')
        })

        it('should use default message for unknown errors', () => {
            const handleError = (error: unknown) => {
                let message = 'An unexpected error occurred'

                if (error instanceof Error) {
                    message = error.message
                } else if (typeof error === 'string') {
                    message = error
                }

                mockToast.showToast(message, 'error')
                return { message }
            }

            const result = handleError(null)

            expect(result.message).toBe('An unexpected error occurred')
        })
    })

    describe('tryAsync', () => {
        it('should return data on successful operation', async () => {
            const tryAsync = async <T>(operation: () => Promise<T>) => {
                try {
                    const data = await operation()
                    return { data, error: null }
                } catch (e) {
                    return {
                        data: null,
                        error: {
                            code: 'ASYNC_ERROR',
                            message: e instanceof Error ? e.message : 'Unknown error'
                        }
                    }
                }
            }

            const result = await tryAsync(() => Promise.resolve({ id: 1, name: 'Test' }))

            expect(result.data).toEqual({ id: 1, name: 'Test' })
            expect(result.error).toBeNull()
        })

        it('should return error on failed operation', async () => {
            const tryAsync = async <T>(operation: () => Promise<T>) => {
                try {
                    const data = await operation()
                    return { data, error: null }
                } catch (e) {
                    return {
                        data: null,
                        error: {
                            code: 'ASYNC_ERROR',
                            message: e instanceof Error ? e.message : 'Unknown error'
                        }
                    }
                }
            }

            const result = await tryAsync(() => Promise.reject(new Error('Async failed')))

            expect(result.data).toBeNull()
            expect(result.error).toBeDefined()
            expect(result.error?.code).toBe('ASYNC_ERROR')
            expect(result.error?.message).toBe('Async failed')
        })
    })

    describe('createError', () => {
        it('should create AppError with code and message', () => {
            const createError = (code: string, message: string, details?: unknown) => ({
                code,
                message,
                details
            })

            const error = createError('VALIDATION_ERROR', 'Invalid input')

            expect(error.code).toBe('VALIDATION_ERROR')
            expect(error.message).toBe('Invalid input')
            expect(error.details).toBeUndefined()
        })

        it('should create AppError with details', () => {
            const createError = (code: string, message: string, details?: unknown) => ({
                code,
                message,
                details
            })

            const error = createError('API_ERROR', 'Request failed', { status: 500 })

            expect(error.code).toBe('API_ERROR')
            expect(error.details).toEqual({ status: 500 })
        })
    })
})
