/**
 * Error Handling Composable
 * Consistent error handling across the application
 */

export interface AppError {
    code: string
    message: string
    details?: unknown
}

export type ErrorHandler = (error: Error | AppError | unknown) => void

export const useErrorHandler = () => {
    const toast = useToast()

    /**
     * Handle and display error to user
     */
    const handleError = (error: Error | AppError | unknown, context?: string) => {
        console.error(`[${context || 'App'}] Error:`, error)

        let message = 'An unexpected error occurred'

        if (error instanceof Error) {
            message = error.message
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
            message = (error as AppError).message
        } else if (typeof error === 'string') {
            message = error
        }

        // Show user-friendly toast
        toast.showToast(message, 'error')

        return { message, context }
    }

    /**
     * Handle async operations with error catching
     */
    const tryAsync = async <T>(
        operation: () => Promise<T>,
        context?: string
    ): Promise<{ data: T | null; error: AppError | null }> => {
        try {
            const data = await operation()
            return { data, error: null }
        } catch (e) {
            handleError(e, context)
            return {
                data: null,
                error: {
                    code: 'ASYNC_ERROR',
                    message: e instanceof Error ? e.message : 'Unknown error',
                    details: e
                }
            }
        }
    }

    /**
     * Create error with code
     */
    const createError = (code: string, message: string, details?: unknown): AppError => ({
        code,
        message,
        details
    })

    return {
        handleError,
        tryAsync,
        createError
    }
}
