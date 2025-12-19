interface Toast {
    message: string
    type: 'success' | 'error' | 'info'
    id: number
}

export const useToast = () => {
    const toasts = useState<Toast[]>('toasts', () => [])

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now()
        toasts.value.push({ message, type, id })

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id)
        }, 3000)
    }

    const removeToast = (id: number) => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    return {
        toasts,
        showToast,
        removeToast
    }
}
