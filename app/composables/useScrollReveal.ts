import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollReveal = (threshold = 0.2, rootMargin = '-100px') => {
    const isVisible = ref(false)
    const targetRef = ref<HTMLElement>()
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    isVisible.value = true
                }
            },
            {
                threshold,
                rootMargin // Negative margin delays trigger until element is deeper in viewport
            }
        )

        if (targetRef.value) {
            observer.observe(targetRef.value)
        }
    })

    onUnmounted(() => {
        if (observer) {
            observer.disconnect()
        }
    })

    return { isVisible, targetRef }
}
