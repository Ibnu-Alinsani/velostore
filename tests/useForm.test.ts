/**
 * Unit tests for useForm composable
 * Tests actual source code for coverage
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { resetState } from './setup'

// Import actual composable
import { useForm } from '~/composables/useForm'

describe('useForm composable', () => {
    beforeEach(() => {
        resetState()
    })

    const initialData = {
        name: '',
        email: '',
        message: ''
    }

    describe('Form Data', () => {
        it('should initialize with provided data', () => {
            const { formData } = useForm(initialData)
            expect(formData.value).toEqual({ name: '', email: '', message: '' })
        })

        it('should allow updating form data', () => {
            const { formData } = useForm(initialData)
            formData.value = { name: 'John', email: 'john@test.com', message: 'Hello' }
            expect(formData.value.name).toBe('John')
        })

        it('should not be submitting initially', () => {
            const { isSubmitting } = useForm(initialData)
            expect(isSubmitting.value).toBe(false)
        })

        it('should have no errors initially', () => {
            const { errors } = useForm(initialData)
            expect(Object.keys(errors.value)).toHaveLength(0)
        })
    })

    describe('resetForm', () => {
        it('should reset form data to initial values', () => {
            const { formData, resetForm } = useForm(initialData)
            formData.value = { name: 'John', email: 'john@test.com', message: 'Hi' }
            resetForm()
            expect(formData.value).toEqual(initialData)
        })

        it('should clear all errors', () => {
            const { errors, validateField, resetForm } = useForm(initialData)
            validateField('name', { required: true })
            expect(errors.value.name).toBe('This field is required')
            resetForm()
            expect(errors.value.name).toBeUndefined()
        })
    })

    describe('validateField', () => {
        describe('Required validation', () => {
            it('should return true for valid required field', () => {
                const { validateField } = useForm({ name: 'John', email: '' })
                const result = validateField('name', { required: true })
                expect(result).toBe(true)
            })

            it('should return false for empty required field', () => {
                const { validateField, errors } = useForm({ name: '', email: '' })
                const result = validateField('name', { required: true })
                expect(result).toBe(false)
                expect(errors.value.name).toBe('This field is required')
            })
        })

        describe('Email validation', () => {
            it('should return true for valid email', () => {
                const { validateField } = useForm({ email: 'test@example.com', name: '' })
                const result = validateField('email', { email: true })
                expect(result).toBe(true)
            })

            it('should return false for invalid email', () => {
                const { validateField, errors } = useForm({ email: 'invalid-email', name: '' })
                const result = validateField('email', { email: true })
                expect(result).toBe(false)
                expect(errors.value.email).toBe('Invalid email address')
            })

            it('should return true for empty email when not required', () => {
                const { validateField } = useForm({ email: '', name: '' })
                const result = validateField('email', { email: true })
                expect(result).toBe(true)
            })
        })

        it('should return true when no rules provided', () => {
            const { validateField } = useForm(initialData)
            const result = validateField('name')
            expect(result).toBe(true)
        })

        it('should clear error when validation passes', () => {
            const { formData, validateField, errors } = useForm({ name: '', email: '' })
            validateField('name', { required: true })
            expect(errors.value.name).toBeDefined()

            formData.value = { name: 'John', email: '' }
            validateField('name', { required: true })
            expect(errors.value.name).toBeUndefined()
        })
    })

    describe('handleSubmit', () => {
        it('should call submit function with form data', async () => {
            const { formData, handleSubmit } = useForm({ name: 'John', email: 'john@test.com' })
            const submitFn = vi.fn().mockResolvedValue(undefined)

            await handleSubmit(submitFn)

            expect(submitFn).toHaveBeenCalledWith({ name: 'John', email: 'john@test.com' })
        })

        it('should call onSuccess callback after successful submit', async () => {
            const { handleSubmit } = useForm(initialData)
            const submitFn = vi.fn().mockResolvedValue(undefined)
            const onSuccess = vi.fn()

            await handleSubmit(submitFn, onSuccess)

            expect(onSuccess).toHaveBeenCalled()
        })

        it('should reset form after successful submit', async () => {
            const { formData, handleSubmit } = useForm({ name: '', email: '' })
            formData.value = { name: 'John', email: 'test@test.com' }
            const submitFn = vi.fn().mockResolvedValue(undefined)

            await handleSubmit(submitFn)

            expect(formData.value.name).toBe('')
        })

        it('should handle submit errors gracefully', async () => {
            const { handleSubmit } = useForm(initialData)
            const submitFn = vi.fn().mockRejectedValue(new Error('Submit failed'))
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            await handleSubmit(submitFn)

            expect(consoleSpy).toHaveBeenCalled()
            consoleSpy.mockRestore()
        })
    })
})
