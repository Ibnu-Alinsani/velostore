/**
 * Test setup file - mocks for Nuxt/Vue globals
 */
import { vi } from 'vitest'

// Mock useState for Nuxt
const stateStore: Record<string, { value: any }> = {}

export const mockUseState = <T>(key: string, init?: () => T) => {
    if (!stateStore[key]) {
        stateStore[key] = { value: init ? init() : undefined }
    }
    return stateStore[key]
}

// Reset state between tests
export const resetState = () => {
    Object.keys(stateStore).forEach(key => delete stateStore[key])
}

// Mock Vue lifecycle hooks
const mountedCallbacks: (() => void)[] = []
const unmountedCallbacks: (() => void)[] = []

export const mockOnMounted = (fn: () => void) => {
    mountedCallbacks.push(fn)
    // Execute immediately to simulate mount
    fn()
}

export const mockOnUnmounted = (fn: () => void) => {
    unmountedCallbacks.push(fn)
}

export const triggerUnmount = () => {
    unmountedCallbacks.forEach(fn => fn())
    unmountedCallbacks.length = 0
}

export const resetLifecycleHooks = () => {
    mountedCallbacks.length = 0
    unmountedCallbacks.length = 0
}

// Mock IntersectionObserver
class MockIntersectionObserver {
    callback: IntersectionObserverCallback
    elements: Element[] = []
    options: IntersectionObserverInit

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.callback = callback
        this.options = options || {}
    }

    observe(element: Element) {
        this.elements.push(element)
    }

    unobserve(element: Element) {
        this.elements = this.elements.filter(el => el !== element)
    }

    disconnect() {
        this.elements = []
    }
}

// Global mocks
vi.stubGlobal('useState', mockUseState)
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// Mock Vue lifecycle hooks
vi.mock('vue', async (importOriginal) => {
    const actual = await importOriginal() as any
    return {
        ...actual,
        onMounted: mockOnMounted,
        onUnmounted: mockOnUnmounted
    }
})

