import { ref } from 'vue'

export interface FormField {
    [key: string]: string
}

export function useForm<T extends FormField>(initialData: T) {
    const formData = ref<T>({ ...initialData })
    const isSubmitting = ref(false)
    const errors = ref<Partial<Record<keyof T, string>>>({})

    const resetForm = () => {
        formData.value = { ...initialData }
        errors.value = {}
    }

    const validateField = (field: keyof T, rules?: { required?: boolean; email?: boolean }) => {
        if (!rules) return true

        const value = formData.value[field]

        if (rules.required && !value) {
            errors.value[field] = 'This field is required'
            return false
        }

        if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.value[field] = 'Invalid email address'
            return false
        }

        delete errors.value[field]
        return true
    }

    const handleSubmit = async (
        submitFn: (data: T) => Promise<void>,
        onSuccess?: () => void
    ) => {
        isSubmitting.value = true
        errors.value = {}

        try {
            await submitFn(formData.value)
            if (onSuccess) onSuccess()
            resetForm()
        } catch (error) {
            console.error('Form submission error:', error)
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        formData,
        isSubmitting,
        errors,
        resetForm,
        validateField,
        handleSubmit
    }
}
